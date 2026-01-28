'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaSave, FaGlobe, FaBuilding, FaShareAlt, FaSearch, FaCogs } from 'react-icons/fa';
import websiteConfigRaw from '../../../data/website-config.json';

export default function SettingsPage() {
    const [config, setConfig] = useState(websiteConfigRaw);
    const [activeTab, setActiveTab] = useState('site');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        alert('Settings saved successfully (Mock)');
    };

    const handleInputChange = (section: string, field: string, value: any) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...((prev as any)[section]),
                [field]: value
            }
        }));
    };

    const handleNestedInputChange = (section: string, subSection: string, field: string, value: any) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...((prev as any)[section]),
                [subSection]: {
                    ...((prev as any)[section][subSection]),
                    [field]: value
                }
            }
        }));
    };

    const tabs = [
        { id: 'site', label: 'General', icon: FaGlobe },
        { id: 'company', label: 'Company', icon: FaBuilding },
        { id: 'social', label: 'Social', icon: FaShareAlt },
        { id: 'seo', label: 'SEO', icon: FaSearch },
        { id: 'features', label: 'Features', icon: FaCogs },
    ];

    const renderField = (section: string, key: string, value: any, label: string) => {
        const type = typeof value;

        if (type === 'object' && value !== null && !Array.isArray(value)) {
            // Nested object - simplified for this demo by only showing top-level fields
            return null;
        }

        return (
            <div key={key} className="form-group">
                <label className="form-label">{label}</label>
                {type === 'boolean' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleInputChange(section, key, e.target.checked)}
                        />
                        <span>Enable {label}</span>
                    </div>
                ) : (
                    <input
                        type={type === 'number' ? 'number' : 'text'}
                        className="form-input"
                        value={value || ''}
                        onChange={(e) => handleInputChange(section, key, type === 'number' ? Number(e.target.value) : e.target.value)}
                    />
                )}
            </div>
        );
    };

    return (
        <AdminLayout pageTitle="Settings">
            <div className="settings-container">
                <div className="settings-sidebar admin-card">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`settings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="settings-content admin-card">
                    <div className="admin-card-header">
                        <h3 className="admin-card-title">
                            {tabs.find(t => t.id === activeTab)?.label} Settings
                        </h3>
                    </div>

                    <form onSubmit={handleSave} style={{ padding: '1.5rem' }}>
                        <div className="admin-form-grid">
                            {Object.entries((config as any)[activeTab]).map(([key, value]) => {
                                // Basic dynamic field generation
                                // Convert camelCase or snake_case to Title Case for labels
                                const label = key
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, str => str.toUpperCase());

                                return renderField(activeTab, key, value, label);
                            })}
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" className="btn btn-primary" disabled={isSaving}>
                                <FaSave /> {isSaving ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .settings-container {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
                .settings-sidebar {
                    padding: 0.5rem;
                    display: flex;
                    gap: 0.5rem;
                    overflow-x: auto;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-lg);
                    scrollbar-width: none;
                }
                .settings-sidebar::-webkit-scrollbar {
                    display: none;
                }
                .settings-tab-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1.25rem;
                    border: none;
                    background: none;
                    color: var(--text-muted);
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.9375rem;
                    white-space: nowrap;
                }
                .settings-tab-btn:hover {
                    background: var(--glass-hover);
                    color: var(--text-primary);
                }
                .settings-tab-btn.active {
                    background: var(--accent-gradient);
                    color: white;
                    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
                }
                .form-group {
                    margin-bottom: 1.25rem;
                }
                .form-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                }
            `}</style>
        </AdminLayout>
    );
}
