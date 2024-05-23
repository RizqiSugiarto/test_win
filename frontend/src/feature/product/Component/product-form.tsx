import React, { useState } from 'react'

interface ProductFormProps {
    initialValues: {
        nameProduct: string
        description: string
        price: number
        photoProduct: string
    }
    onSubmit: (data: any) => void
    onCancel: () => void
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const [productData, setProductData] = useState(initialValues)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(productData)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg relative">
                <h2 className="text-lg font-semibold mb-4">Product Form</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nameProduct"
                        value={productData.nameProduct}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="photoProduct"
                        value={productData.photoProduct}
                        onChange={handleChange}
                        placeholder="Photo"
                        className="w-full mb-4 p-2 border rounded"
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded ml-4"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
