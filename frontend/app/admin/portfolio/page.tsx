'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import Image from 'next/image';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes, FaEye, FaChevronRight, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import portfolioDataRaw from '../../../data/portfolio.json';
import DeleteConfirmModal from '../../../components/ui/DeleteConfirmModal';
import { useDeleteConfirm } from '../../../lib/hooks/useDeleteConfirm';

interface PortfolioProject {
    id: number;
    slug: string;
    title: string;
    category: string;
    industry: string;
    client: {
        name: string;
        location: string;
    };
    description: string;
    keyFeatures: string[];
    techStack: Record<string, string[]>;
    metrics: Record<string, string>;
    timeline: string;
    status: string;
    servicesProvided: string[];
    links: {
        live: string | null;
        caseStudy: string | null;
        github: string | null;
    };
    thumbnail: string;
    featured: boolean;
    [key: string]: any;
}

export default function PortfolioPage() {
    const [projects, setProjects] = useState<PortfolioProject[]>(portfolioDataRaw as unknown as PortfolioProject[]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
    const [viewingProject, setViewingProject] = useState<PortfolioProject | null>(null);
    const [formData, setFormData] = useState<Partial<PortfolioProject>>({});
    const deleteConfirm = useDeleteConfirm();

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = (project: PortfolioProject | null = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                ...project,
                keyFeatures: project.keyFeatures?.join('\n') as any,
                servicesProvided: project.servicesProvided?.join('\n') as any,
            });
        } else {
            setEditingProject(null);
            setFormData({
                id: Date.now(),
                slug: '',
                title: '',
                category: 'Web Development',
                industry: '',
                client: { name: '', location: '' },
                description: '',
                keyFeatures: '' as any,
                techStack: { frontend: [], backend: [] },
                metrics: {},
                timeline: '',
                status: 'Completed',
                servicesProvided: '' as any,
                links: { live: '', caseStudy: '', github: '' },
                thumbnail: '',
                featured: false
            });
        }
        setIsModalOpen(true);
    };

    const handleOpenDetail = (project: PortfolioProject) => {
        setViewingProject(project);
        setIsDetailOpen(true);
    };

    const handleCloseModals = () => {
        setIsModalOpen(false);
        setIsDetailOpen(false);
        setEditingProject(null);
        setViewingProject(null);
        setFormData({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...(prev[parent as keyof PortfolioProject] || {}), [child]: val }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: val }));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const processedData = {
            ...formData,
            keyFeatures: (formData.keyFeatures as any)?.split('\n').filter((i: string) => i.trim()),
            servicesProvided: (formData.servicesProvided as any)?.split('\n').filter((i: string) => i.trim()),
        };

        if (editingProject) {
            setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...processedData } as PortfolioProject : p));
        } else {
            setProjects(prev => [...prev, processedData as PortfolioProject]);
        }
        handleCloseModals();
    };

    const handleDelete = (id: number, title: string) => {
        deleteConfirm.showDeleteConfirm({
            title: 'Delete Project',
            message: 'This action will permanently delete this portfolio project. This cannot be undone.',
            itemName: title,
            onConfirm: () => {
                setProjects(prev => prev.filter(p => p.id !== id));
            }
        });
    };

    return (
        <AdminLayout pageTitle="Portfolio">
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
                        <input type="text" className="form-input" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ paddingLeft: '2.5rem' }} />
                        <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    </div>
                    <button className="btn btn-primary" onClick={() => handleOpenModal()} style={{ marginLeft: 'auto' }}>
                        <FaPlus /> Add Project
                    </button>
                </div>
            </div>

            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">All Projects ({filteredProjects.length})</h3>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Category</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                                                {p.thumbnail && (
                                                    <Image
                                                        src={p.thumbnail}
                                                        alt={p.title}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                        unoptimized={true}
                                                    />
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 600 }}>{p.title}</span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.industry}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{p.category}</td>
                                    <td>{p.client?.name}</td>
                                    <td>
                                        <span className={`status-badge active`} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>{p.status}</span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" onClick={() => handleOpenDetail(p)} title="View Detail"><FaEye /></button>
                                            <button className="table-action-btn" onClick={() => handleOpenModal(p)} title="Edit"><FaEdit /></button>
                                            <button className="table-action-btn delete" onClick={() => handleDelete(p.id, p.title)} title="Delete"><FaTrash /></button>
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
                    <div className="modal-content admin-card">
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">{editingProject ? 'Edit Project' : 'Add Project'}</h3>
                            <button className="table-action-btn" onClick={handleCloseModals}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ padding: '1.5rem' }}>
                            <div className="admin-grid-3">
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Project Title</label>
                                    <input name="title" className="form-input" value={formData.title || ''} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select name="category" className="form-input" value={formData.category || ''} onChange={handleInputChange}>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Mobile App Development">Mobile App Development</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Client Name</label>
                                    <input name="client.name" className="form-input" value={formData.client?.name || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Client Location</label>
                                    <input name="client.location" className="form-input" value={formData.client?.location || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Timeline</label>
                                    <input name="timeline" className="form-input" value={formData.timeline || ''} onChange={handleInputChange} placeholder="e.g. 3 Months" />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 3' }}>
                                    <label className="form-label">Description</label>
                                    <textarea name="description" className="form-input" value={formData.description || ''} onChange={handleInputChange} rows={2} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Features (One per line)</label>
                                    <textarea name="keyFeatures" className="form-input" value={formData.keyFeatures as any || ''} onChange={handleInputChange} rows={5} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Services Provided (One per line)</label>
                                    <textarea name="servicesProvided" className="form-input" value={formData.servicesProvided as any || ''} onChange={handleInputChange} rows={5} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Live Link</label>
                                    <input name="links.live" className="form-input" value={formData.links?.live || ''} onChange={handleInputChange} />
                                    <label className="form-label" style={{ marginTop: '0.75rem' }}>GitHub Link</label>
                                    <input name="links.github" className="form-input" value={formData.links?.github || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Featured</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <input type="checkbox" name="featured" checked={!!formData.featured} onChange={handleInputChange} />
                                        <span>Show on Portfolio page</span>
                                    </div>
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

            {isDetailOpen && viewingProject && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card" style={{ maxWidth: '900px' }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">{viewingProject.title}</h3>
                            <button className="table-action-btn" onClick={handleCloseModals}><FaTimes /></button>
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <div className="detail-grid">
                                <div>
                                    <h5 style={{ color: 'var(--accent-start)', marginBottom: '1rem' }}>Project Meta</h5>
                                    <p><strong>Category:</strong> {viewingProject.category}</p>
                                    <p><strong>Industry:</strong> {viewingProject.industry}</p>
                                    <p><strong>Client:</strong> {viewingProject.client?.name} ({viewingProject.client?.location})</p>
                                    <p><strong>Timeline:</strong> {viewingProject.timeline}</p>
                                    <p><strong>Status:</strong> {viewingProject.status}</p>
                                    <div style={{ marginTop: '1rem' }}>
                                        {viewingProject.links.live && <a href={viewingProject.links.live} target="_blank" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}>Live Preview <FaExternalLinkAlt size={10} /></a>}
                                    </div>
                                </div>
                                <div>
                                    <h5 style={{ color: 'var(--accent-start)', marginBottom: '0.5rem' }}>Overview</h5>
                                    <p style={{ lineHeight: 1.6 }}>{viewingProject.description}</p>

                                    <div className="admin-grid-2" style={{ marginTop: '1.5rem' }}>
                                        <div>
                                            <h6 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Key Features</h6>
                                            <ul style={{ padding: 0, listStyle: 'none' }}>
                                                {viewingProject.keyFeatures?.map((f, i) => <li key={i} style={{ fontSize: '0.8125rem', marginBottom: '0.25rem' }}><FaChevronRight size={8} /> {f}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h6 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Services Provided</h6>
                                            <ul style={{ padding: 0, listStyle: 'none' }}>
                                                {viewingProject.servicesProvided?.map((s, i) => <li key={i} style={{ fontSize: '0.8125rem', marginBottom: '0.25rem' }}><FaChevronRight size={8} /> {s}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 2rem; }
                .modal-content { width: 100%; max-width: 1000px; max-height: 90vh; overflow-y: auto; background: var(--primary-light); box-shadow: var(--shadow-lg); }
                .form-group { margin-bottom: 1.25rem; }
                .form-label { display: block; margin-bottom: 0.375rem; font-size: 0.8125rem; font-weight: 500; color: var(--text-muted); text-transform: uppercase; }
                .modal-content .form-input { background: var(--primary); border: 1px solid var(--glass-border); color: var(--text-primary); width: 100%; padding: 0.75rem; border-radius: 8px; font-size: 0.9375rem; }
                .modal-content h5 { font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
                .detail-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; margin-bottom: 2rem; }
                @media (min-width: 768px) {
                    .detail-grid { grid-template-columns: 1fr 2fr; }
                }
            `}</style>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal {...deleteConfirm.modalProps} />
        </AdminLayout>
    );
}
