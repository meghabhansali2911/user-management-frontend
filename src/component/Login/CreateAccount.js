import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { DataContext } from '../../context/Context';

export const CreateAccount = () => {
    const navigate = useNavigate();
    const { isLogin, setUserData } = useContext(DataContext);

    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "User"
    });

    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const regexName = /^.{3,}$/;
            const regexEmail = /\S+@\S+\.\S+/;
            const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!regexName.test(formValue.name)) {
                return setError('Name must be at least 3 characters long.');
            }
            if (!regexEmail.test(formValue.email)) {
                return setError('Enter a valid email.');
            }
            if (!regexPassword.test(formValue.password)) {
                return setError('Password must be at least 8 characters long, include one uppercase letter and one number.');
            }
            if (formValue.password !== formValue.confirm_password) {
                return setError('Passwords do not match.');
            }
            if (!['Admin', 'User', 'Moderator'].includes(formValue.role)) {
                return setError('Invalid role selected.');
            }

            const response = await axios.post(process.env.REACT_APP_NODE_URL + "/api/create-new-user", formValue);

            if (response.data.status === true) {
                alert(response.data.message);
                localStorage.setItem('login', true);
                const result = response.data.data;
                setUserData(result.user);
                localStorage.setItem("token", result.token);
                navigate('/dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setError('');
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        if (isLogin) {
            window.location.replace('/dashboard');
        } else {
            setLoader(false);
        }
    }, [isLogin]);

    return (
        <div className="App">
            {loader ? null :
                <div className="container-fluid bg-hero">
                    <div className="container">
                        <div className="signin-container">
                            <div className="signin_box">
                                <div className="signin_div">
                                    <form onSubmit={handleSubmit}>
                                        <div className="signin-title">
                                            <span className="title">Create New Account</span>
                                        </div>
                                        <div className="filed-content">
                                            <input className="fill-input" type="text" name="name" value={formValue.name} placeholder="Name" onChange={handleChange} required />
                                        </div>
                                        <div className="filed-content">
                                            <input className="fill-input" type="email" name="email" value={formValue.email} placeholder="Email" onChange={handleChange} required />
                                        </div>
                                        <div className="filed-content">
                                            <input className="fill-input" type={isRevealPwd ? "text" : "password"} name="password" value={formValue.password} placeholder="Enter Password" onChange={handleChange} required />
                                            <div className='icon'>{isRevealPwd ? (<FaEyeSlash onClick={() => setIsRevealPwd(false)} />) : (<FaEye onClick={() => setIsRevealPwd(true)} />)}</div>
                                        </div>
                                        <div className="filed-content">
                                            <input className="fill-input" type={isRevealPwd ? "text" : "password"} name="confirm_password" value={formValue.confirm_password} placeholder="Confirm Password" onChange={handleChange} required />
                                            <div className='icon'>{isRevealPwd ? (<FaEyeSlash onClick={() => setIsRevealPwd(false)} />) : (<FaEye onClick={() => setIsRevealPwd(true)} />)}</div>
                                        </div>
                                        <div className="filed-content">
                                            <select className="fill-input" name="role" value={formValue.role} onChange={handleChange} required>
                                                <option value="User">User</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Moderator">Moderator</option>
                                            </select>
                                        </div>
                                        <span style={{ color: 'red', textAlign: 'left', display: 'block' }}>{error}</span>
                                        <div className="next-btn mt-4">
                                            <button type="submit">Sign Up</button>
                                        </div>
                                        <div className="create-account">
                                            <a href="/">Sign In .??</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="rightside_box">
                                <div className="login-img">
                                    <img src="img/login.png.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};