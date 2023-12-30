import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from 'draft-js';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {Box} from "@mui/material";
import './BlogCreate.scss';

const BlogCreate = () => {
    const [content, setContent] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [avatar_blog, setAvatar_blog] = useState('');
    const [status, setStatus] = useState(1);
    const [topic_id, setTopic_id] = useState(1);
    const [user_id, setUser_id] = useState(1);
    const onEditorStateChange = (newContent) => {
        const contentState = newContent.getCurrentContent();
        console.log('content state', convertToRaw(contentState));
        setContent(convertToRaw(contentState).blocks[0].text);
    }

    const navigate = useNavigate();

    const [errorsField, setErrorsField] = useState({});
    const [message, setMessage] = useState('');

    const handleChangeInput = (event) => {
        switch (event.target.name) {
            case "title":
                setTitle(event.target.value);
                break;
            case "avatar_blog":
                setAvatar_blog(event.target.files[0]);
                break;
            default:
                break;
        }
    };

    const showToastMessage = () => {
        toast.success('Thêm bài viết thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('status', status);
        formData.append('topic_id', topic_id);
        formData.append('user_id', user_id);
        ///
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/blogs-store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(formData);
            console.log(response);
            console.log(response.data.errors);
            console.log(response.data.message);
            setMessage(response.data.message);
            // setMessage(response.data.message);
            if (response.data.errors) {
                setErrorsField(response.data.errors);
                console.log(errorsField);
            } else {
                navigate('/dashboard/blog/');
                showToastMessage();
            }
        } catch (error) {
            // Xử lý lỗi khác nếu có
            console.error('Error:', error);
            setErrorsField(error.response.data.errors);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <label htmlFor="title" className="form-label">Tên bài đăng:</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter title" name="title"
                           onChange={handleChangeInput}/>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.title}
                    </p>
                </div>
                <br/>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Editor
                        editorState={content}
                        defaultEditorState={content}
                        toolbarClassName="custom-toolbar"
                        wrapperClassName="custom-wrapper"
                        editorClassName="custom-editor"
                        onEditorStateChange={onEditorStateChange}
                    />
                </div>
                <Box mt="40px">
                    <button type="submit" class="btn btn-primary" style={{background: "#0a58ca"}}>Thêm bài viết mới
                    </button>
                </Box>
            </form>
        </div>
    );
}

export default BlogCreate;