import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByIdUser, updateUser } from './userApi';
import { RootState, AppDispatch } from '../../store/store';
import { IUser } from '../../models/users';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Impor jwtDecode dari paket jwt-decode
import { TokenStructure } from '../../models/auth';

export const ProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.users.selectedUser); // Pilih pengguna dari toko Redux
    const isLoading = useSelector((state: RootState) => state.users.isLoading); // Pilih status pengambilan dari toko Redux
    const [updatedUser, setUpdatedUser] = useState<IUser | null>(null); // State untuk data pengguna yang diperbarui

    const token = Cookies.get('accessToken'); // Dapatkan token akses dari kuki

    useEffect(() => {
        // Ambil data pengguna saat komponen dipasang atau token berubah
        if (token) {
            const decodedToken = jwtDecode<TokenStructure>(token); // Mendekode token untuk mendapatkan id pengguna
            dispatch(getByIdUser(decodedToken.id)); // Meneruskan tindakan untuk mendapatkan data pengguna berdasarkan id
        }
    }, [dispatch, token]);

    useEffect(() => {
        // Tetapkan state pengguna yang diperbarui ketika data pengguna berubah
        setUpdatedUser(user);
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        // Tangani perubahan input dan perbarui state updatedUser sesuai
        const { name, value } = e.target;
        if (updatedUser) {
            setUpdatedUser({
                ...updatedUser,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Tangani pengiriman formulir
        e.preventDefault();
        if (updatedUser) {
            dispatch(updateUser(updatedUser)); // Meneruskan tindakan untuk memperbarui data pengguna
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Halaman Profil</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && user && (
                // Render data pengguna jika tidak loading dan data pengguna tersedia
                <div className="flex items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">{user.gender}</p>
                    </div>
                </div>
            )}
            {updatedUser && (
                // Render formulir untuk memperbarui data pengguna jika state updatedUser tersedia
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold mb-1">
                            Nama
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={updatedUser.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photoProfile" className="block font-semibold mb-1">
                            Foto Profil
                        </label>
                        <input
                            type="text"
                            id="photoProfile"
                            name="photoProfile"
                            value={updatedUser.photoProfile}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block font-semibold mb-1">
                            Jenis Kelamin
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={updatedUser.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Male">Laki-laki</option>
                            <option value="Female">Perempuan</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Simpan Perubahan
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
