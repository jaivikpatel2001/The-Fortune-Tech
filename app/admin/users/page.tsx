'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const usersData = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', role: 'Customer', joined: 'Dec 10, 2024' },
    { id: 2, name: 'Michael Chen', email: 'michael@example.com', status: 'active', role: 'Customer', joined: 'Dec 9, 2024' },
    { id: 3, name: 'Emily Davis', email: 'emily@example.com', status: 'pending', role: 'Customer', joined: 'Dec 8, 2024' },
    { id: 4, name: 'James Wilson', email: 'james@example.com', status: 'active', role: 'Admin', joined: 'Dec 5, 2024' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa@example.com', status: 'inactive', role: 'Customer', joined: 'Dec 3, 2024' },
    { id: 6, name: 'Robert Brown', email: 'robert@example.com', status: 'active', role: 'Customer', joined: 'Dec 1, 2024' },
    { id: 7, name: 'Jennifer Lee', email: 'jennifer@example.com', status: 'banned', role: 'Customer', joined: 'Nov 28, 2024' },
    { id: 8, name: 'David Miller', email: 'david@example.com', status: 'active', role: 'Moderator', joined: 'Nov 25, 2024' },
];

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredUsers = usersData.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                            <option value="banned">Banned</option>
                        </select>
                    </div>

                    <button className="btn btn-primary" style={{ marginLeft: 'auto', padding: '0.75rem 1.25rem' }}>
                        <FaPlus />
                        Add User
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">All Users ({filteredUsers.length})</h3>
                    <div className="admin-card-actions">
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                            Export CSV
                        </button>
                    </div>
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
                                                {user.name.split(' ').map(n => n[0]).join('')}
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
                                    <td>{user.role}</td>
                                    <td>{user.joined}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" title="Edit">
                                                <FaEdit />
                                            </button>
                                            <button className="table-action-btn delete" title="Delete">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="admin-pagination">
                    <span className="pagination-info">Showing 1-{filteredUsers.length} of {filteredUsers.length} users</span>
                    <div className="pagination-buttons">
                        <button className="pagination-btn" disabled>&lt;</button>
                        <button className="pagination-btn active">1</button>
                        <button className="pagination-btn">&gt;</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
