import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { login } from './loginApi';
import { AppDispatch } from '../../../store/store'; 

export const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); 

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Dispatch the login action with the form data
        await dispatch(login(form));
        // Navigate to another page after successful login
        navigate("/dashboard");
    };

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white h-auto w-2/6 p-8 rounded-lg shadow-lg">
                <div className="mx-auto text-center mb-6">
                    <h1 className="text-2xl font-bold text-indigo-800">
                        LOGIN FORM
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-indigo-800 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-indigo-800 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full"
                        >
                            Login
                        </button>
                    </div>
                    <div>
                        <div className="text-center mt-5">
                            <p className="text-indigo-800">
                                Not have an account yet?{' '}
                                <Link
                                    to="/register"
                                    className="text-indigo-600 underline"
                                >
                                    Register Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
