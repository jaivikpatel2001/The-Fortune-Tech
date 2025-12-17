'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaEye } from 'react-icons/fa';

const productsData = [
    { id: 1, name: 'Web Development Package', category: 'Services', price: '$2,999', stock: 'In Stock', status: 'active' },
    { id: 2, name: 'Mobile App Development', category: 'Services', price: '$4,999', stock: 'In Stock', status: 'active' },
    { id: 3, name: 'UI/UX Design Bundle', category: 'Design', price: '$1,499', stock: 'In Stock', status: 'active' },
    { id: 4, name: 'SEO Optimization', category: 'Marketing', price: '$799', stock: 'Limited', status: 'pending' },
    { id: 5, name: 'Cloud Hosting Plan', category: 'Hosting', price: '$99/mo', stock: 'In Stock', status: 'active' },
    { id: 6, name: 'E-commerce Solution', category: 'Services', price: '$5,499', stock: 'Out of Stock', status: 'inactive' },
];

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout pageTitle="Products">
            {/* Header Actions */}
            <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search products..."
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

                    <button className="btn btn-primary" style={{ marginLeft: 'auto', padding: '0.75rem 1.25rem' }}>
                        <FaPlus />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">All Products ({filteredProducts.length})</h3>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                                        {product.name}
                                    </td>
                                    <td>{product.category}</td>
                                    <td style={{ fontWeight: 600, color: 'var(--accent-start)' }}>
                                        {product.price}
                                    </td>
                                    <td>
                                        <span style={{
                                            color: product.stock === 'In Stock' ? '#22c55e' :
                                                product.stock === 'Limited' ? '#f59e0b' : '#ef4444'
                                        }}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${product.status}`}>
                                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" title="View">
                                                <FaEye />
                                            </button>
                                            <button className="table-action-btn" title="Edit">
                                                <FaEdit />
                                            </button>
                                            <button className="table-action-btn delete" title="Delete">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="admin-pagination">
                    <span className="pagination-info">Showing 1-{filteredProducts.length} of {filteredProducts.length} products</span>
                    <div className="pagination-buttons">
                        <button className="pagination-btn" disabled>&lt;</button>
                        <button className="pagination-btn active">1</button>
                        <button className="pagination-btn">&gt;</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
