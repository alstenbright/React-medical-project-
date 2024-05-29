import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function CreatePost() {
    const user = useSelector(store => store.auth.user);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry, setExpiry] = useState('');
    const navigate = useNavigate();

    function addPost() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine', {
            name: name,
            company: company,
            expiry_date: expiry
        }, {
            headers: { 'Authorization': "Bearer " + user.token }
        }).then(response => {
            navigate('/blog');
        }).catch(error => {
            console.error('Error adding post:', error);
        });
    }

    return (
        <>
            <Navbar />
            <div style={{ marginTop: "20px" }} className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 style={{ textAlign: "center" }}>Create Post</h1>
                        <div className="form-group">
                            <label style={{ fontWeight: "bold" }}>Title:</label>
                            <input
                                type="text"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px"
                                }}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ fontWeight: "bold" }}>Company:</label>
                            <textarea
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px"
                                }}
                                value={company}
                                onChange={(event) => setCompany(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ fontWeight: "bold" }}>Expiry:</label>
                            <textarea
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px"
                                }}
                                value={expiry}
                                onChange={(event) => setExpiry(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                                onClick={addPost}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default checkAuth(CreatePost);
