import './blog.scss';
import {useEffect, useState} from "react";
import BlogItem from "./BlogItem";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [publicPath, setPublicPath] = useState("");


    // Get data carts
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data.blogs);
                setBlogs(data.blogs);
            })
            .catch((error) => console.log(error));
    }, [])

    /// Get path to public in server
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs-publicPath', {
            method: "GET", headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setPublicPath(data.publicPath);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="wrrrapper">

            {/*<BlogItem blogs={blogs && blogs} publicPath={publicPath}/>*/}
        </div>
    );
};

export default Blog;