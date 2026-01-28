'use client';

import AdminLayout from '../../components/admin/AdminLayout';
import {
    FaUsers, FaArrowUp, FaArrowDown, FaUser, FaExclamationTriangle,
    FaBriefcase, FaProjectDiagram, FaServicestack, FaQuoteLeft
} from 'react-icons/fa';
import usersData from '../../data/users.json';
import portfolioData from '../../data/portfolio.json';
import servicesData from '../../data/services.json';
import careerData from '../../data/career.json';
import testimonialsData from '../../data/testimonials.json';

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
        label: 'Active Users',
        value: usersData.users.filter(u => u.status === 'active').length.toString(),
        change: '+5.2%',
        positive: true,
        icon: FaUser,
        color: 'green'
    },
    {
        label: 'Total Projects',
        value: portfolioData.length.toString(),
        change: '+2',
        positive: true,
        icon: FaProjectDiagram,
        color: 'blue'
    },
    {
        label: 'Services',
        value: servicesData.length.toString(),
        change: '+1',
        positive: true,
        icon: FaServicestack,
        color: 'orange'
    },
    {
        label: 'Open Positions',
        value: careerData.length.toString(),
        change: 'New',
        positive: true,
        icon: FaBriefcase,
        color: 'cyan'
    },
    {
        label: 'Testimonials',
        value: testimonialsData.length.toString(),
        change: '+4.1%',
        positive: true,
        icon: FaQuoteLeft,
        color: 'pink'
    }
];

// Get recent users from users.json
const recentUsers = usersData.users.slice(0, 5).map(user => {
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

            {/* Recent Users Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">Recent Users</h3>
                    <div className="admin-card-actions">
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                            Export
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
                </div>
            </div>
        </AdminLayout>
    );
}
