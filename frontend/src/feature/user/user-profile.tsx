import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByIdUser, updateUser } from './userApi';
import { RootState, AppDispatch } from '../../store/store';
import { IUser } from '../../models/users';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { TokenStructure } from '../../models/auth';

export const ProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.users.selectedUser);
    const isLoading = useSelector((state: RootState) => state.users.isLoading);
    const [updatedUser, setUpdatedUser] = useState<IUser | null>(null);

    const token = Cookies.get('accessToken');

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<TokenStructure>(token);
            dispatch(getByIdUser(decodedToken.id));
        }
    }, [dispatch, token]);

    useEffect(() => {
        setUpdatedUser(user);
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        if (updatedUser) {
            setUpdatedUser({
                ...updatedUser,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (updatedUser) {
            dispatch(updateUser(updatedUser));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && user && (
                <div className="flex items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">{user.gender}</p>
                    </div>
                </div>
            )}
            {updatedUser && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold mb-1">
                            Name
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
                            Email
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
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={updatedUser.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
