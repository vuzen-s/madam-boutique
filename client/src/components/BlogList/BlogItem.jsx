// BlogItem.jsx
import React from "react";

const BlogItem = ({ title, desc, imageUrl }) => {
  return (
    <div className="blog-item">
      <img className="blog-image" src={imageUrl} alt={title} />
      <div className="blog-content">
        <h2 className="blog-title">{title}</h2>
        <p className="blog-description">{desc}</p>
      </div>
    </div>
  );
};

export default BlogItem;
