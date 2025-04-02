import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/Context';

export const NavBar = () => {
    const navigate = useNavigate();
    const { setUserData, setIsLogin, setClicked, setPerform } = useContext(DataContext)
    function handleNav() {
        try {
            navigate('/users');
            setClicked(false);
            setPerform('');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }


    function handleLogOut() {
        try {
            navigate('/');
            setUserData({});
            setIsLogin(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <>
            <div className="navcontainer">
                <nav className="nav">
                    <div className="nav-upper-options">

                        <div className="option2 nav-option" onClick={() => handleNav()} >
                            <img
                                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                                className="nav-img"
                                alt="articles"
                            />
                            <h3> Users List </h3>
                        </div>

                        <div className="nav-option logout" onClick={() => handleLogOut()}>
                            <img
                                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                                className="nav-img"
                                alt="logout"
                            />
                            <h3>Logout</h3>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
