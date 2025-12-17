'use client';

import AdminLayout from '../../../components/admin/AdminLayout';
import { FaChartLine, FaChartBar, FaChartArea, FaChartPie, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const analyticsStats = [
    { label: 'Page Views', value: '245,892', change: '+18.2%', positive: true },
    { label: 'Unique Visitors', value: '48,291', change: '+12.5%', positive: true },
    { label: 'Bounce Rate', value: '32.4%', change: '-5.1%', positive: true },
    { label: 'Avg. Session', value: '4m 32s', change: '+8.3%', positive: true },
];

const topPages = [
    { path: '/', views: '45,234', percentage: 28 },
    { path: '/services', views: '32,891', percentage: 20 },
    { path: '/portfolio', views: '28,456', percentage: 17 },
    { path: '/about', views: '18,923', percentage: 12 },
    { path: '/contact', views: '15,678', percentage: 10 },
];

const trafficSources = [
    { source: 'Organic Search', visitors: '58,234', percentage: 42, color: '#8b5cf6' },
    { source: 'Direct', visitors: '32,891', percentage: 24, color: '#06b6d4' },
    { source: 'Social Media', visitors: '24,567', percentage: 18, color: '#22c55e' },
    { source: 'Referral', visitors: '15,234', percentage: 11, color: '#f59e0b' },
    { source: 'Email', visitors: '6,892', percentage: 5, color: '#ef4444' },
];

export default function AnalyticsPage() {
    return (
        <AdminLayout pageTitle="Analytics">
            {/* Stats Overview */}
            <div className="stats-grid">
                {analyticsStats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-info">
                            <span className="stat-info-label">{stat.label}</span>
                            <span className="stat-info-value">{stat.value}</span>
                            <span className={`stat-info-change ${stat.positive ? 'positive' : 'negative'}`}>
                                {stat.positive ? <FaArrowUp /> : <FaArrowDown />}
                                {stat.change}
                            </span>
                        </div>
                        <div className={`stat-icon ${['purple', 'blue', 'green', 'orange'][index]}`}>
                            {[FaChartLine, FaChartBar, FaChartArea, FaChartPie][index]({ size: 20 })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-form-grid" style={{ marginBottom: '1.5rem' }}>
                {/* Traffic Chart */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">Traffic Overview</h3>
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
                            <FaChartArea style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
                            <p>Traffic chart visualization</p>
                            <p style={{ fontSize: '0.8125rem' }}>Integrate with Chart.js or Recharts</p>
                        </div>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">Traffic Sources</h3>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        {trafficSources.map((source, index) => (
                            <div key={index} style={{ marginBottom: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{source.source}</span>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{source.visitors} ({source.percentage}%)</span>
                                </div>
                                <div style={{ height: '8px', background: 'var(--glass-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${source.percentage}%`,
                                        height: '100%',
                                        background: source.color,
                                        borderRadius: 'var(--radius-full)',
                                        transition: 'width 0.5s ease'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Pages */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">Top Pages</h3>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Page Path</th>
                                <th>Views</th>
                                <th>Percentage</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topPages.map((page, index) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{page.path}</td>
                                    <td>{page.views}</td>
                                    <td>{page.percentage}%</td>
                                    <td style={{ width: '200px' }}>
                                        <div style={{ height: '8px', background: 'var(--glass-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${page.percentage}%`,
                                                height: '100%',
                                                background: 'var(--accent-gradient)',
                                                borderRadius: 'var(--radius-full)'
                                            }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
