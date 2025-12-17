'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import usersJsonData from '../../../data/users.json';

// Transform users from JSON to display format
const transformUsers = () => {
    return usersJsonData.users.map(user => {
        // Format date from createdAt
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
            role: usersJsonData.roles[user.role as keyof typeof usersJsonData.roles]?.name || user.role,
            joined: formatDate(user.metadata.createdAt)
        };
    });
};

const usersData = transformUsers();

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredUsers = usersData.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Get status options from the JSON config
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
                                    {usersJsonData.statuses[status as keyof typeof usersJsonData.statuses].label}
                                </option>
                            ))}
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
                    <span className="pagination-info">Showing 1-{filteredUsers.length} of {usersJsonData.metadata.totalUsers} users</span>
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
