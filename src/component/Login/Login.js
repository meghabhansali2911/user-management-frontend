import './../../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext } from 'react';
import { DataContext } from '../../context/Context';

function Login() {
    const navigate = useNavigate();

    const { setUserData, isLogin, setIsLogin } = useContext(DataContext)

    const [formValue, setformvalue] = useState({
        email: "",
        password: ""
    });


    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors before validation

        try {
            const regex = /^.{6,40}$/;
            const regexEmail = /\S+@\S+\.\S+/;

            if (!regexEmail.test(formValue.email)) {
                setError("Enter a valid email ID");
                return;
            }
            if (!regex.test(formValue.password)) {
                setError("Password must be between 6 and 40 characters");
                return;
            }

            const response = await axios.post(process.env.REACT_APP_NODE_URL + "/api/sign-in", formValue);

            if (response.data.status === true) {
                const result = response.data.data;
                setUserData(result.user);
                localStorage.setItem("token", result.token);
                setIsLogin(true);
                navigate('/users');
            } else {
                setError(response.data.message || "Login failed");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred while logging in");
        }
    };


    const handleChange = (event) => {
        setError('');
        setformvalue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        if (isLogin) {
            window.location.replace('/dashboard');
        } else {
            setLoader(false);
        }
    }, [isLogin])

    return (
        <div className="App">
            {loader ? null : <div className="container-fluid bg-hero">
                <div className="container">
                    <div className="signin-container">
                        <div className="signin_box">
                            <div className="signin_div">
                                <form action="">
                                    <div className="signin-title">
                                        <span className="title">Sign in</span>
                                    </div>
                                    <div className="filed-content">
                                        <input className="fill-input" type="text" name="email" value={formValue.email} placeholder="Login Email" onChange={handleChange} />
                                    </div>
                                    <div className="filed-content">
                                        <input className="fill-input" type={isRevealPwd ? "text" : "password"} name="password" value={formValue.password} placeholder="Enter Password" onChange={handleChange}
                                        />
                                        <div className='icon'>{isRevealPwd ? (<FaEyeSlash onClick={() => setIsRevealPwd(false)} />) : (<FaEye onClick={() => setIsRevealPwd(true)} />)}</div>
                                    </div>
                                    <span style={{ color: 'red', textAlign: 'left', display: 'block' }}>{error}</span>

                                    <div className="next-btn mt-4">
                                        <button onClick={(e) => handleSubmit(e)}>Sign in</button>
                                    </div>
                                    <div className="create-account">
                                        <a href="/create-account">Create new account</a>
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
            </div>}
        </div>
    );
}

export default Login;
