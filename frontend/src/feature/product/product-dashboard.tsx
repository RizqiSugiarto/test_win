import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/product-card';
import { IProduct } from '../../models/product';
import { IUser } from '../../models/users';
import Cookies from 'js-cookie';
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    updateProduct,
} from './productApi';
import { getByIdUser } from '../user';
import { RootState, AppDispatch } from '../../store/store';
import ProductForm from '../../components/product-form';
import { NewProduct } from '../../models/product';
import Forbidden from '../../components/forbidden-resource';
import { jwtDecode } from 'jwt-decode';
import { TokenStructure } from '../../models/auth';

export const ProductDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Mendapatkan daftar produk dan status loading dari store
    const products = useSelector(
        (state: RootState) => state.product.list.values as IProduct[] || []
    );
    const isLoading = useSelector(
        (state: RootState) => state.product.list.isLoading,
    );
    const success = useSelector(
        (state: RootState) => state.product.save.success,
    );

    // Mendapatkan informasi pengguna saat ini dan status loading dari store
    const currentUser = useSelector(
        (state: RootState) => state.users.selectedUser as IUser | null
    );
    const userLoading = useSelector(
        (state: RootState) => state.users.isLoading,
    );

    // State untuk menampilkan/menyembunyikan form tambah dan form edit
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
        null,
    );

    // Mendapatkan token dari cookie
    const token = Cookies.get('accessToken');

    //  untuk mendapatkan daftar produk saat komponen dimount, serta informasi pengguna saat ini
    useEffect(() => {
        if (token) {
            dispatch(getAllProduct());
            const decodedToken = jwtDecode<TokenStructure>(token);
            dispatch(getByIdUser(decodedToken.id));
        }
    }, [dispatch, token]);

    //  untuk memperbarui daftar produk saat 
    useEffect(() => {
        if (success) {
            dispatch(getAllProduct());
            setShowCreateForm(false);
            setShowUpdateForm(false);
            setSelectedProduct(null);
        }
    }, [success, dispatch]);

    // Fungsi untuk menampilkan form edit produk
    const handleEdit = (id: string) => {
        setShowUpdateForm(true);
        const productToUpdate = products.find((product) => product.id === id);
        if (productToUpdate) {
            setSelectedProduct(productToUpdate);
        }
    };

    // Fungsi untuk menghapus produk
    const handleDelete = (id: string) => {
        dispatch(deleteProduct(id.toString()))
            .then(() => {
                dispatch(getAllProduct());
            });
    };

    // Fungsi untuk menampilkan form tambah produk
    const handleCreate = () => {
        setShowCreateForm(true);
    };

    // Fungsi untuk menangani submit form tambah produk
    const handleCreateFormSubmit = (productData: NewProduct) => {
        dispatch(createProduct(productData))
            .then(() => {
                dispatch(getAllProduct());
            });
        handleCloseForm();
    };

    // Fungsi untuk menangani submit form edit produk
    const handleUpdateFormSubmit = (productData: Omit<IProduct, 'id' | 'created_at' | 'updated_at'>) => {
        if (selectedProduct) {
            const updatedProduct: IProduct = {
                ...selectedProduct,
                ...productData,
                updated_at: new Date()
            };
            dispatch(updateProduct(updatedProduct))
                .then(() => {
                    dispatch(getAllProduct());
                });
            handleCloseForm();
        }
    };

    // Fungsi untuk menutup form tambah/edit produk
    const handleCloseForm = () => {
        setShowCreateForm(false);
        setShowUpdateForm(false);
        setSelectedProduct(null);
    };

    // Menampilkan halaman Forbidden jika tidak ada token
    if (!token) {
        return <Forbidden />;
    }

    // Menampilkan pesan loading jika informasi pengguna sedang dimuat
    if (userLoading || !currentUser) {
        return <div>Loading user info...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header dengan informasi pengguna */}
            <div className="bg-green-500 p-3">
                <div className="flex justify-end">
                    <Link to={'/profile'}>
                        <img
                            src={currentUser.photoProfile}
                            alt=""
                            className="w-10 h-10 rounded-full mr-2"
                        />
                    </Link>
                    <p className="mt-2">{currentUser.name}</p>
                </div>
            </div>
            {/* Tombol untuk menampilkan form tambah produk */}
            <div className="flex justify-end mt-6 pr-6">
                <button
                    className="bg-green-500 p-5 rounded-md"
                    onClick={handleCreate}
                >
                    Create Product !
                </button>
            </div>
            {/* Daftar produk */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={() => handleEdit(product.id)}
                                onDelete={() => handleDelete(product.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No products available</p>
                )
            )}
            {/* Form tambah produk */}
            {showCreateForm && (
                <ProductForm
                    initialValues={{
                        nameProduct: '',
                        description: '',
                        price: 0,
                        photoProduct: '',
                    }}
                    onSubmit={handleCreateFormSubmit}
                    onCancel={handleCloseForm}
                />
            )}
            {/* Form edit produk */}
            {showUpdateForm && selectedProduct && (
                <ProductForm
                    initialValues={{
                        nameProduct: selectedProduct.nameProduct,
                        description: selectedProduct.description,
                        price: selectedProduct.price,
                        photoProduct: selectedProduct.photoProduct,
                    }}
                    onSubmit={handleUpdateFormSubmit}
                    onCancel={handleCloseForm}
                />
            )}
        </div>
    );
}

export default ProductDashboard;
