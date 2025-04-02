import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/Context';

const Header = () => {
    const [userName, setUserName] = useState('');
    const { userData } = useContext(DataContext);

    useEffect(() => {
        if (userData?.user_name) {
            setUserName(userData.user_name);
        }
    }, [userData]);

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="logosec">
                <div className="logo text-xl font-bold">Dashboard</div>
            </div>

            <div className="message flex items-center gap-3">
                <p className="text-lg">{userName || "Guest"}</p>
                <div className="dp">
                    <img
                        src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                        className="dpicn w-10 h-10 rounded-full"
                        alt="User Profile"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
