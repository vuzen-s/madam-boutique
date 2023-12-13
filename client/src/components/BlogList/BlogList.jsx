import React, { useEffect } from "react";
import BlogItem from "./BlogItem";
import DataBlog from "./DataBlog";
import { useState } from "react";

const BlogList = () => {
  const [designer, setDesigner] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/design')
      .then((response) => response.json())
      .then((data) => {
        setDesigner(data.designers);
        console.log(data.designers)
      })
      .catch((err) => {
        setDesigner(null);
      })
  }, [])

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
      {/* {
        designer.map((item, index) => 
          <p key={index}>{item.name}</p>
        )
      }
      <h2>fetch api Designer</h2> */}
    </div>
  );
};

export default BlogList;
