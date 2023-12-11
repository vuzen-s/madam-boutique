import React from 'react';
import DataBlog from './DataBlog';
const BlogList = () => {
  return (
    <div>
      {
        DataBlog.map((blog) => {
          return (
           <div>
             <h2>{blog.title}</h2>
            <a>{blog.desc}</a>
           </div>
            
          )
        })
      }
    </div>
  );
};

export default BlogList;
