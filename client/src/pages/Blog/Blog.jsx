import React from 'react';
import './blog.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


function Blog() {

    return (
        <div>
            <div class="container bootstrap snippets bootdey">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card card-favorite">
                            <div class="card-img-container">
                                <a href="#/"
                                   style={{/*background-image:url('https://www.bootdey.com/image/400x200/EE82EE/000000')*/}}
                                   class="card-img"></a>
                            </div>
                            <div class="card-content">
                                <div class="card-meta">
                  <span class="meta-date meta-box">
                    Jan 11
                  </span>
                                    <span class="meta-pulse meta-box">
                    <a href="#/" class="card-share-number sharrre">50 Shares</a>
                  </span>
                                </div>
                                <h2>
                                    <a href="#/">
                                        Lorem ipsum dolor sit amet, consectetur
                                    </a>
                                </h2>
                            </div>
                            <span class="meta-tags">
                  <a href="#/" title="tags" class="tag">Fashion</a>
              </span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-favorite">
                            <div class="card-img-container">
                                <a href="#/"
                                   style={{/*background-image:url('https://www.bootdey.com/image/400x200/FF6347/000000')*/}}
                                   class="card-img"></a>
                            </div>
                            <div class="card-content">
                                <div class="card-meta">
                  <span class="meta-date meta-box">
                    Jul 16
                  </span>
                                    <span class="meta-pulse meta-box">
                    <a href="#/" class="card-share-number sharrre">800 Shares</a>
                  </span>
                                </div>
                                <h2>
                                    <a href="#/">
                                        Lorem ipsum dolor sit amet, consectetur
                                    </a>
                                </h2>
                            </div>
                            <span class="meta-tags">
                    <a href="#/" title="tags" class="tag">Hot</a>
              </span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-favorite">
                            <div class="card-img-container">
                                <a href="#/"
                                   style={{/*background-image:url('https://www.bootdey.com/image/400x200/48D1CC/000000')*/}}
                                   class="card-img"></a>
                            </div>
                            <div class="card-content">
                                <div class="card-meta">
                  <span class="meta-date meta-box">
                    Feb 18
                  </span>
                                    <span class="meta-pulse meta-box">
                    <a href="#/" class="card-share-number sharrre">53 Shares</a>
                  </span>
                                </div>
                                <h2>
                                    <a href="#/">
                                        Lorem ipsum dolor sit amet, consectetur
                                    </a>
                                </h2>
                            </div>
                            <span class="meta-tags">
                    <a href="#/" title="tags" class="tag">News</a>
                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;