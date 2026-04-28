import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Settings, User, LogOut, Bell } from 'lucide-react';
import React from 'react'

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    return (

        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">

                {/* Main Flex */}
                <div className="flex justify-between items-center h-full">

                    {/* LEFT SIDE (Logo) */}
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                    >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-lg font-bold leading-none">
                            Miny Chatty
                        </h1>
                    </Link>

                    {/* RIGHT SIDE (Buttons) */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="btn btn-sm gap-2"
                        >
                            <Bell className="w-4 h-4" />
                            <span className="hidden sm:inline"></span>
                        </Link>

                        <Link
                            to="/settings"
                            className="btn btn-sm gap-2"
                        >
                            <Settings className="w-4 h-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </Link>

                        {authUser ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="btn btn-sm gap-2"
                                >
                                    <User className="w-4 h-4" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>

                                <button
                                    onClick={logout}
                                    className="btn btn-sm gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : null}

                    </div>

                </div>
            </div>
        </header>


    )
}

export default Navbar
