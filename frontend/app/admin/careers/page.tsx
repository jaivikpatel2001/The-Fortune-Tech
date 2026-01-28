'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes, FaEye, FaChevronRight, FaLink } from 'react-icons/fa';
import careersDataRaw from '../../../data/career.json';
import DeleteConfirmModal from '../../../components/ui/DeleteConfirmModal';
import { useDeleteConfirm } from '../../../lib/hooks/useDeleteConfirm';

interface Career {
    id: string;
    title: string;
    department: string;
    location: string;
    experience: string;
    type: string;
    description: string;
    requirements: string[];
    benefits: string[];
    applyLink: string;
    [key: string]: any;
}

export default function CareersPage() {
    const [careers, setCareers] = useState<Career[]>(careersDataRaw as unknown as Career[]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [editingCareer, setEditingCareer] = useState<Career | null>(null);
    const [viewingCareer, setViewingCareer] = useState<Career | null>(null);
    const [formData, setFormData] = useState<Partial<Career>>({});
    const deleteConfirm = useDeleteConfirm();

    const filteredCareers = careers.filter(career =>
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = (career: Career | null = null) => {
        if (career) {
            setEditingCareer(career);
            setFormData({
                ...career,
                requirements: career.requirements?.join('\n') as any,
                benefits: career.benefits?.join('\n') as any,
            });
        } else {
            setEditingCareer(null);
            setFormData({
                id: `job-${Date.now()}`,
                title: '',
                department: 'Engineering',
                location: '',
                experience: '',
                type: 'Full-time',
                description: '',
                requirements: '' as any,
                benefits: '' as any,
                applyLink: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleOpenDetail = (career: Career) => {
        setViewingCareer(career);
        setIsDetailOpen(true);
    };

    const handleCloseModals = () => {
        setIsModalOpen(false);
        setIsDetailOpen(false);
        setEditingCareer(null);
        setViewingCareer(null);
        setFormData({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        const processedData = {
            ...formData,
            requirements: (formData.requirements as any)?.split('\n').filter((i: string) => i.trim()),
            benefits: (formData.benefits as any)?.split('\n').filter((i: string) => i.trim()),
        };

        if (editingCareer) {
            setCareers(prev => prev.map(c => c.id === editingCareer.id ? { ...c, ...processedData } as Career : c));
        } else {
            setCareers(prev => [...prev, processedData as Career]);
        }
        handleCloseModals();
    };

    const handleDelete = (id: string, title: string) => {
        deleteConfirm.showDeleteConfirm({
            title: 'Delete Job Posting',
            message: 'This action will permanently delete this job posting. This cannot be undone.',
            itemName: title,
            onConfirm: () => {
                setCareers(prev => prev.filter(c => c.id !== id));
            }
        });
    };

    return (
        <AdminLayout pageTitle="Careers">
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search jobs..."
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
                        <FaPlus /> Add Job Posting
                    </button>
                </div>
            </div>

            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">Open Positions ({filteredCareers.length})</h3>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Location</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCareers.map((career) => (
                                <tr key={career.id}>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{career.title}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{career.experience} exp</span>
                                        </div>
                                    </td>
                                    <td>{career.department}</td>
                                    <td>{career.location}</td>
                                    <td>
                                        <span className="status-badge active" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                            {career.type}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" onClick={() => handleOpenDetail(career)} title="View Detail">
                                                <FaEye />
                                            </button>
                                            <button className="table-action-btn" onClick={() => handleOpenModal(career)} title="Edit">
                                                <FaEdit />
                                            </button>
                                            <button className="table-action-btn delete" onClick={() => handleDelete(career.id, career.title)} title="Delete">
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

            {/* Modal & Detail components follow same style as ServicesPage */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card">
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">{editingCareer ? 'Edit Job' : 'Add Job'}</h3>
                            <button className="table-action-btn" onClick={handleCloseModals}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ padding: '1.5rem' }}>
                            <div className="admin-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Job Title</label>
                                    <input name="title" className="form-input" value={formData.title || ''} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Department</label>
                                    <select name="department" className="form-input" value={formData.department || ''} onChange={handleInputChange}>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Design">Design</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input name="location" className="form-input" value={formData.location || ''} onChange={handleInputChange} placeholder="e.g. Remote or City" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Experience</label>
                                    <input name="experience" className="form-input" value={formData.experience || ''} onChange={handleInputChange} placeholder="e.g. 2+ Years" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Employment Type</label>
                                    <select name="type" className="form-input" value={formData.type || ''} onChange={handleInputChange}>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Apply Link</label>
                                    <input name="applyLink" className="form-input" value={formData.applyLink || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Description</label>
                                    <textarea name="description" className="form-input" value={formData.description || ''} onChange={handleInputChange} rows={3} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Requirements (One per line)</label>
                                    <textarea name="requirements" className="form-input" value={formData.requirements as any || ''} onChange={handleInputChange} rows={5} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Benefits (One per line)</label>
                                    <textarea name="benefits" className="form-input" value={formData.benefits as any || ''} onChange={handleInputChange} rows={5} />
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

            {isDetailOpen && viewingCareer && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card" style={{ maxWidth: '800px' }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">{viewingCareer.title}</h3>
                            <button className="table-action-btn" onClick={handleCloseModals}><FaTimes /></button>
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <div className="admin-grid-2" style={{ marginBottom: '1.5rem' }}>
                                <div>
                                    <p><strong>Department:</strong> {viewingCareer.department}</p>
                                    <p><strong>Location:</strong> {viewingCareer.location}</p>
                                    <p><strong>Type:</strong> {viewingCareer.type}</p>
                                </div>
                                <div>
                                    <p><strong>Experience:</strong> {viewingCareer.experience}</p>
                                    <p><strong>Apply URL:</strong> <a href={viewingCareer.applyLink} target="_blank" style={{ color: 'var(--accent-start)' }}>Link <FaLink size={12} /></a></p>
                                </div>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h5 style={{ color: 'var(--accent-start)', marginBottom: '0.5rem' }}>Description</h5>
                                <p style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>{viewingCareer.description}</p>
                            </div>
                            <div className="admin-grid-2">
                                <div className="detail-list-item">
                                    <h6>Requirements</h6>
                                    <ul>{viewingCareer.requirements?.map((r, i) => <li key={i}><FaChevronRight size={10} /> {r}</li>)}</ul>
                                </div>
                                <div className="detail-list-item">
                                    <h6>Benefits</h6>
                                    <ul>{viewingCareer.benefits?.map((b, i) => <li key={i}><FaChevronRight size={10} /> {b}</li>)}</ul>
                                </div>
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
                .form-group { margin-bottom: 1.25rem; }
                .form-label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }
                .modal-content .form-input { background: var(--primary); border: 1px solid var(--glass-border); color: var(--text-primary); width: 100%; padding: 0.75rem; border-radius: 8px; }
                .detail-list-item h6 { font-weight: 600; margin-bottom: 0.75rem; color: var(--text-primary); border-bottom: 1px solid var(--glass-border); padding-bottom: 0.25rem; }
                .detail-list-item ul { list-style: none; padding: 0; }
                .detail-list-item li { font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 0.375rem; display: flex; align-items: center; gap: 0.5rem; }
            `}</style>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal {...deleteConfirm.modalProps} />
        </AdminLayout>
    );
}
