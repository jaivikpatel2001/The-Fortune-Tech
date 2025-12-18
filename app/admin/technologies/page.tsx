'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import {
    FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes, FaEye, FaChevronRight, FaStar, FaCogs, FaTools,
    FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaJava, FaAws, FaDocker, FaGitAlt, FaLinux
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTypescript, SiPostgresql, SiMongodb, SiMysql, SiRedis, SiGo
} from 'react-icons/si';
import techsDataRaw from '../../../data/technologies.json';

const getIcon = (iconName: string) => {
    const icons: any = {
        FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaJava, FaAws, FaDocker, FaGitAlt, FaLinux,
        SiNextdotjs, SiTypescript, SiPostgresql, SiMongodb, SiMysql, SiRedis, SiGo, FaTools
    };
    const actualIconName = iconName === 'FaGolang' ? 'SiGo' : iconName;
    const IconComponent = icons[actualIconName] || FaTools;
    return <IconComponent size={14} />;
};

interface TechItem {
    name: string;
    icon: string;
    expertiseLevel: string;
    experienceYears: number;
    useCases: string[];
    featured: boolean;
}

interface TechCategory {
    category: string;
    slug: string;
    description: string;
    items: TechItem[];
}

export default function TechnologiesPage() {
    const [categories, setCategories] = useState<TechCategory[]>(techsDataRaw as unknown as TechCategory[]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);

    const [activeCategory, setActiveCategory] = useState<TechCategory | null>(null);
    const [editingCategory, setEditingCategory] = useState<TechCategory | null>(null);
    const [editingItem, setEditingItem] = useState<TechItem | null>(null);
    const [itemIdx, setItemIdx] = useState<number | null>(null);

    const [catFormData, setCatFormData] = useState<Partial<TechCategory>>({});
    const [itemFormData, setItemFormData] = useState<Partial<TechItem>>({});

    const filtered = categories.filter(c =>
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Category Handlers
    const handleOpenCatModal = (cat: TechCategory | null = null) => {
        if (cat) {
            setEditingCategory(cat);
            setCatFormData(cat);
        } else {
            setEditingCategory(null);
            setCatFormData({ category: '', slug: '', description: '', items: [] });
        }
        setIsCatModalOpen(true);
    };

    const handleSaveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            setCategories(prev => prev.map(c => c.slug === editingCategory.slug ? { ...c, ...catFormData } as TechCategory : c));
        } else {
            setCategories(prev => [...prev, { ...catFormData, slug: (catFormData.category || '').toLowerCase().replace(/ /g, '-') } as TechCategory]);
        }
        setIsCatModalOpen(false);
    };

    const handleDeleteCategory = (slug: string) => {
        if (confirm('Delete this entire category and all its technologies?')) {
            setCategories(prev => prev.filter(c => c.slug !== slug));
        }
    };

    // Item Handlers
    const handleOpenItemModal = (cat: TechCategory, item: TechItem | null = null, idx: number | null = null) => {
        setActiveCategory(cat);
        if (item) {
            setEditingItem(item);
            setItemIdx(idx);
            setItemFormData({
                ...item,
                useCases: item.useCases?.join('\n') as any
            });
        } else {
            setEditingItem(null);
            setItemIdx(null);
            setItemFormData({ name: '', icon: '', expertiseLevel: 'Intermediate', experienceYears: 1, useCases: '' as any, featured: false });
        }
        setIsItemModalOpen(true);
    };

    const handleSaveItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeCategory) return;

        const processedItem = {
            ...itemFormData,
            useCases: (itemFormData.useCases as any)?.split('\n').filter((i: string) => i.trim()) || []
        } as TechItem;

        setCategories(prev => prev.map(c => {
            if (c.slug !== activeCategory.slug) return c;

            let newItems = [...c.items];
            if (itemIdx !== null) {
                newItems[itemIdx] = processedItem;
            } else {
                newItems.push(processedItem);
            }
            return { ...c, items: newItems };
        }));

        setIsItemModalOpen(false);
        setActiveCategory(null);
    };

    const handleDeleteItem = (catSlug: string, idx: number) => {
        if (confirm('Remove this technology?')) {
            setCategories(prev => prev.map(c => {
                if (c.slug !== catSlug) return c;
                return { ...c, items: c.items.filter((_, i) => i !== idx) };
            }));
        }
    };

    return (
        <AdminLayout pageTitle="Technologies">
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
                        <input type="text" className="form-input" placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ paddingLeft: '2.5rem' }} />
                        <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    </div>
                    <button className="btn btn-primary" onClick={() => handleOpenCatModal()} style={{ marginLeft: 'auto' }}>
                        <FaPlus /> Add Category
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {filtered.map((cat) => (
                    <div key={cat.slug} className="admin-card">
                        <div className="admin-card-header" style={{ background: 'rgba(139, 92, 246, 0.03)' }}>
                            <div>
                                <h3 className="admin-card-title">{cat.category}</h3>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{cat.description}</p>
                            </div>
                            <div className="table-actions">
                                <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => handleOpenItemModal(cat)}>
                                    <FaPlus /> Add Tech
                                </button>
                                <button className="table-action-btn" onClick={() => handleOpenCatModal(cat)}><FaEdit /></button>
                                <button className="table-action-btn delete" onClick={() => handleDeleteCategory(cat.slug)}><FaTrash /></button>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <div className="tech-items-grid">
                                {cat.items.map((item, idx) => (
                                    <div key={idx} className="tech-item-mini-card">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                                            <div className="tech-icon-circle">{getIcon(item.icon)}</div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    {item.name}
                                                    {item.featured && <FaStar size={10} color="#f59e0b" title="Featured" />}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                    {item.expertiseLevel} • {item.experienceYears}y exp
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mini-actions">
                                            <button className="mini-action-btn" onClick={() => handleOpenItemModal(cat, item, idx)}><FaEdit size={12} /></button>
                                            <button className="mini-action-btn delete" onClick={() => handleDeleteItem(cat.slug, idx)}><FaTrash size={12} /></button>
                                        </div>
                                    </div>
                                ))}
                                {cat.items.length === 0 && (
                                    <p style={{ gridColumn: 'span 3', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                        No technologies added to this category yet.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Modal */}
            {isCatModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card" style={{ maxWidth: '500px' }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
                            <button className="table-action-btn" onClick={() => setIsCatModalOpen(false)}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSaveCategory} style={{ padding: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label">Category Name</label>
                                <input className="form-input" value={catFormData.category || ''} onChange={(e) => setCatFormData({ ...catFormData, category: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea className="form-input" value={catFormData.description || ''} onChange={(e) => setCatFormData({ ...catFormData, description: e.target.value })} rows={3} />
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setIsCatModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><FaSave /> Save Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Item Modal */}
            {isItemModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content admin-card" style={{ maxWidth: '600px' }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">
                                {editingItem ? `Edit ${editingItem.name}` : `Add Tech to ${activeCategory?.category}`}
                            </h3>
                            <button className="table-action-btn" onClick={() => setIsItemModalOpen(false)}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSaveItem} style={{ padding: '1.5rem' }}>
                            <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                <div className="form-group">
                                    <label className="form-label">Tech Name</label>
                                    <input className="form-input" value={itemFormData.name || ''} onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Icon (Icon Name)</label>
                                    <input className="form-input" value={itemFormData.icon || ''} onChange={(e) => setItemFormData({ ...itemFormData, icon: e.target.value })} placeholder="e.g. FaReact" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Expertise Level</label>
                                    <select className="form-input" value={itemFormData.expertiseLevel || ''} onChange={(e) => setItemFormData({ ...itemFormData, expertiseLevel: e.target.value })}>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Years of Experience</label>
                                    <input type="number" className="form-input" value={itemFormData.experienceYears || 0} onChange={(e) => setItemFormData({ ...itemFormData, experienceYears: Number(e.target.value) })} />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Use Cases (One per line)</label>
                                    <textarea className="form-input" value={itemFormData.useCases as any || ''} onChange={(e) => setItemFormData({ ...itemFormData, useCases: e.target.value as any })} rows={3} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Featured</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <input type="checkbox" checked={!!itemFormData.featured} onChange={(e) => setItemFormData({ ...itemFormData, featured: e.target.checked })} />
                                        <span>Show in highlights</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setIsItemModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><FaSave /> Save Tech</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 2rem; }
                .modal-content { width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; background: var(--primary-light); box-shadow: var(--shadow-lg); }
                .form-group { margin-bottom: 1.25rem; }
                .form-label { display: block; margin-bottom: 0.375rem; font-size: 0.8125rem; font-weight: 500; color: var(--text-muted); }
                .modal-content .form-input { background: var(--primary); border: 1px solid var(--glass-border); color: var(--text-primary); width: 100%; padding: 0.75rem; border-radius: 8px; font-size: 0.9375rem; }
                
                .tech-items-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1rem;
                }
                .tech-item-mini-card {
                    background: var(--primary);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: all 0.2s;
                }
                .tech-item-mini-card:hover {
                    border-color: var(--accent-start);
                    background: var(--primary-lighter);
                    transform: translateY(-2px);
                }
                .tech-icon-circle {
                    width: 36px;
                    height: 36px;
                    background: var(--accent-glow);
                    color: var(--accent-start);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .mini-actions {
                    display: flex;
                    gap: 0.25rem;
                }
                .mini-action-btn {
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 6px;
                    border: none;
                    background: transparent;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .mini-action-btn:hover {
                    background: var(--glass-bg);
                    color: var(--text-primary);
                }
                .mini-action-btn.delete:hover {
                    color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }
            `}</style>
        </AdminLayout>
    );
}
