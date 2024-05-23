import { CreateProductRepository, UpdateProductRepository, GetAllProductRepository, GetByIdProductRepository, DeleteProductRepository } from "../../../data/protocols";
import { AddProduct, DeleteProduct, GetAllProduct, GetByIdProduct, UpdateProduct } from "../../../domain/use-cases";
import { prismaClient } from "../prisma-client";

export class ProductRepository implements CreateProductRepository, UpdateProductRepository, GetAllProductRepository, GetByIdProductRepository, DeleteProductRepository{
    createProduct = async (params: CreateProductRepository.Params): Promise<AddProduct.Result> => {
        const prodCollection = prismaClient.getConnection().product;
        params.price = parseInt(String(params.price))
        const product = await prodCollection.create({
            data: params
        })
        return {id: product.id}
    };
    updateProduct = async (params: UpdateProductRepository.Params): Promise<UpdateProduct.Result> => {
        const prodCollection = prismaClient.getConnection().product;
        params.price = parseInt(String(params.price))
        const product = await prodCollection.update({
            where: { id: params.id },
            data: {
                nameProduct: params.nameProduct,
                price: params.price,
                photoProduct: params.photoProduct,
                description: params.description,
            }
        });
        return { 
            id: product.id,
            nameProduct: product.nameProduct,
            price: product.price,
            photoProduct: product.photoProduct,
            description: product.description,
            created_at: product.created_at,
            updated_at: product.updated_at
        };
    };
    
    getAllProduct =  async (): Promise<GetAllProduct.Result[]> => {
        const prodCollection = prismaClient.getConnection().product;
        const products = await prodCollection.findMany();
        return products.map(product => ({
            id: product.id,
            nameProduct: product.nameProduct,
            price: product.price,
            photoProduct: product.photoProduct,
            description: product.description,
            created_at: product.created_at,
            updated_at: product.updated_at,
        }));
    };
    getByIdProduct = async (params: GetByIdProductRepository.Params): Promise<GetByIdProduct.Result | null> => {
        const prodCollection = prismaClient.getConnection().product;
        const product = await prodCollection.findUnique({
            where: { id: params.id }
        });
        if (product) {
            return {
                id: product.id,
                nameProduct: product.nameProduct,
                price: product.price,
                photoProduct: product.photoProduct,
                description: product.description,
                created_at: product.created_at,
                updated_at: product.updated_at,
            };
        }
        return null;
    };
    deleteProduct = async (params: DeleteProductRepository.Params): Promise<DeleteProduct.Result> => {
        const prodCollection = prismaClient.getConnection().product;
        await prodCollection.delete({
            where: { id: params.id },
        });
        return { 
            id: params.id 
        };
    };
}