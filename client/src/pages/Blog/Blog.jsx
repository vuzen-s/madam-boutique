import React from 'react';
import './blog.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogList from "../../components/home/BlogList/BlogList";


function Blog() {
    return (
        <div className="w-full mx-auto">
            <div className="max-w-container mx-auto px-4 mt-20">
                <BlogList/>
            </div>
        </div>
    );
}

export default Blog;