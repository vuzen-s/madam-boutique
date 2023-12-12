// BlogList.jsx
import React from "react";
import BlogItem from "./BlogItem";
 import DataBlog from "./DataBlog"; // Import danh sách bài viết

const BlogList = () => {
  return (
    <div className="blog-list">
      {DataBlog.map((blog) => (
        <BlogItem
          key={blog.id}
          title={blog.title}
          desc={blog.desc}
          imageUrl={blog.imageUrl}
        />
      ))}
    </div>
  );
};

export default BlogList;
