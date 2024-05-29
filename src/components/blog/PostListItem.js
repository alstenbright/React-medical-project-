import axios from "axios";
import { Link } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function PostListmedicine(props) {
    const user = useSelector((store) => store.auth.user);

    function deletePost() {
        axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        }).then(response => {
            alert(response.data.message);
            props.refresh();
        }).catch(error => {
            console.error('Error deleting post:', error);
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-3">
                        <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
                            <h5 className="card-title">{props.post.name}</h5>
                            <p className="card-text">Company: {props.post.company}</p>
                            <p className="card-text">Expiry Date: {props.post.expiry_date}</p>
                            <div className="btn-group" role="group" aria-label="Post Actions">
                                <button className="btn btn-danger" onClick={deletePost}>Delete</button>
                                <Link to={`/blog/posts/${props.post.id}/edit`} className="btn btn-primary">Edit</Link>
                                <Link to={`/blog/posts/${props.post.id}`} className="btn btn-info">View</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(PostListmedicine);
