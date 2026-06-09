import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import { getBaseUrl } from '../utils/baseURL';

const Register = () => {
    const [message, setMessage] = useState('');
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [role, setRole] = useState('user');
        const [adminSecret, setAdminSecret] = useState('');
        const [mounted, setMounted] = useState(false);

        const [registerUser, {isLoading }] = useRegisterUserMutation();
        const navigate = useNavigate();
        useEffect(() => {
            const t = setTimeout(() => setMounted(true), 10);
            return () => clearTimeout(t);
        }, []);

        const handleRegister = async (e) => {
            e.preventDefault();
            if (!username || !email || !password) {
                setMessage("Please fill in all fields");
                return;
            }
            
            const data = {
                username,
                email,
                password,
                role,
                adminSecret: role === 'admin' ? adminSecret : undefined,
            }
            try {
                const response = await registerUser(data).unwrap();
                alert(`Registration successful — ${getBaseUrl()}`);
                navigate("/login")
            } catch (error) {
                console.error("Register error:", error);
                // Handle different error types
                if (error?.data?.message) {
                    setMessage(error.data.message);
                } else if (error?.data?.error) {
                    setMessage(error.data.error);
                } else if (error?.status === 409) {
                    setMessage("Email or username already exists");
                } else {
                    setMessage("Registration failed. Please try again.");
                }
            }
        }
  return (
    <section className='h-screen flex items-center justify-center'>
                        <div className={`max-w-sm border shadow bg-white mx-auto p-8 transform transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
                <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto p-8'>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-100 focus:outline-none px-5 py-3 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.97 9.97 0 012.03-5.78M3 3l18 18" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium'>Register as</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
                        >
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                    {role === 'admin' && (
                        <input
                            type="text"
                            name="adminSecret"
                            id="adminSecret"
                            placeholder="Admin secret key"
                            value={adminSecret}
                            onChange={(e) => setAdminSecret(e.target.value)}
                            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        />
                    )}
                    {message && <p className='text-red-500'>{message}</p>}
                    <button
                        type="submit"
                        className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
                    >
                        Register
                    </button>
                </form>
                <p className='my-5 italic text-sm text-center'>
                     have an account? Please<Link className='text-red-700 underline px-1' to="/login">Login</Link>.
                </p>
            </div>
        </section>
  )
}

export default Register
