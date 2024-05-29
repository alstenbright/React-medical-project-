import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function Editpost() {
    const user = useSelector((store) => store.auth.user);
    const { postId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.token) {
            axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then(response => {
                const { name, company, expiry_date } = response.data;
                setName(name);
                setCompany(company);
                setExpiryDate(expiry_date);
            })
            .catch(error => {
                console.error("Error fetching post:", error);
            });
        }
    }, [postId, user?.token]);

    function addEdit() {
        axios.post(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            name,
            company,
            expiry_date: expiryDate
        }, {
            headers: { Authorization: `Bearer ${user.token}` },
        })
        .then(response => {
            alert(response.data.message);
            navigate('/blog'); // Redirect after successful update
        })
        .catch(error => {
            console.error("Error updating post:", error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Edit Post</h1>
                        <div className="form-group">
                            <label>Title:</label>
                            <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Content:</label>
                            <input className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Expiry:</label>
                            <input className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={addEdit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Editpost);
