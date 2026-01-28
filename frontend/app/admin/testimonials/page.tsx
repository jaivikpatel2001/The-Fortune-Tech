'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes, FaEye, FaChevronRight, FaStar, FaQuoteLeft } from 'react-icons/fa';
import testimonialsDataRaw from '../../../data/testimonials.json';

interface Testimonial {
    id: number;
    slug: string;
    name: string;
    role: string;
    company: string;
    industry: string;
    serviceProvided: string;
    projectType: string;
    rating: number;
    content: string;
    metrics: Record<string, string>;
    avatar: string;
    linkedin: string | null;
    website: string | null;
    verified: boolean;
    featured: boolean;
    [key: string]: any;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsDataRaw as unknown as Testimonial[]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [viewingTestimonial, setViewingTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState<Partial<Testimonial>>({});

    const filtered = testimonials.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = (testimonial: Testimonial | null = null) => {
        if (testimonial) {
            setEditingTestimonial(testimonial);
            setFormData(testimonial);
        } else {
            setEditingTestimonial(null);
            setFormData({
                id: Date.now(),
                name: '',
                role: '',
                company: '',
                rating: 5,
                content: '',
                verified: true,
                featured: false
            });
        }
        setIsModalOpen(true);
    };

    const handleOpenDetail = (t: Testimonial) => {
        setViewingTestimonial(t);
        setIsDetailOpen(true);
    };

    const handleCloseModals = () => {
        setIsModalOpen(false);
        setIsDetailOpen(false);
        setEditingTestimonial(null);
        setViewingTestimonial(null);
        setFormData({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : (type === 'number' ? Number(value) : value);
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTestimonial) {
            setTestimonials(prev => prev.map(t => t.id === editingTestimonial.id ? { ...t, ...formData } as Testimonial : t));
        } else {
            setTestimonials(prev => [...prev, formData as Testimonial]);
        }
        handleCloseModals();
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            setTestimonials(prev => prev.filter(t => t.id !== id));
        }
    };

    return (
        <AdminLayout pageTitle="Testimonials">
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
                        <input type="text" className="form-input" placeholder="Search testimonials..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ paddingLeft: '2.5rem' }} />
                        <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    </div>
                    <button className="btn btn-primary" onClick={() => handleOpenModal()} style={{ marginLeft: 'auto' }}>
                        <FaPlus /> Add Testimonial
                    </button>
                </div>
            </div>

            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">Client Feedback ({filtered.length})</h3>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((t) => (
                                <tr key={t.id}>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                            <div className="table-user-avatar">{t.name[0]}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 600 }}>{t.name}</span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role} at {t.company}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                                            {t.featured && <span className="status-badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-start)' }}>Featured</span>}
                                            {t.verified && <span className="status-badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>Verified</span>}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ color: '#f59e0b', display: 'flex', gap: '2px' }}>
                                            {[...Array(t.rating)].map((_, i) => <FaStar key={i} size={12} />)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" onClick={() => handleOpenDetail(t)}><FaEye /></button>
                                            <button className="table-action-btn" onClick={() => handleOpenModal(t)}><FaEdit /></button>
                                            <button className="table-action-btn delete" onClick={() => handleDelete(t.id)}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card" style={{ maxWidth: '700px' }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                            <button className="table-action-btn" onClick={handleCloseModals}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ padding: '1.5rem' }}>
                            <div className="admin-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Client Name</label>
                                    <input name="name" className="form-input" value={formData.name || ''} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Rating (1-5)</label>
                                    <input type="number" name="rating" min="1" max="5" className="form-input" value={formData.rating || 5} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Role</label>
                                    <input name="role" className="form-input" value={formData.role || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company</label>
                                    <input name="company" className="form-input" value={formData.company || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Testimonial Content</label>
                                    <textarea name="content" className="form-input" value={formData.content || ''} onChange={handleInputChange} rows={4} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Featured</label>
                                    <input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Verified Client</label>
                                    <input type="checkbox" name="verified" checked={!!formData.verified} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" className="btn btn-outline" onClick={handleCloseModals}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><FaSave /> Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDetailOpen && viewingTestimonial && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card" style={{ maxWidth: '600px' }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">Testimonial Detail</h3>
                            <button className="table-action-btn" onClick={handleCloseModals}><FaTimes /></button>
                        </div>
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <div className="table-user-avatar" style={{ width: '80px', height: '80px', margin: '0 auto 1rem', fontSize: '2rem' }}>{viewingTestimonial.name[0]}</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{viewingTestimonial.name}</h4>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{viewingTestimonial.role} @ {viewingTestimonial.company}</p>
                            <div style={{ color: '#f59e0b', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                                {[...Array(viewingTestimonial.rating)].map((_, i) => <FaStar key={i} />)}
                            </div>
                            <div style={{ background: 'var(--primary)', padding: '1.5rem', borderRadius: '12px', fontStyle: 'italic', position: 'relative' }}>
                                <FaQuoteLeft style={{ position: 'absolute', top: '10px', left: '10px', opacity: 0.1, fontSize: '2rem' }} />
                                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>"{viewingTestimonial.content}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 2rem; }
                .modal-content { width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; background: var(--primary-light); box-shadow: var(--shadow-lg); }
                .form-group { margin-bottom: 1.25rem; }
                .form-label { display: block; margin-bottom: 0.375rem; font-size: 0.8125rem; font-weight: 500; color: var(--text-muted); }
                .modal-content .form-input { background: var(--primary); border: 1px solid var(--glass-border); color: var(--text-primary); width: 100%; padding: 0.75rem; border-radius: 8px; }
            `}</style>
        </AdminLayout>
    );
}
