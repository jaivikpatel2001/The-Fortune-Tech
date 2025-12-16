'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaReply, FaTrash, FaSearch, FaStar, FaInbox } from 'react-icons/fa';

const messagesData = [
    {
        id: 1,
        sender: 'Sarah Johnson',
        email: 'sarah@example.com',
        subject: 'Project Inquiry - E-commerce Website',
        preview: 'Hi, I am interested in your web development services. I need an e-commerce website for my business...',
        time: '2 hours ago',
        read: false,
        starred: true
    },
    {
        id: 2,
        sender: 'Michael Chen',
        email: 'michael@example.com',
        subject: 'Support Request - Login Issue',
        preview: 'I am having trouble logging into my account. The password reset email is not arriving...',
        time: '5 hours ago',
        read: false,
        starred: false
    },
    {
        id: 3,
        sender: 'Emily Davis',
        email: 'emily@example.com',
        subject: 'Partnership Proposal',
        preview: 'Our company would like to discuss a potential partnership opportunity with Fortune Tech...',
        time: '1 day ago',
        read: true,
        starred: true
    },
    {
        id: 4,
        sender: 'James Wilson',
        email: 'james@example.com',
        subject: 'Quote Request - Mobile App',
        preview: 'We need a mobile app for both iOS and Android. Can you provide a quote for this project?',
        time: '2 days ago',
        read: true,
        starred: false
    },
    {
        id: 5,
        sender: 'Lisa Anderson',
        email: 'lisa@example.com',
        subject: 'Feedback on Recent Project',
        preview: 'Thank you for the amazing work on our website! The team really exceeded our expectations...',
        time: '3 days ago',
        read: true,
        starred: false
    },
];

export default function MessagesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<typeof messagesData[0] | null>(null);

    const filteredMessages = messagesData.filter(msg =>
        msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const unreadCount = messagesData.filter(m => !m.read).length;

    return (
        <AdminLayout pageTitle="Messages">
            <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1.5fr' : '1fr', gap: '1.5rem' }}>
                {/* Messages List */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">
                            <FaInbox style={{ marginRight: '0.5rem' }} />
                            Inbox ({unreadCount} unread)
                        </h3>
                    </div>

                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Search messages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ paddingLeft: '2.5rem' }}
                            />
                            <FaSearch style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)'
                            }} />
                        </div>
                    </div>

                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        {filteredMessages.map((message) => (
                            <div
                                key={message.id}
                                onClick={() => setSelectedMessage(message)}
                                style={{
                                    padding: '1rem 1.5rem',
                                    borderBottom: '1px solid var(--glass-border)',
                                    cursor: 'pointer',
                                    background: selectedMessage?.id === message.id ? 'var(--glass-bg)' :
                                        !message.read ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                                    transition: 'background 0.2s ease'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{
                                        fontWeight: message.read ? 500 : 600,
                                        color: 'var(--text-primary)',
                                        fontSize: '0.9375rem'
                                    }}>
                                        {message.sender}
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {message.starred && <FaStar style={{ color: '#f59e0b', fontSize: '0.75rem' }} />}
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {message.time}
                                        </span>
                                    </div>
                                </div>
                                <div style={{
                                    fontWeight: message.read ? 400 : 500,
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.875rem',
                                    marginBottom: '0.25rem'
                                }}>
                                    {message.subject}
                                </div>
                                <div style={{
                                    fontSize: '0.8125rem',
                                    color: 'var(--text-muted)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {message.preview}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Detail */}
                {selectedMessage && (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <div>
                                <h3 className="admin-card-title">{selectedMessage.subject}</h3>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                    From: {selectedMessage.sender} &lt;{selectedMessage.email}&gt;
                                </div>
                            </div>
                            <div className="admin-card-actions">
                                <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                    <FaReply />
                                    Reply
                                </button>
                                <button className="table-action-btn delete">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                {selectedMessage.preview}
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
                                Best regards,<br />
                                {selectedMessage.sender}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
