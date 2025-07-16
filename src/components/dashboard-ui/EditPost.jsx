import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlog, updateBlog } from '../../appFeatures/blogSlice'
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Alert } from '../index';
import {slugify} from '../../utils/slugify';
import { Editor } from "@tinymce/tinymce-react";



function EditPost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogs } = useSelector(state => state.blog);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [featuredImage, setFeaturedImage] = useState(null);

    // Fetch the blog post when component mounts
    const blog = blogs.find(b => b.$id === id);
    useEffect(()=>{
        if (id && !blog) {
            dispatch(getBlog(id));
        }else{
              setTitle(blog.title || "");
    setSlug(blog.slug || "");
    setContent(blog.content || "");
    setStatus(blog.status || "");
    setFeaturedImage(blog.featuredImage || null);
        }
    }, [id, blog, dispatch]);

// Handle title change and update slug automatically from title
    const handleTitleChange = (e) => {
         const value = e.target.value;
            setTitle(value);
            setSlug(slugify(value));
    }

    // handle submit for updating the blog post
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !status) {
            setAlert({ type: "error", message: "Title, content, and status are required." });
            return;
        }
        await dispatch(updateBlog({ id, title, content, status, featuredImage }));
        setAlert({ type: "success", message: "Blog updated successfully!" });
        setTimeout(() => {
            setAlert(null);
            navigate(`/dashboard/blog/${id}`);
        }, 1500);
    }
  return (
     <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmit}>
        <Input label="Title" value={title} onChange={handleTitleChange} />
        <Input label="Slug" value={slug} readOnly />

        <label className="block mb-2 font-semibold">Content:</label>
       <Editor
             apiKey={import.meta.env.VITE_TINYMCE_API_KEY}// Optional if you registered domain
             value={content}
              init={{
                height: 300,
                menubar: false,
                plugins: "link image code",
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | code",
                }}
              onEditorChange={(newContent) => setContent(newContent)}
              />
        <Input
          label="Status"
          type="select"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={["Draft", "Published"]}
        />
        <Button type="submit" className="mt-4">Update Blog</Button>
      </form>
    </div>
  )
}

export default EditPost
