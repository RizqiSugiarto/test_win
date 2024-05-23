import React from 'react';

interface ProductCardProps {
    product: {
        id: string;
        nameProduct: string;
        description: string;
        price: number;
        photoProduct: string;
    };
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onEdit,
    onDelete,
}) => {
    // Memeriksa apakah produk ada, jika tidak, tampilkan elemen kosong
    if (!product) return <div></div>;

    return (
        <div className="border rounded-lg shadow-lg p-4 m-2">
            {/* Gambar produk */}
            <img
                src={product.photoProduct}
                alt={product.nameProduct}
                className="w-full h-32 object-cover rounded-lg mb-4"
            />
            {/* Nama produk */}
            <h2 className="text-xl font-bold mb-2">{product.nameProduct}</h2>
            {/* Deskripsi produk */}
            <p className="text-gray-700 mb-2">{product.description}</p>
            {/* Harga produk */}
            <p className="text-indigo-800 font-bold mb-4">${product.price}</p>
            {/* Tombol Edit */}
            <button
                onClick={() => onEdit(product.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            >
                Edit
            </button>
            {/* Tombol Delete */}
            <button
                onClick={() => onDelete(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
                Delete
            </button>
        </div>
    );
};

export default ProductCard;
