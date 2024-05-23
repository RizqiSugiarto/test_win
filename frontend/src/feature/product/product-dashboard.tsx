import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './Component/product-card';
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
import ProductForm from './Component/product-form';
import { NewProduct } from '../../models/product';
import Forbidden from './Component/forbidden-resource';
import {jwtDecode} from 'jwt-decode';
import { TokenStructure } from '../../models/auth';

export const ProductDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(
        (state: RootState) => state.product.list.values as IProduct[] || []
    );
    const isLoading = useSelector(
        (state: RootState) => state.product.list.isLoading,
    );
    const success = useSelector(
        (state: RootState) => state.product.save.success,
    );

    const currentUser = useSelector(
        (state: RootState) => state.users.selectedUser as IUser | null
    );
    const userLoading = useSelector(
        (state: RootState) => state.users.isLoading,
    );

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
        null,
    );

    const token = Cookies.get('accessToken');

    useEffect(() => {
        if (token) {
            dispatch(getAllProduct());
            const decodedToken = jwtDecode<TokenStructure>(token);
            console.log(decodedToken.id, "Decoded Token");
            dispatch(getByIdUser(decodedToken.id));
            console.log(currentUser?.photoProfile, "GAMBARNYA GINI")
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (success) {
            dispatch(getAllProduct());
            setShowCreateForm(false);
            setShowUpdateForm(false);
            setSelectedProduct(null);
        }
    }, [success, dispatch]);

    const handleEdit = (id: string) => {
        setShowUpdateForm(true);
        const productToUpdate = products.find((product) => product.id === id);
        if (productToUpdate) {
            setSelectedProduct(productToUpdate);
        }
    };

    const handleDelete = (id: string) => {
        dispatch(deleteProduct(id.toString()))
            .then(() => {
                dispatch(getAllProduct());
            });
    };

    const handleCreate = () => {
        setShowCreateForm(true);
    };

    const handleCreateFormSubmit = (productData: NewProduct) => {
        dispatch(createProduct(productData))
            .then(() => {
                dispatch(getAllProduct());
            });
        handleCloseForm();
    };

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

    const handleCloseForm = () => {
        setShowCreateForm(false);
        setShowUpdateForm(false);
        setSelectedProduct(null);
    };

    if (!token) {
        return <Forbidden />;
    }

    if (userLoading || !currentUser) {
        return <div>Loading user info...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
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
            <div className="flex justify-end mt-6 pr-6">
                <button
                    className="bg-green-500 p-5 rounded-md"
                    onClick={handleCreate}
                >
                    Create Product !
                </button>
            </div>
            {/* <div className="flex-grow p-4 flex items-center justify-center"> */}
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
            {/* </div> */}
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
