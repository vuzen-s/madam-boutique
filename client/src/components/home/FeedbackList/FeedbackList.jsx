import './FeedbackList.scss';
import Heading from "../Products/Heading";
import * as React from "react";

const FeedbackList = () => {
    return (
        <div>
            <Heading heading="Feedback"/>
            <div className="grid wide">
                <div className="feedback" id="reviews">
                    <h2 className="feedback_title">
                        <span>Consectetur</span> Adipiscing elit
                    </h2>
                    <div className="row">
                        <div className="col l-4 m-4 c-12">
                            <div className="feedback_item">
                                <div className="feedback_item--icon">
                                    <i className="fa-solid fa-quote-left"></i>
                                </div>
                                <p className="feedback_item--content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <div className="feedback_item--info">
                                    <div className="feedback_figure">
                                        <div className="feedback_figure--img">
                                            <img src="../asset/img/feedback1.png" alt=""/>
                                        </div>
                                        <div className="feedback_figure--name">
                                            <h4>David Sen</h4>
                                            <p>Designer</p>
                                        </div>
                                    </div>
                                    <div className="feedback_figur--star">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col l-4 m-4 c-12">
                            <div className="feedback_item">
                                <div className="feedback_item--icon">
                                    <i className="fa-solid fa-quote-left"></i>
                                </div>
                                <p className="feedback_item--content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <div className="feedback_item--info">
                                    <div className="feedback_figure">
                                        <div className="feedback_figure--img">
                                            <img src="../asset/img/feedback-img-01.png" alt=""/>
                                        </div>
                                        <div className="feedback_figure--name">
                                            <h4>Markus Barker</h4>
                                            <p>Developer</p>
                                        </div>
                                    </div>
                                    <div className="feedback_figur--star">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col l-4 m-4 c-12">
                            <div className="feedback_item">
                                <div className="feedback_item--icon">
                                    <i className="fa-solid fa-quote-left"></i>
                                </div>
                                <p className="feedback_item--content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <div className="feedback_item--info">
                                    <div className="feedback_figure">
                                        <div className="feedback_figure--img">
                                            <img src="../asset/img/feedback2.png" alt=""/>
                                        </div>
                                        <div className="feedback_figure--name">
                                            <h4>Michael Ken</h4>
                                            <p>Sales Agent</p>
                                        </div>
                                    </div>
                                    <div className="feedback_figur--star">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedbackList;