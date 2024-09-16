"use client";
import React, { useState } from 'react';
import {Menu, X} from 'lucide-react';
import './style.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return(
        <>
            <div className="flex justify-between p-8 mt-5">
                <p className="text-2xl font-medium cursor-pointer">DiscoverTheWeather</p>
                <div className="flex items-center">
                    <button onClick={toggleNavbar} className="text-xl md:hidden flex items-center">
                        {isOpen ? <X /> : <Menu />}
                    </button>

                    <div className="hidden md:flex items-center cursor-pointer">
                        <p className="nav-item text-xl font-light">Home</p>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col mt-4 items-center">
                    <p className="nav-item text-xl font-light">Home</p>
                </div>
            )}
        </>
    );
}

export default Navbar;