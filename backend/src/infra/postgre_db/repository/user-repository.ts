import {
  CreateUserRepository,
  UpdateUserRepository,
  GetByEmailUserRepository,
  GetByIdProductRepository,
  DeleteUserRepository,
} from "../../../data/protocols";
import {
  AddAccount,
  DeleteAccount,
  GetAccountByEmail,
  GetAccountById,
  UpdateAccount,
} from "../../../domain/use-cases";
import { prismaClient } from "../prisma-client";

export class UserRepository
  implements
    CreateUserRepository,
    UpdateUserRepository,
    GetByEmailUserRepository,
    DeleteUserRepository
{
  // Implementasi fungsi untuk membuat akun pengguna baru
  createUser = async (
    params: CreateUserRepository.Params,
  ): Promise<AddAccount.Result> => {
    // Jika foto profil tidak disertakan, berikan foto profil default
    if (!params.photo_profile)
      params.photo_profile = "https://picsum.photos/200/300";
    const userCollection = prismaClient.getConnection().users;
    const user = await userCollection.create({
      data: params,
    });
    return { id: user.id };
  };

  // Implementasi fungsi untuk memperbarui informasi pengguna
  updateUser = async (
    params: UpdateUserRepository.Params,
  ): Promise<UpdateAccount.Result> => {
    const userCollection = prismaClient.getConnection().users;
    const user = await userCollection.update({
      where: { id: params.id },
      data: {
        name: params.name,
        email: params.email,
        password: params.password,
        photo_profile: params.photoProfile,
      },
    });
    return {
      // Mengembalikan data pengguna yang diperbarui
      id: user.id,
      name: user.name,
      email: user.email,
      photoProfile: user.photo_profile,
    };
  };

  // Implementasi fungsi untuk mendapatkan informasi pengguna berdasarkan email
  getByEmail = async (
    params: GetByEmailUserRepository.Params,
  ): Promise<GetAccountByEmail.Result | null> => {
    const userCollection = prismaClient.getConnection().users;
    const user = await userCollection.findUnique({
      where: { email: params.email },
    });
    if (user) {
      // Jika pengguna ditemukan, kembalikan data pengguna
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        photoProfile: user.photo_profile,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    }
    // Jika pengguna tidak ditemukan, kembalikan null
    return null;
  };

  // Implementasi fungsi untuk mendapatkan informasi pengguna berdasarkan ID
  getById = async (
    param: GetByIdProductRepository.Params,
  ): Promise<GetAccountById.Result | null> => {
    const userCollection = prismaClient.getConnection().users;
    const user = await userCollection.findUnique({
      where: { id: param.id },
    });
    if (user) {
      // Jika pengguna ditemukan, kembalikan data pengguna
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        photoProfile: user.photo_profile,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    }
    // Jika pengguna tidak ditemukan, kembalikan null
    return null;
  };

  // Implementasi fungsi untuk menghapus akun pengguna
  deleteUser = async (
    params: DeleteAccount.Params,
  ): Promise<DeleteAccount.Result> => {
    const userCollection = prismaClient.getConnection().users;
    await userCollection.delete({
      where: { id: params.id },
    });
    // Mengembalikan ID pengguna yang dihapus
    return {
      id: params.id,
    };
  };
}
