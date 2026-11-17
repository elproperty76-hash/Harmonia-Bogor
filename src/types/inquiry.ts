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

export interface WebSocketMessage {
  type: 'init' | 'inquiry:created' | 'inquiry:updated' | 'presence:count';
  inquiries?: InquiryRecord[];
  inquiry?: InquiryRecord;
  activeConnections?: number;
}
