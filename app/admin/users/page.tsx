'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaEye, FaTimes, FaEnvelope, FaCalendarAlt, FaUserTag, FaShieldAlt } from 'react-icons/fa';
import usersJsonData from '../../../data/users.json';

// Transform users from JSON to display format
const transformUsers = () => {
    return usersJsonData.users.map(user => {
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        };

        return {
            id: user.id,
            name: user.displayName,
            email: user.email,
            status: user.status,
            role: (usersJsonData.roles as any)[user.role]?.name || user.role,
            roleKey: user.role,
            joined: formatDate(user.metadata.createdAt),
            lastLogin: formatDate(user.metadata.lastLogin),
            bio: user.bio || 'No bio provided.',
            avatar: user.photoURL
        };
    });
};

const initialUsers = transformUsers();

export default function UsersPage() {
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [viewingUser, setViewingUser] = useState<any | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleOpenDetail = (user: any) => {
        setViewingUser(user);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setViewingUser(null);
        setIsDetailOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(prev => prev.filter(u => u.id !== id));
        }
    };

    const statusOptions = Object.keys(usersJsonData.statuses);

    return (
        <AdminLayout pageTitle="Users">
            {/* Filters */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search users..."
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaFilter style={{ color: 'var(--text-muted)' }} />
                        <select
                            className="form-input"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{ width: 'auto', padding: '0.75rem 1rem' }}
                        >
                            <option value="all">All Status</option>
                            {statusOptions.map(status => (
                                <option key={status} value={status}>
                                    {(usersJsonData.statuses as any)[status].label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="btn btn-primary" style={{ marginLeft: 'auto' }}>
                        <FaPlus /> Add User
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">All Users ({filteredUsers.length})</h3>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="table-user">
                                            <div className="table-user-avatar">
                                                {user.name.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                            <div className="table-user-info">
                                                <span className="table-user-name">{user.name}</span>
                                                <span className="table-user-email">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.status}`}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user.role}</span>
                                    </td>
                                    <td>{user.joined}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" onClick={() => handleOpenDetail(user)} title="View Detail">
                                                <FaEye />
                                            </button>
                                            <button className="table-action-btn" title="Edit">
                                                <FaEdit />
                                            </button>
                                            <button className="table-action-btn delete" onClick={() => handleDelete(user.id)} title="Delete">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Detail Modal */}
            {isDetailOpen && viewingUser && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card" style={{ maxWidth: '500px' }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">User Profile</h3>
                            <button className="table-action-btn" onClick={handleCloseDetail}><FaTimes /></button>
                        </div>
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <div className="table-user-avatar" style={{ width: '80px', height: '80px', margin: '0 auto 1rem', fontSize: '2rem' }}>
                                {viewingUser.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{viewingUser.name}</h4>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <span className={`status-badge ${viewingUser.status}`}>{viewingUser.status}</span>
                                <span className="status-badge active" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>{viewingUser.role}</span>
                            </div>

                            <div style={{ marginTop: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--primary)', borderRadius: '8px' }}>
                                    <FaEnvelope color="var(--accent-start)" />
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</label>
                                        <span style={{ fontSize: '0.9375rem' }}>{viewingUser.email}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--primary)', borderRadius: '8px' }}>
                                    <FaCalendarAlt color="var(--accent-start)" />
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Member Since</label>
                                        <span style={{ fontSize: '0.9375rem' }}>{viewingUser.joined}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--primary)', borderRadius: '8px' }}>
                                    <FaShieldAlt color="var(--accent-start)" />
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last Login</label>
                                        <span style={{ fontSize: '0.9375rem' }}>{viewingUser.lastLogin}</span>
                                    </div>
                                </div>
                                <div style={{ padding: '0.75rem', background: 'var(--primary)', borderRadius: '8px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Bio</label>
                                    <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{viewingUser.bio}</p>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 2rem; }
                .modal-content { width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; background: var(--primary-light); box-shadow: var(--shadow-lg); }
            `}</style>
        </AdminLayout>
    );
}
