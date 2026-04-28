import { Mail, Lock, MessageSquare, User, Eye, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react'
import { useState } from 'react';
import AuthImagePattern from '../components/AuthImagePatteren';
import { useAuthStore } from '../store/useAuthStore'
import { Toaster, toast } from 'react-hot-toast'

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const { signup, isSigningUp } = useAuthStore();
    const navigate = useNavigate();

    const validateForm = () => {
        if(!formData.fullName.trim()) return toast.error("Full name is required");
        if(!formData.email.trim()) return toast.error("Email is required");
        if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Email is invalid");
        if(!formData.password.trim()) return toast.error("Password is required");
        if(formData.password.length < 6) return toast.error("password must be at least 6 charchers long");
        return true;


    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) {
            const res = await signup(formData);
            if (res) navigate('/login');
        }

    }
    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/* Left Side */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12' >
                <div className='w-full max-w-md space-y-8'>
                    {/* LOGO */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-semibold'>Create your account</h1>
                            <p className='text-base-content/60'>Get started with your free account</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Full Name</span>
                            </label>
                            <div className='relative'>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-[99]">
                                    <User className="w-5 h-5 text-base-content/50" />
                                </div>

                                <input
                                    type='text'
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='Hafiz Suleman'
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Email</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-[99]'>
                                    <Mail className='size-5 text-base-content/50' />
                                </div>
                                <input
                                    type='text'
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='example@gmail.com'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                        </div>


                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Password</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-[99]'>
                                    <Lock className='size-5 text-base-content/50' />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='*******'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                type='button'
                                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                onClick={() => setShowPassword(!showPassword)}
                                >
                                    {
                                        showPassword ? (
                                            <Eye className='size-5 text-base-content/50' />
                                        ) : (
                                            <Eye className='size-5 text-base-content/50' />
                                        )

                                    }

                                </button>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                            {isSigningUp ?  (
                                <>
                                <Loader2 className='size-5 animate-spin'/>
                                Loading....
                                </>
                            ) : "Create Account"
                        }
                                       
                    
                        </button> 

                    </form>
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                        Already have an account ? {""}
                        <Link to="/login" className='link link-primary'>
                            Sign in
                        </Link>
                        </p>
                    </div>

                </div>
            </div>

            {/* right side */}
            <AuthImagePattern
            title="Join our community "
            subTitle="Connect with like-minded individuals, share your thoughts, and be part of a vibrant community that thrives on meaningful interactions and shared passions."
            />

        </div>

    )
}

export default SignupPage
