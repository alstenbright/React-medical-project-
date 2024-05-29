import { createBrowserRouter } from "react-router-dom";
import ListPosts from "./components/blog/ListPost";
import CreatePost from "./components/blog/CreatePost";
import ViewPost from "./components/blog/Viewpost";
import EditPost from "./components/blog/Edit post";
import Register from "./components/auth/register";
import App from "./App";
import Login from "./components/auth/Login";


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'blog', element: <ListPosts/>},
    { path: 'blog/posts', element: <ListPosts/>},
    { path: 'blog/posts/Create', element: <CreatePost/>},
    { path: 'blog/posts/:postId', element: <ViewPost/>},
    { path : '/blog/posts/:postId/edit', element: <EditPost/>},
    { path : 'register',element:<Register/>},
    { path : 'login',element:<Login/>},
    { path: 'login', element:<Login/>}

]);
export default router;