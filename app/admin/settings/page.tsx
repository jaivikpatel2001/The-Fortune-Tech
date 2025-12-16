'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaSave, FaUndo } from 'react-icons/fa';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: 'Fortune Tech',
        siteEmail: 'hello@fortunetech.com',
        timezone: 'UTC-8',
        language: 'en',
        emailNotifications: true,
        pushNotifications: true,
        twoFactorAuth: false,
        maintenanceMode: false,
        apiAccess: true,
        analyticsTracking: true,
    });

    const handleToggle = (key: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }));
    };

    return (
        <AdminLayout pageTitle="Settings">
            <div className="admin-form-grid">
                {/* General Settings */}
                <div>
                    <div className="admin-form-section">
                        <h3 className="admin-form-section-title">General Settings</h3>

                        <div className="admin-form-row">
                            <div className="form-group">
                                <label className="form-label">Site Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Site Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={settings.siteEmail}
                                    onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="admin-form-row">
                            <div className="form-group">
                                <label className="form-label">Timezone</label>
                                <select
                                    className="form-input"
                                    value={settings.timezone}
                                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                                >
                                    <option value="UTC-12">UTC-12:00</option>
                                    <option value="UTC-8">UTC-08:00 (Pacific)</option>
                                    <option value="UTC-5">UTC-05:00 (Eastern)</option>
                                    <option value="UTC">UTC+00:00</option>
                                    <option value="UTC+5:30">UTC+05:30 (India)</option>
                                    <option value="UTC+8">UTC+08:00 (China)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Language</label>
                                <select
                                    className="form-input"
                                    value={settings.language}
                                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="ja">Japanese</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="admin-form-section" style={{ marginTop: '1.5rem' }}>
                        <h3 className="admin-form-section-title">Notifications</h3>

                        <div className="toggle-wrapper">
                            <div className="toggle-label">
                                <span className="toggle-label-title">Email Notifications</span>
                                <span className="toggle-label-description">Receive email updates about account activity</span>
                            </div>
                            <div
                                className={`toggle-switch ${settings.emailNotifications ? 'active' : ''}`}
                                onClick={() => handleToggle('emailNotifications')}
                            />
                        </div>

                        <div className="toggle-wrapper">
                            <div className="toggle-label">
                                <span className="toggle-label-title">Push Notifications</span>
                                <span className="toggle-label-description">Receive push notifications in browser</span>
                            </div>
                            <div
                                className={`toggle-switch ${settings.pushNotifications ? 'active' : ''}`}
                                onClick={() => handleToggle('pushNotifications')}
                            />
                        </div>
                    </div>
                </div>

                {/* Security & Advanced */}
                <div>
                    <div className="admin-form-section">
                        <h3 className="admin-form-section-title">Security</h3>

                        <div className="toggle-wrapper">
                            <div className="toggle-label">
                                <span className="toggle-label-title">Two-Factor Authentication</span>
                                <span className="toggle-label-description">Add extra layer of security</span>
                            </div>
                            <div
                                className={`toggle-switch ${settings.twoFactorAuth ? 'active' : ''}`}
                                onClick={() => handleToggle('twoFactorAuth')}
                            />
                        </div>

                        <div className="toggle-wrapper">
                            <div className="toggle-label">
                                <span className="toggle-label-title">API Access</span>
                                <span className="toggle-label-description">Allow API access to your data</span>
                            </div>
                            <div
                                className={`toggle-switch ${settings.apiAccess ? 'active' : ''}`}
                                onClick={() => handleToggle('apiAccess')}
                            />
                        </div>
                    </div>

                    <div className="admin-form-section" style={{ marginTop: '1.5rem' }}>
                        <h3 className="admin-form-section-title">Advanced</h3>

                        <div className="toggle-wrapper">
                            <div className="toggle-label">
                                <span className="toggle-label-title">Maintenance Mode</span>
                                <span className="toggle-label-description">Take the site offline temporarily</span>
                            </div>
                            <div
                                className={`toggle-switch ${settings.maintenanceMode ? 'active' : ''}`}
                                onClick={() => handleToggle('maintenanceMode')}
                            />
                        </div>

                        <div className="toggle-wrapper">
                            <div className="toggle-label">
                                <span className="toggle-label-title">Analytics Tracking</span>
                                <span className="toggle-label-description">Track user behavior and analytics</span>
                            </div>
                            <div
                                className={`toggle-switch ${settings.analyticsTracking ? 'active' : ''}`}
                                onClick={() => handleToggle('analyticsTracking')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
                <button className="btn btn-outline">
                    <FaUndo />
                    Reset Changes
                </button>
                <button className="btn btn-primary">
                    <FaSave />
                    Save Settings
                </button>
            </div>
        </AdminLayout>
    );
}
