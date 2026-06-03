import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            alert("Login successful");
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
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />
                    {message && <p className='text-red-500'>{message}</p>}
                    <button
                        type="submit"
                        className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
                    >
                        Login
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




