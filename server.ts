import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import http from 'http';
import nodemailer from 'nodemailer';
import path from 'path';
import {fileURLToPath} from 'url';
import {createServer as createViteServer} from 'vite';
import {WebSocket, WebSocketServer} from 'ws';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'harmoniagroups@harmoniasyariah.com';
const DATA_DIR = path.resolve(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

export interface InquiryRecord {
  id: string;
  formType: 'registration' | 'contact';
  name: string;
  whatsapp: string;
  email: string;
  unitType: string;
  paymentScheme: string;
  message: string;
  status: 'pending' | 'responded';
  emailDispatchStatus: 'sent_smtp' | 'queued_mailto_ready';
  emailTarget: string;
  createdAt: string;
  respondedAt?: string;
}

function ensureDataStore(): InquiryRecord[] {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {recursive: true});
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
    return [];
  }
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveInquiries(records: InquiryRecord[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {recursive: true});
  }
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

async function dispatchAdminEmail(record: InquiryRecord): Promise<'sent_smtp' | 'queued_mailto_ready'> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass) {
    return 'queued_mailto_ready';
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {user, pass},
    });

    const subjectPrefix =
      record.formType === 'registration' ? '[Pendaftaran Unit]' : '[Konsultasi Baru]';

    await transporter.sendMail({
      from: `"Harmonia Student House Web" <${user}>`,
      to: ADMIN_EMAIL,
      replyTo: record.email || undefined,
      subject: `${subjectPrefix} ${record.name} - ${record.unitType}`,
      text: [
        `Jenis Formulir : ${record.formType === 'registration' ? 'Pendaftaran Minat Unit' : 'Kontak & Konsultasi'}`,
        `Nama Lengkap   : ${record.name}`,
        `No. WhatsApp   : ${record.whatsapp}`,
        `Email          : ${record.email || '-'}`,
        `Pilihan Unit   : ${record.unitType}`,
        `Skema Bayar    : ${record.paymentScheme}`,
        `Pesan          : ${record.message || '-'}`,
        `Waktu Masuk    : ${record.createdAt}`,
      ].join('\n'),
    });

    return 'sent_smtp';
  } catch (err) {
    console.error('SMTP dispatch warning:', err);
    return 'queued_mailto_ready';
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({limit: '1mb'}));

  const httpServer = http.createServer(app);
  const wss = new WebSocketServer({server: httpServer, path: '/ws'});

  let inquiries: InquiryRecord[] = ensureDataStore();

  function broadcast(payload: unknown): void {
    const serialized = JSON.stringify(payload);
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(serialized);
      }
    }
  }

  function broadcastPresence(): void {
    let active = 0;
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        active += 1;
      }
    }
    broadcast({type: 'presence:count', activeConnections: active});
  }

  wss.on('connection', (socket) => {
    socket.send(
      JSON.stringify({
        type: 'init',
        inquiries,
        activeConnections: wss.clients.size,
      }),
    );
    broadcastPresence();

    socket.on('close', () => {
      broadcastPresence();
    });
  });

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      adminEmail: ADMIN_EMAIL,
      totalInquiries: inquiries.length,
    });
  });

  app.get('/api/config', (_req, res) => {
    res.json({
      googleMapsApiKey:
        process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || '',
    });
  });

  app.get('/api/inquiries', (_req, res) => {
    res.json({inquiries});
  });

  app.post('/api/inquiries', async (req, res) => {
    const body = req.body ?? {};
    const name = String(body.name || '').trim();
    const whatsapp = String(body.whatsapp || '').trim();
    const email = String(body.email || '').trim();
    const unitType = String(body.unitType || 'Konsultasi Umum').trim();
    const paymentScheme = String(body.paymentScheme || 'Cash / Cicilan Syariah').trim();
    const message = String(body.message || '').trim();
    const formType: 'registration' | 'contact' =
      body.formType === 'contact' ? 'contact' : 'registration';

    if (name.length < 2) {
      res.status(400).json({error: 'Nama lengkap wajib diisi minimal 2 karakter.'});
      return;
    }

    const digitsOnly = whatsapp.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      res.status(400).json({error: 'Nomor WhatsApp aktif wajib diisi dengan benar.'});
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({error: 'Format alamat email tidak valid.'});
      return;
    }

    const record: InquiryRecord = {
      id: `HRM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      formType,
      name,
      whatsapp,
      email,
      unitType,
      paymentScheme,
      message,
      status: 'pending',
      emailDispatchStatus: 'queued_mailto_ready',
      emailTarget: ADMIN_EMAIL,
      createdAt: new Date().toISOString(),
    };

    record.emailDispatchStatus = await dispatchAdminEmail(record);

    inquiries = [record, ...inquiries].slice(0, 100);
    saveInquiries(inquiries);

    broadcast({type: 'inquiry:created', inquiry: record});

    res.status(201).json({
      ok: true,
      inquiry: record,
    });
  });

  app.patch('/api/inquiries/:id', (req, res) => {
    const id = req.params.id;
    const status: 'pending' | 'responded' =
      req.body?.status === 'pending' ? 'pending' : 'responded';

    const idx = inquiries.findIndex((item) => item.id === id);
    if (idx === -1) {
      res.status(404).json({error: 'Data pesan tidak ditemukan.'});
      return;
    }

    const updated: InquiryRecord = {
      ...inquiries[idx],
      status,
      respondedAt: status === 'responded' ? new Date().toISOString() : undefined,
    };

    inquiries[idx] = updated;
    saveInquiries(inquiries);

    broadcast({type: 'inquiry:updated', inquiry: updated});

    res.json({ok: true, inquiry: updated});
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, {maxAge: '7d'}));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Harmonia Student House server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
