import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function Views() {
  const user = useSelector((store) => store.auth.user); 
  const { postId } = useParams();

  const [post, setPost] = useState({ name: "", company: "", expiry_date: "" });

  useEffect(() => {
    if (user?.token) { 
      axios
        .get("https://medicalstore.mashupstack.com/api/medicine/"+postId, {
          headers: { Authorization: "Bearer " + user.token },
        })
        .then((response) => {
          console.log("Response data:", response.data);
          setPost(response.data);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    }
  }, [postId, user.token]); 

  return (
    <div style={{ marginTop: "20px", backgroundColor: "#f2f2f2", padding: "20px" }}>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card" style={{ border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff", marginBottom: "20px" }}>
              <div className="card-header" style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <h1 style={{ marginBottom: "10px" }}>{post.name}</h1>
              </div>
              <div className="card-body">
                <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Company: {post.company}</p>
                <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Expiry Date: {post.expiry_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(Views);
