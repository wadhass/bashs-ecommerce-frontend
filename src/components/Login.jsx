import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';
import { getBaseUrl } from '../utils/baseURL';

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mounted, setMounted] = useState(false);

    const dispatch = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const navigate = useNavigate();
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 10);
        return () => clearTimeout(t);
    }, []);
    

    // handle login

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage("Please fill in all fields");
            return;
        }
        
        const data = {
            email,
            password
        }

        try {
            const response = await loginUser(data).unwrap();
            const { token, user } = response;
            dispatch(setUser(user));
            alert(`Login successful — ${getBaseUrl()}`);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            // Handle different error types
            if (error?.data?.message) {
                setMessage(error.data.message);
            } else if (error?.data?.error) {
                setMessage(error.data.error);
            } else if (error?.status === 401) {
                setMessage("Invalid email or password");
            } else {
                setMessage("Login failed. Please try again.");
            }
        }
    }

    return (
        <section className='h-screen flex items-center justify-center'>
            <div className={`max-w-sm border shadow bg-white mx-auto p-8 transform transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
                <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto p-8'>
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
                    {message && <p className='text-red-500'>{message}</p>}
                    <button
                        type="submit"
                        disabled={loginLoading}
                        className={`w-full mt-5 bg-primary text-white font-medium py-3 rounded-md flex items-center justify-center gap-2 transition-transform duration-200 ${loginLoading ? 'opacity-80 scale-95 cursor-wait' : 'hover:scale-105'}`}
                    >
                        {loginLoading ? (
                            <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                <p className='my-5 italic text-sm text-center'>
                    Don't have an account? <Link className='text-red-700 underline px-1' to="/register">Register</Link> here.
                </p>
            </div>
        </section>
    );
};

export default Login;




