import {useCallback, useEffect, useRef, useState} from 'react';
import {InquiryRecord, WebSocketMessage} from '../types/inquiry';

export interface ToastNotification {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
}

export function useRealtimeNotifications() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [connected, setConnected] = useState(false);
  const [activeConnections, setActiveConnections] = useState(1);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);
  const reconnectAttemptRef = useRef(0);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback((inquiry: InquiryRecord) => {
    const toastId = `${inquiry.id}-${Date.now()}`;
    const label =
      inquiry.formType === 'registration' ? 'Pendaftaran Unit Baru' : 'Pesan Konsultasi Baru';

    setToasts((prev) => [
      {
        id: toastId,
        title: `${label}: ${inquiry.name}`,
        subtitle: `${inquiry.unitType} · Diteruskan ke ${inquiry.emailTarget}`,
        timestamp: inquiry.createdAt,
      },
      ...prev.slice(0, 2),
    ]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== toastId));
    }, 6500);
  }, []);

  useEffect(() => {
    let unmounted = false;

    const connect = () => {
      if (unmounted) return;

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      const socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onopen = () => {
        if (unmounted) return;
        setConnected(true);
        reconnectAttemptRef.current = 0;
      };

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data) as WebSocketMessage;
          if (payload.type === 'init' && Array.isArray(payload.inquiries)) {
            setInquiries(payload.inquiries);
            if (typeof payload.activeConnections === 'number') {
              setActiveConnections(payload.activeConnections);
            }
          } else if (payload.type === 'inquiry:created' && payload.inquiry) {
            const incoming = payload.inquiry;
            setInquiries((prev) => {
              if (prev.some((item) => item.id === incoming.id)) {
                return prev;
              }
              return [incoming, ...prev];
            });
            pushToast(incoming);
          } else if (payload.type === 'inquiry:updated' && payload.inquiry) {
            const updated = payload.inquiry;
            setInquiries((prev) =>
              prev.map((item) => (item.id === updated.id ? updated : item)),
            );
          } else if (
            payload.type === 'presence:count' &&
            typeof payload.activeConnections === 'number'
          ) {
            setActiveConnections(payload.activeConnections);
          }
        } catch {
          // Ignore malformed frame
        }
      };

      socket.onclose = () => {
        if (unmounted) return;
        setConnected(false);
        const delay = Math.min(1000 * Math.pow(1.6, reconnectAttemptRef.current), 12000);
        reconnectAttemptRef.current += 1;
        reconnectTimerRef.current = window.setTimeout(connect, delay);
      };

      socket.onerror = () => {
        socket.close();
      };
    };

    connect();

    return () => {
      unmounted = true;
      if (reconnectTimerRef.current !== null) {
        window.clearTimeout(reconnectTimerRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [pushToast]);

  const markStatus = useCallback(async (id: string, status: 'pending' | 'responded') => {
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              respondedAt: status === 'responded' ? new Date().toISOString() : undefined,
            }
          : item,
      ),
    );

    try {
      const response = await fetch(`/api/inquiries/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({status}),
      });
      if (response.ok) {
        const data = (await response.json()) as {inquiry?: InquiryRecord};
        if (data.inquiry) {
          setInquiries((prev) =>
            prev.map((item) => (item.id === data.inquiry!.id ? data.inquiry! : item)),
          );
        }
      }
    } catch {
      // WebSocket reconciliation will restore authoritative state on reconnect
    }
  }, []);

  const pendingCount = inquiries.filter((item) => item.status === 'pending').length;

  return {
    inquiries,
    pendingCount,
    connected,
    activeConnections,
    toasts,
    dismissToast,
    markStatus,
  };
}
