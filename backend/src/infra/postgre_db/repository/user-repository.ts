import { CreateUserRepository, UpdateUserRepository, GetByEmailUserRepository, GetByIdProductRepository, DeleteUserRepository } from "../../../data/protocols";
import { AddAccount, DeleteAccount, GetAccountByEmail, GetAccountById, UpdateAccount } from "../../../domain/use-cases";
import { prismaClient } from "../prisma-client";

export class UserRepository implements CreateUserRepository, UpdateUserRepository, GetByEmailUserRepository, DeleteUserRepository {
    createUser = async (params: CreateUserRepository.Params): Promise<AddAccount.Result> => {
        if(!params.photo_profile) params.photo_profile = "https://picsum.photos/200/300"
        const userCollection = prismaClient.getConnection().users;
        const user = await userCollection.create({
            data: params
        })
        return {id: user.id}
    };
    updateUser = async (params: UpdateUserRepository.Params): Promise<UpdateAccount.Result> => {
        const userCollection = prismaClient.getConnection().users;  
        const user = await userCollection.update({
            where: { id: params.id },
            data: {
                name: params.name,
                email: params.email,
                password: params.password,
                photo_profile: params.photoProfile
            }
        });
        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            photoProfile: user.photo_profile 
        };
    };
    getByEmail = async (params: GetByEmailUserRepository.Params): Promise<GetAccountByEmail.Result | null> => {
        const userCollection = prismaClient.getConnection().users;  
        const user = await userCollection.findUnique({
            where: { email: params.email }
        });
        if (user) {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                photoProfile: user.photo_profile,
                created_at: user.created_at,
                updated_at: user.updated_at
                
            };
        }
        return null;
    };
    getById = async (param: GetByIdProductRepository.Params): Promise<GetAccountById.Result | null> => {
        const userCollection = prismaClient.getConnection().users;
        const user = await userCollection.findUnique({
            where: {id : param.id}
        });
        console.log(user, "INFRA REPO SEPERTI INI")
        if (user) {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                photoProfile: user.photo_profile,
                created_at: user.created_at,
                updated_at: user.updated_at
                
            };
        }
        return null;

    }
    deleteUser = async (params: DeleteAccount.Params): Promise<DeleteAccount.Result> => {
        const productCollection = prismaClient.getConnection().users;  
        await productCollection.delete({
            where: { id: params.id }
        });
        return { 
            id: params.id 
        };
    };
    
}