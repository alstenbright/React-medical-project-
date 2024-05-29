import axios from "axios";
import React from "react";
import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from "./PostListItem";
import checkAuth from "../auth/checkAuth"
import { useSelector } from "react-redux";

function ListPosts() {
  const [allPosts, setAllPosts] = useState([]); 
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector(state => state.auth.user);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(allPosts);
    } else {
      const filteredItems = allPosts.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filteredItems);
    }
  };

  const fetchPosts = useCallback(() => {
    if (!user) {
      console.error("User is not defined.");
      return;
    }

    axios
      .get('https://medicalstore.mashupstack.com/api/medicine', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setAllPosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch((error) => {
        console.error('Error while fetching posts:', error);
        if (error.response && error.response.status === 401) {
          alert('You are not authorized to view this content.');
        }
      });
  }, [user]); 

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); 

  return (
    <div style={{ marginTop: "20px" }}>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form>
              <label>Search List: </label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />{" "}
              &nbsp;
              <button
                className="btn btn-small btn-success"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
              &nbsp;
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Blog</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/blog/posts/create" className="btn btn-info mb-2">
              Create Post
            </Link>
            {filteredPosts.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              filteredPosts.map((post) => (
                <PostListItem key={post.id} post={post} refresh={fetchPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListPosts);
