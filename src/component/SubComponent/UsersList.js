import React, { useContext, useEffect, useState } from 'react';
import Header from '../Dashboard/Header';
import { NavBar } from '../Dashboard/NavBar';
import { DataContext } from '../../context/Context';
import axios from 'axios';

export const UsersList = () => {
    const { clicked, setClicked, setPerform, setUserId } = useContext(DataContext);
    const [userList, setUserList] = useState([]);
    const [message, setMessage] = useState("Loading....");
    const [userRole, setUserRole] = useState("");

    function handleEditUser(id) {
        setClicked(true);
        setPerform("Edit");
        setUserId(id);
    }

    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Fetches the current user's information using the auth token.
     * On success, sets the user list to the current user and sets the user role.
     * On failure, sets the message to an error message.
     */
    /******  0df30109-7ade-4eb2-a4d7-9b714ea3e69f  *******/

    async function fetchCurrentUser() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(process.env.REACT_APP_NODE_URL + "/api/user-profile", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.status === true) {
                const userInfo = response.data.data.user;
                setUserList([userInfo]);
                setUserRole(userInfo.role);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            setMessage("Failed to fetch user details.");
        }
    }


    async function fetchData() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(process.env.REACT_APP_NODE_URL + "/api/user-list", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.status === true) {
                setUserList(response.data.data);
                if (response.data.data.length === 0) setMessage("No Data Found");
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                fetchCurrentUser();
            } else {
                setMessage("Failed to fetch users.");
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [clicked]);

    return (
        <>
            <Header />
            <div className="main-container">
                <NavBar />
                <div className="main">
                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">Users List</h1>
                        </div>

                        {userList.length > 0 ? (
                            <div className="report-body">
                                <div className="report-topic-heading">
                                    <h2 className="t-op">User Id</h2>
                                    <h2 className="t-op">Name</h2>
                                    <h2 className="t-op">Email</h2>
                                    {userRole === "admin" || userRole === "moderator" ? (
                                        <>
                                            <h2 className="t-op">Action</h2>
                                            <h2 className="t-op"></h2>
                                        </>
                                    ) : null}
                                </div>
                                <div className="items">
                                    {userList.map((user, index) => (
                                        <div className="item1" key={index}>
                                            <h2 className="t-op-nextlvl">{user.id}</h2>
                                            <h2 className="t-op-nextlvl">{user.name}</h2>
                                            <h2 className="t-op-nextlvl">{user.email}</h2>

                                            {/* Show Edit button only if Admin or Moderator */}
                                            {(userRole === "admin" || userRole === "moderator") && (
                                                <button className="edit" onClick={() => handleEditUser(user.userId)}>Edit</button>
                                            )}

                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="item1">
                                <h2 className="t-op-nextlvl">{message}</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
