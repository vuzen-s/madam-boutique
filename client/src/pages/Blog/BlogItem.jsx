import { Button } from 'antd';
import React from "react";
import './BlogItem.scss';

const BlogItem = (blogs, publicPath) => {
    return (
        <>
            {/* post-news */}
            {/*<div className="blogs-new">*/}
            {/*    <div className="blogs-new-main" data-aos="fade-right">*/}
            {/*        <img src={blogs[0].img} alt="" />*/}
            {/*        <h2 className='post-title'>{blogs[0].title}</h2>*/}
            {/*        <i className='post-info'>{blogs[0].created_at}</i>*/}
            {/*        <p className="post-desc">{blogs[0].content}</p>*/}
            {/*        <Button type="primary" className='post-btn'>Read more</Button>*/}
            {/*    </div>*/}
            {/*    <div className="blogs-new-list" data-aos="fade-left">*/}
            {/*        <div className="blogs-new-list-item">*/}
            {/*            <img src={blogs[1].avatar_blog} alt="" />*/}
            {/*            <i className='post-info'>{blogs[1].info}</i>*/}
            {/*            <h2 className='post-title'>{blogs[1].title}</h2>*/}
            {/*        </div>*/}
            {/*        <div className="blogs-new-list-item">*/}
            {/*            <img src={blogs[2].avatar_blog} alt="" />*/}
            {/*            <i className='post-info'>{blogs[2].created_at}</i>*/}
            {/*            <h2 className='post-title'>{blogs[2].title}</h2>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <hr className='hr-blogs' />
            {/* blogs */}
            <div className='blogs'>
                {blogs && blogs.map((blog, key) => {
                    return (
                        <div key={key} className='post-item' data-aos="fade-right">
                            <div className="post-img">
                                <img src={blog.avatar_blog} alt="" />
                            </div>
                            <div className="post-content" data-aos="fade-left">
                                <h2 className='post-title'>{blog.title}</h2>
                                <i className='post-info'>{blog.created_at}</i>
                                <p className="post-desc">{blog.content}</p>
                                <Button classNames={'btnn'} type="primary" className='post-btn'>Read more</Button>
                            </div>
                        </div>
                    )
                })}
            </div >
        </>
    )
}

export default BlogItem;