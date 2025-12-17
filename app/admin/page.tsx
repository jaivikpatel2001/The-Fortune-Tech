'use client';

import AdminLayout from '../../components/admin/AdminLayout';
import {
    FaUsers, FaDollarSign, FaShoppingCart, FaChartLine,
    FaArrowUp, FaArrowDown, FaUser, FaShoppingBag, FaEnvelope, FaExclamationTriangle, FaChartArea
} from 'react-icons/fa';
import usersData from '../../data/users.json';

const stats = [
    {
        label: 'Total Users',
        value: usersData.metadata.totalUsers.toString(),
        change: '+12.5%',
        positive: true,
        icon: FaUsers,
        color: 'purple'
    },
    {
        label: 'Revenue',
        value: '$48,295',
        change: '+8.2%',
        positive: true,
        icon: FaDollarSign,
        color: 'green'
    },
    {
        label: 'Orders',
        value: '1,847',
        change: '-3.1%',
        positive: false,
        icon: FaShoppingCart,
        color: 'blue'
    },
    {
        label: 'Conversion',
        value: '3.24%',
        change: '+1.8%',
        positive: true,
        icon: FaChartLine,
        color: 'orange'
    },
];

// Get recent users from users.json
const recentUsers = usersData.users.slice(0, 5).map(user => {
    // Calculate relative time from lastLogin
    const getRelativeTime = (dateString: string | null) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays === 1) return '1 day ago';
        return `${diffDays} days ago`;
    };

    return {
        id: user.id,
        name: user.displayName,
        email: user.email,
        status: user.status,
        role: usersData.roles[user.role as keyof typeof usersData.roles]?.name || user.role,
        joined: getRelativeTime(user.security.lastLogin)
    };
});

const recentActivity = [
    { type: 'user', icon: FaUser, text: '<strong>John Doe</strong> registered a new account', time: '2 minutes ago' },
    { type: 'order', icon: FaShoppingBag, text: 'New order <strong>#1234</strong> received', time: '15 minutes ago' },
    { type: 'message', icon: FaEnvelope, text: '<strong>Sarah</strong> sent a support message', time: '1 hour ago' },
    { type: 'alert', icon: FaExclamationTriangle, text: 'Server CPU usage reached <strong>85%</strong>', time: '2 hours ago' },
    { type: 'user', icon: FaUser, text: '<strong>Mike Chen</strong> updated profile', time: '3 hours ago' },
];

export default function AdminDashboard() {
    return (
        <AdminLayout pageTitle="Dashboard">
            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-info">
                            <span className="stat-info-label">{stat.label}</span>
                            <span className="stat-info-value">{stat.value}</span>
                            <span className={`stat-info-change ${stat.positive ? 'positive' : 'negative'}`}>
                                {stat.positive ? <FaArrowUp /> : <FaArrowDown />}
                                {stat.change}
                            </span>
                        </div>
                        <div className={`stat-icon ${stat.color}`}>
                            <stat.icon />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts & Tables Row */}
            <div className="admin-form-grid" style={{ marginBottom: '1.5rem' }}>
                {/* Chart Card */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">Revenue Overview</h3>
                        <div className="admin-card-actions">
                            <select className="form-input" style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 3 months</option>
                            </select>
                        </div>
                    </div>
                    <div className="chart-container">
                        <div className="chart-placeholder">
                            <FaChartArea />
                            <p>Chart visualization would appear here</p>
                            <p style={{ fontSize: '0.8125rem' }}>Integrate with Chart.js or Recharts</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">Recent Activity</h3>
                    </div>
                    <div className="activity-list">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <div className={`activity-icon ${activity.type}`}>
                                    <activity.icon />
                                </div>
                                <div className="activity-content">
                                    <p className="activity-text" dangerouslySetInnerHTML={{ __html: activity.text }} />
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Users Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">Recent Users</h3>
                    <div className="admin-card-actions">
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                            Export
                        </button>
                        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                            + Add User
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
                                <th>Last Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user) => (
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
                                                <FaUser />
                                            </button>
                                            <button className="table-action-btn delete" title="Delete">
                                                <FaExclamationTriangle />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="admin-pagination">
                    <span className="pagination-info">Showing 1-{recentUsers.length} of {usersData.metadata.totalUsers} users</span>
                    <div className="pagination-buttons">
                        <button className="pagination-btn" disabled>&lt;</button>
                        <button className="pagination-btn active">1</button>
                        <button className="pagination-btn">2</button>
                        <button className="pagination-btn">3</button>
                        <button className="pagination-btn">&gt;</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
