import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { createUser } from './registerApi';
import { RootState, AppDispatch } from '../../../store/store';

export const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Memanggil state isLoading dan error dari store menggunakan useSelector
  const isLoading = useSelector((state: RootState) => state.users.isLoading);
  const error = useSelector((state: RootState) => state.users.error);

  const navigate = useNavigate(); // Penggunaan hook useNavigate diluar dari kondisional rendering

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    photo_profile: '',
    gender: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch aksi createUser dengan data formulir
    await dispatch(createUser(form));
    navigate("/"); // Navigasi kembali ke halaman awal setelah pendaftaran berhasil
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white h-auto w-2/6 p-8 rounded-lg shadow-lg">
        <div className="mx-auto text-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-800">REGISTER FORM</h1>
        </div>
        {/* Menampilkan pesan kesalahan jika ada */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-indigo-800 mb-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-3 py-2 border rounded-lg"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-indigo-800 mb-2">Email</label>
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
            <label htmlFor="password" className="block text-indigo-800 mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-indigo-800 mb-2">Gender</label>
            <select
              name="gender"
              id="gender"
              className="w-full px-3 py-2 border rounded-lg"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="text-center">
            {/* Tombol submit dengan teks yang berubah tergantung pada status isLoading */}
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
