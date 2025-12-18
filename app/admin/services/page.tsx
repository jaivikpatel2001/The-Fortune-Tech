'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes, FaEye, FaChevronRight } from 'react-icons/fa';
import servicesDataRaw from '../../../data/services.json';

interface Service {
    id: string;
    title: string;
    tagline: string;
    description: string;
    overview: string;
    icon: string;
    image: string;
    features: string[];
    deliverables: string[];
    process: string[];
    techStack: string[];
    benefits: string[];
    idealFor: string[];
    cta: string;
    seo: {
        metaTitle: string;
        metaDescription: string;
    };
    pricingHint: string;
    featured: boolean;
    [key: string]: any;
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>(servicesDataRaw as Service[]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [viewingService, setViewingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState<Partial<Service>>({});

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = (service: Service | null = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                ...service,
                features: service.features?.join('\n') as any,
                deliverables: service.deliverables?.join('\n') as any,
                process: service.process?.join('\n') as any,
                techStack: service.techStack?.join('\n') as any,
                benefits: service.benefits?.join('\n') as any,
                idealFor: service.idealFor?.join('\n') as any,
            });
        } else {
            setEditingService(null);
            setFormData({
                id: `service-${Date.now()}`,
                title: '',
                tagline: '',
                description: '',
                overview: '',
                icon: 'FaBox',
                image: '',
                features: '' as any,
                deliverables: '' as any,
                process: '' as any,
                techStack: '' as any,
                benefits: '' as any,
                idealFor: '' as any,
                cta: 'Learn More',
                seo: { metaTitle: '', metaDescription: '' },
                featured: false,
                pricingHint: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleOpenDetail = (service: Service) => {
        setViewingService(service);
        setIsDetailOpen(true);
    };

    const handleCloseModals = () => {
        setIsModalOpen(false);
        setIsDetailOpen(false);
        setEditingService(null);
        setViewingService(null);
        setFormData({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        if (name.startsWith('seo.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                seo: { ...prev.seo, [field]: val } as any
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: val }));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert multiline strings back to arrays
        const processedData = {
            ...formData,
            features: (formData.features as any)?.split('\n').filter((i: string) => i.trim()),
            deliverables: (formData.deliverables as any)?.split('\n').filter((i: string) => i.trim()),
            process: (formData.process as any)?.split('\n').filter((i: string) => i.trim()),
            techStack: (formData.techStack as any)?.split('\n').filter((i: string) => i.trim()),
            benefits: (formData.benefits as any)?.split('\n').filter((i: string) => i.trim()),
            idealFor: (formData.idealFor as any)?.split('\n').filter((i: string) => i.trim()),
        };

        if (editingService) {
            setServices(prev => prev.map(s => s.id === editingService.id ? { ...s, ...processedData } as Service : s));
        } else {
            setServices(prev => [...prev, processedData as Service]);
        }
        handleCloseModals();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(prev => prev.filter(s => s.id !== id));
        }
    };

    return (
        <AdminLayout pageTitle="Services">
            {/* Header Actions */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search services..."
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

                    <button className="btn btn-primary" onClick={() => handleOpenModal()} style={{ marginLeft: 'auto' }}>
                        <FaPlus /> Add Service
                    </button>
                </div>
            </div>

            {/* Services Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">All Services ({filteredServices.length})</h3>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Category/Price</th>
                                <th>Featured</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServices.map((service) => (
                                <tr key={service.id}>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{service.title}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{service.tagline}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.875rem' }}>{service.pricingHint}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${service.featured ? 'active' : 'inactive'}`}>
                                            {service.featured ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" onClick={() => handleOpenDetail(service)} title="View Detail">
                                                <FaEye />
                                            </button>
                                            <button className="table-action-btn" onClick={() => handleOpenModal(service)} title="Edit">
                                                <FaEdit />
                                            </button>
                                            <button className="table-action-btn delete" onClick={() => handleDelete(service.id)} title="Delete">
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

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card">
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">{editingService ? 'Edit Service' : 'Add Service'}</h3>
                            <button className="table-action-btn" onClick={handleCloseModals}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ padding: '1.5rem' }}>
                            <div className="admin-form-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input name="title" className="form-input" value={formData.title || ''} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Tagline</label>
                                    <input name="tagline" className="form-input" value={formData.tagline || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Description (Short)</label>
                                    <textarea name="description" className="form-input" value={formData.description || ''} onChange={handleInputChange} required rows={2} />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Overview (Long)</label>
                                    <textarea name="overview" className="form-input" value={formData.overview || ''} onChange={handleInputChange} rows={4} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Pricing Hint</label>
                                    <input name="pricingHint" className="form-input" value={formData.pricingHint || ''} onChange={handleInputChange} placeholder="e.g. Starting from ₹30,000" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">CTA Button Text</label>
                                    <input name="cta" className="form-input" value={formData.cta || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Icon (FontAwesome Name)</label>
                                    <input name="icon" className="form-input" value={formData.icon || ''} onChange={handleInputChange} placeholder="e.g. FaCode" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Featured</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '42px' }}>
                                        <input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleInputChange} />
                                        <span>Show on homepage</span>
                                    </div>
                                </div>

                                {/* Multi-line List Fields */}
                                {[
                                    { name: 'features', label: 'Features (One per line)' },
                                    { name: 'deliverables', label: 'Deliverables (One per line)' },
                                    { name: 'process', label: 'Process (One per line)' },
                                    { name: 'techStack', label: 'Tech Stack (One per line)' },
                                    { name: 'benefits', label: 'Benefits (One per line)' },
                                    { name: 'idealFor', label: 'Ideal For (One per line)' }
                                ].map((field) => (
                                    <div key={field.name} className="form-group">
                                        <label className="form-label">{field.label}</label>
                                        <textarea name={field.name} className="form-input" value={formData[field.name as keyof Service] as any || ''} onChange={handleInputChange} rows={4} />
                                    </div>
                                ))}

                                {/* SEO Section */}
                                <div className="form-group" style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                                    <h4 style={{ marginBottom: '1rem', fontSize: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>SEO Settings</h4>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Meta Title</label>
                                    <input name="seo.metaTitle" className="form-input" value={formData.seo?.metaTitle || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Meta Description</label>
                                    <textarea name="seo.metaDescription" className="form-input" value={formData.seo?.metaDescription || ''} onChange={handleInputChange} rows={2} />
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" className="btn btn-outline" onClick={handleCloseModals}>Cancel</button>
                                <button type="submit" className="btn btn-primary">
                                    <FaSave /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Detail View Modal */}
            {isDetailOpen && viewingService && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card detail-view">
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">Service Details: {viewingService.title}</h3>
                            <button className="table-action-btn" onClick={handleCloseModals}><FaTimes /></button>
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <div className="detail-grid">
                                <div className="detail-section">
                                    <h5>Basic Info</h5>
                                    <p><strong>Tagline:</strong> {viewingService.tagline}</p>
                                    <p><strong>Pricing:</strong> {viewingService.pricingHint}</p>
                                    <p><strong>CTA:</strong> {viewingService.cta}</p>
                                    <p><strong>Icon:</strong> {viewingService.icon}</p>
                                </div>
                                <div className="detail-section">
                                    <h5>Description</h5>
                                    <p>{viewingService.description}</p>
                                    <h5 style={{ marginTop: '1rem' }}>Overview</h5>
                                    <p style={{ fontSize: '0.875rem' }}>{viewingService.overview}</p>
                                </div>
                            </div>

                            <div className="detail-lists-grid">
                                {[
                                    { label: 'Features', data: viewingService.features },
                                    { label: 'Deliverables', data: viewingService.deliverables },
                                    { label: 'Process', data: viewingService.process },
                                    { label: 'Tech Stack', data: viewingService.techStack },
                                    { label: 'Benefits', data: viewingService.benefits },
                                    { label: 'Ideal For', data: viewingService.idealFor },
                                ].map((list) => list.data && (
                                    <div key={list.label} className="detail-list-item">
                                        <h6>{list.label}</h6>
                                        <ul>
                                            {list.data.map((item, idx) => <li key={idx}><FaChevronRight size={10} /> {item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="detail-section" style={{ marginTop: '1.5rem', background: 'var(--primary)', padding: '1rem', borderRadius: '8px' }}>
                                <h6 style={{ marginBottom: '0.5rem' }}>SEO Information</h6>
                                <p style={{ fontSize: '0.8125rem' }}><strong>Title:</strong> {viewingService.seo?.metaTitle}</p>
                                <p style={{ fontSize: '0.8125rem' }}><strong>Description:</strong> {viewingService.seo?.metaDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                }
                .modal-content {
                    width: 100%;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow-y: auto;
                    background: var(--primary-light);
                    box-shadow: var(--shadow-lg);
                }
                .detail-view {
                    max-width: 1000px;
                }
                .form-group {
                    margin-bottom: 1.25rem;
                }
                .form-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--text-primary);
                }
                .modal-content .form-input,
                .modal-content .form-textarea {
                    background: var(--primary);
                    border: 1px solid var(--glass-border);
                    color: var(--text-primary);
                }
                
                .detail-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                .detail-section h5 {
                    color: var(--accent-start);
                    margin-bottom: 0.75rem;
                    font-size: 0.9375rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .detail-section p {
                    margin-bottom: 0.5rem;
                    font-size: 0.9375rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                }
                .detail-lists-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1.5rem;
                }
                .detail-list-item h6 {
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                    color: var(--text-primary);
                    border-bottom: 1px solid var(--glass-border);
                    padding-bottom: 0.25rem;
                }
                .detail-list-item ul {
                    list-style: none;
                    padding: 0;
                }
                .detail-list-item li {
                    font-size: 0.8125rem;
                    color: var(--text-muted);
                    margin-bottom: 0.375rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
            `}</style>
        </AdminLayout>
    );
}
