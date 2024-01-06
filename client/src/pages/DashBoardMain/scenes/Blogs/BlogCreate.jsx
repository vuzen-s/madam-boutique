import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BlogCreate = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [avatar_blog, setAvatar_blog] = useState(null);
    const [status, setStatus] = useState(0);
    const [topic_id, setTopic_id] = useState(0);
    const [user_id, setUser_id] = useState(0);
    const [optionTopics, setOptionTopics] = useState([]);
    const [optionUsers, setOptionUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {

            const response = await axios.get("http://127.0.0.1:8000/api/blogs-create");
            setOptionTopics(response.data.topics);
            setOptionUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("avatar_blog", avatar_blog);
        formData.append("status", status);
        formData.append("topic_id", topic_id);
        formData.append("user_id", user_id);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/blogs-store",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.errors) {
                console.log(response.data.errors);
                // Xử lý lỗi nếu có
            } else {
                // Xử lý thành công chuyển hướng trang
                navigate("/dashboard/blog/");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Tên bài đăng:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Content:
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            setContent(editor.getData());
                        }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">
                        Ảnh đại diện
                    </label>
                    <input
                        className="form-control"
                        type="file"
                        id="avatar"
                        name="avatar_blog"
                        onChange={(e) => setAvatar_blog(e.target.files[0])}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                        Trạng thái bài viết
                    </label>
                    <select
                        className="form-select"
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value={0}>Hiển thị</option>
                        <option value={1}>Ẩn</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="topic_id" className="form-label">
                        Topic:
                    </label>
                    {/* Dropdown for Topics */}
                    <select
                        name="topic_id"
                        className="form-select"
                        onChange={(e) => setTopic_id(e.target.value)}
                    >
                        {optionTopics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="user_id" className="form-label">
                        User:
                    </label>

                    <select
                        name="user_id"
                        className="form-select"
                        onChange={(e) => setUser_id(e.target.value)}
                    >
                        {optionUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.fullname}
                            </option>
                        ))}
                    </select>
                </div>


                <div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ background: "#0a58ca" }}
                    >
                        Thêm bài viết mới
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogCreate;