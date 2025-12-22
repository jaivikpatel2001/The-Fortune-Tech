'use client';

import { useState, Suspense, lazy, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaSave, FaPlus, FaTrash, FaEdit, FaSearch, FaTimes } from 'react-icons/fa';
import DeleteConfirmModal from '../../../components/ui/DeleteConfirmModal';
import { useDeleteConfirm } from '../../../lib/hooks/useDeleteConfirm';
import cmsDataRaw from '../../../data/cms.json';

const SummernoteEditor = lazy(() => import('../../../components/ui/SummernoteEditor'));

interface CMSPage {
    id: string;
    title: string;
    slug: string;
    status: 'published' | 'draft';
    metaTitle: string;
    metaDescription: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export default function CMSPage() {
    // Transform old data structure to new structure
    const transformOldData = () => {
        return cmsDataRaw.pages.map((page: any) => ({
            id: page.id,
            title: page.title,
            slug: page.id,
            status: 'published' as const,
            metaTitle: page.title,
            metaDescription: `Learn about ${page.title}`,
            content: page.content.map((section: any) =>
                `<h2>${section.heading}</h2>${section.html}`
            ).join('\n'),
            createdAt: page.lastUpdated,
            updatedAt: page.lastUpdated
        }));
    };

    const [cmsPages, setCmsPages] = useState<CMSPage[]>(transformOldData());
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
    const [formData, setFormData] = useState<Partial<CMSPage>>({});
    const deleteConfirm = useDeleteConfirm();

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            // Store current scroll position
            const scrollY = window.scrollY;

            // Disable body scroll
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';

            return () => {
                // Re-enable body scroll
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';

                // Restore scroll position
                window.scrollTo(0, scrollY);
            };
        }
    }, [isModalOpen]);

    const filteredPages = cmsPages.filter(page => {
        const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            page.slug.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleOpenModal = (page: CMSPage | null = null) => {
        if (page) {
            setEditingPage(page);
            setFormData({ ...page });
        } else {
            setEditingPage(null);
            const now = new Date().toISOString().split('T')[0];
            setFormData({
                id: `page-${Date.now()}`,
                title: '',
                slug: '',
                status: 'draft',
                metaTitle: '',
                metaDescription: '',
                content: '',
                createdAt: now,
                updatedAt: now
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPage(null);
        setFormData({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        const now = new Date().toISOString().split('T')[0];
        const updatedData = {
            ...formData,
            updatedAt: now
        } as CMSPage;

        if (editingPage) {
            setCmsPages(prev => prev.map(p => p.id === editingPage.id ? updatedData : p));
        } else {
            setCmsPages(prev => [...prev, updatedData]);
        }

        alert('Page saved! In production, this would update the cms.json file.');
        handleCloseModal();
    };

    const handleDelete = (id: string, title: string) => {
        deleteConfirm.showDeleteConfirm({
            title: 'Delete Page',
            message: 'This action will permanently delete this CMS page. This cannot be undone.',
            itemName: title,
            onConfirm: () => {
                setCmsPages(prev => prev.filter(p => p.id !== id));
            }
        });
    };

    return (
        <AdminLayout pageTitle="CMS Pages">
            <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                    Manage static content pages and policies
                </p>
            </div>

            {/* Search & Filters */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search pages..."
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

                    <select
                        className="form-input"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ width: 'auto', padding: '0.75rem 2rem 0.75rem 1rem' }}
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>

                    <button className="btn btn-primary" onClick={() => handleOpenModal()} style={{ marginLeft: 'auto' }}>
                        <FaPlus /> Create New Page
                    </button>
                </div>
            </div>

            {/* Pages Table */}
            <div className="admin-card">
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPages.map((page) => (
                                <tr key={page.id}>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{page.title}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/{page.slug}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${page.status === 'published' ? 'active' : 'inactive'}`} style={{
                                            background: page.status === 'published' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                                            color: page.status === 'published' ? '#10b981' : '#f59e0b',
                                            textTransform: 'uppercase'
                                        }}>
                                            {page.status}
                                        </span>
                                    </td>
                                    <td>{page.createdAt}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" onClick={() => handleOpenModal(page)} title="Edit Page">
                                                <FaEdit />
                                            </button>
                                            <button className="table-action-btn delete" onClick={() => handleDelete(page.id, page.title)} title="Delete Page">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredPages.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            No pages found
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Page Modal */}
            {isModalOpen && (
                <div className="modal-overlay" data-lenis-prevent onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
                    <div className="modal-container" data-lenis-prevent>
                        {/* Fixed Header */}
                        <div className="modal-header admin-card-header">
                            <h3 className="admin-card-title">{editingPage ? 'Edit Page' : 'Create New Page'}</h3>
                            <button className="table-action-btn" onClick={handleCloseModal} type="button"><FaTimes /></button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="modal-body">
                            <form onSubmit={handleSave} id="cms-form">
                                <div className="admin-grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Page Title *</label>
                                        <input
                                            name="title"
                                            className="form-input"
                                            value={formData.title || ''}
                                            onChange={handleInputChange}
                                            placeholder="Privacy Policy"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Slug (URL) *</label>
                                        <input
                                            name="slug"
                                            className="form-input"
                                            value={formData.slug || ''}
                                            onChange={handleInputChange}
                                            placeholder="privacy-policy"
                                            required
                                        />
                                        <small style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                                            URL: /cms/{formData.slug || 'slug'}
                                        </small>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Status *</label>
                                    <select
                                        name="status"
                                        className="form-input"
                                        value={formData.status || 'draft'}
                                        onChange={handleInputChange}
                                        style={{ maxWidth: '200px' }}
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Meta Title</label>
                                    <input
                                        name="metaTitle"
                                        className="form-input"
                                        value={formData.metaTitle || ''}
                                        onChange={handleInputChange}
                                        placeholder="SEO meta title for search engines"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Meta Description</label>
                                    <textarea
                                        name="metaDescription"
                                        className="form-input"
                                        value={formData.metaDescription || ''}
                                        onChange={handleInputChange}
                                        rows={2}
                                        placeholder="Brief description for search engines (160 characters recommended)"
                                    />
                                </div>

                                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                    <label className="form-label">Content *</label>
                                    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading editor...</div>}>
                                        <SummernoteEditor
                                            value={formData.content || ''}
                                            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                                            height={400}
                                            placeholder="Enter page content here..."
                                        />
                                    </Suspense>
                                </div>
                            </form>
                        </div>

                        {/* Fixed Footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline" onClick={handleCloseModal}>Cancel</button>
                            <button
                                type="submit"
                                form="cms-form"
                                className="btn btn-primary"
                                disabled={!formData.title?.trim() || !formData.slug?.trim() || !formData.content?.trim()}
                            >
                                <FaSave /> {editingPage ? 'Update Page' : 'Create Page'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <DeleteConfirmModal {...deleteConfirm.modalProps} />

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
                
                .modal-container {
                    width: 100%;
                    max-width: 1000px;
                    max-height: 90vh;
                    background: var(--primary-light);
                    box-shadow: var(--shadow-lg);
                    border-radius: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                
                .modal-header {
                    flex-shrink: 0;
                    background: var(--primary-light);
                    border-bottom: 1px solid var(--glass-border);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                
                .modal-body {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 1.5rem;
                    -webkit-overflow-scrolling: touch;
                    scroll-behavior: smooth;
                }
                
                /* Custom scrollbar for modal body */
                .modal-body::-webkit-scrollbar {
                    width: 8px;
                }
                
                .modal-body::-webkit-scrollbar-track {
                    background: var(--primary);
                    border-radius: 4px;
                }
                
                .modal-body::-webkit-scrollbar-thumb {
                    background: var(--glass-border);
                    border-radius: 4px;
                }
                
                .modal-body::-webkit-scrollbar-thumb:hover {
                    background: var(--text-muted);
                }
                
                .modal-footer {
                    flex-shrink: 0;
                    background: var(--primary-light);
                    border-top: 1px solid var(--glass-border);
                    padding: 1.5rem;
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    position: sticky;
                    bottom: 0;
                    z-index: 10;
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
                
                .modal-body .form-input {
                    background: var(--primary);
                    border: 1px solid var(--glass-border);
                    color: var(--text-primary);
                }
                
                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .modal-overlay {
                        padding: 1rem;
                    }
                    
                    .modal-container {
                        max-height: 95vh;
                    }
                    
                    .modal-body {
                        padding: 1rem;
                    }
                    
                    .modal-footer {
                        padding: 1rem;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}
