// import Editor from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from 'draft-js';
import {useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {Box} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import './BlogCreate.scss';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import {useDispatch, useSelector} from "react-redux";
import 'select2';
import 'select2/dist/css/select2.min.css';
// ckeditor để tạo ô nhập nội dung
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BlogCreate = () => {
    const [title, setTitle	] = useState('');
    const [content, setContent	] = useState('');
    const [avatar_blog, setAvatar_blog] = useState('');
    const [status, setStatus] = useState(0);
    const [topic_id, setTopic_id] = useState(0);
    const [user_id, setUser_id] = useState(0);
    
    
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [optionTopics, setOptionTopics] = useState([]);
    const [optionUsers, setOptionUsers] = useState([]);
   

    const select2Ref = useRef();
    const navigate = useNavigate();

    const [errorsField, setErrorsField] = useState({});
    const [message, setMessage] = useState('');

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
        formData.append('avatar_blog', avatar_blog);
        formData.append('status', status);
        formData.append('topic_id', topic_id);
        formData.append('user_id', user_id);
        ///
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/blogs-store', formData, {
                headers: {
                    'Content-Type': 'form-data',
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

     //
     useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blog-create', {
            method: "GET", headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                // console.log(data);
                setOptionTopics(data.topics);
                setOptionUsers(data.users);
         
            })
            .catch((error) => console.log(error));
    }, []);

    // Hàm xử lý khi giá trị của trường form thay đổi
    const handleChangeInput = (event) => {
        switch (event.target.name) {
            case "title":
                setTitle(event.target.value);
                break;
            case "content":
                setContent(event.target.value);
                break;
            case "avatar_blog":
                setAvatar_blog(event.target.files[0]);
                break;
            case "status":
                setStatus(event.target.value);
                break;
           
            
            default:
                break;
        }
    };

      // select2
      useEffect(() => {
        const $select = $('.form-select');
         $select.select2();

        // Đăng ký sự kiện change để theo dõi giá trị được chọn
        $select.on('change', (event) => {
            const selectedValue = event.target.value;
            console.log('Selected value:', selectedValue);
            ///
            switch (event.target.name) {
                case "topic_id":
                    setTopic_id(event.target.value);
                    break;
                case "user_id":
                    setUser_id(event.target.value);
                    break;
                
              
            }
        });
        return () => {
            // Hủy đăng ký sự kiện khi component bị hủy
            $select.off('change');
            // Hủy Select2 khi component bị hủy
            $select.select2('destroy');
        };
    }, []);
    return (
        <Box m="40px">
        <div>
            <form onSubmit={handleSubmit}>
            <Box
                display="grid"
                gap="50px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                    "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                }}
            >

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Tên bài đăng:</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter title" name="title"
                           onChange={handleChangeInput}/>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.title}
                    </p>
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content:</label>
                    <input type="text" className="form-control" id="content" placeholder="Enter title" name="content"
                           onChange={handleChangeInput}/>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.title}
                    </p>
                </div>

                <div className="mb-3">
                    <label for="avatar" className="form-label">Ảnh đại diện </label>
                    <input className="form-control" type="file" id="avatar" name="avatar"
                           onChange={handleChangeInput}/>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.avatar}
                    </p>
                </div>

                <div className="mb-3">
                    <label for="status" class="form-label">Trạng thái bài viết</label>
                    <select className="form-select" name="status" onChange={handleChangeInput} value={status}>
                        <option value={0}> Hiển thị</option>
                        <option value={1}> Ẩn</option>
                    </select>
                   </div>
                   {/* topic and user */}
                   <div className="mb-3">
                    <label for="toppic_id" class="form-label">Topic:</label>
                    <select name="toppic_id" className="form-select select2ByID" onChange={handleChangeInput}
                            ref={select2Ref}>
                        {optionTopics.map((item, index) => (<option key={index} value={item.id}>
                            {item.name}
                        </option>))}
                    </select>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.toppic_id}
                    </p>
                </div>

                <div className="mb-3">
                    <label for="user_id" class="form-label">User:</label>
                    <select name="user_id" className="form-select select2ByID" onChange={handleChangeInput}
                            ref={select2Ref}>
                        {optionUsers.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <p style={{color: "red"}}>
                        {errorsField && errorsField.user_id}
                    </p>
                </div>

              
              
              {/* comment */}
                  <div  className="mb-8">
                    <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event ) => {
                        console.log( event );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                    </div>
                <Box mt="40px">
                    <button type="submit" class="btn btn-primary" style={{background: "#0a58ca"}} onSubmit={handleSubmit} >
                        Thêm bài viết mới
                     
                    </button>
                </Box>

                </Box>
            </form>
        </div>
        </Box>
    );
}

export default BlogCreate;