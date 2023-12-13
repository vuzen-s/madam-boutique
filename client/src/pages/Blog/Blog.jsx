import React from "react";
import BlogList from "../../components/BlogList/BlogList";

const Blog = () => {
  return (

      <div className="blog-page">
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Fashion Blog</h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">Latest Fashion Trends</h1>
          </div>
          <BlogList></BlogList>
        </div>
        </section >
    </div>
      


   
  );
};

export default Blog;
