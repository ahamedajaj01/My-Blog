import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {slugify} from "../../utils/slugify"
import {Input, Button, Alert} from "../index"
import { useDispatch, useSelector } from "react-redux";
import { createBlog, uploadFile } from "../../appFeatures/blogSlice";


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState({type:"", message:""})
  const [status, setStatus] = useState(""); 
  const [featuredImage, setFeaturedImage] = useState(null);

  const dispatch = useDispatch()
  const {userData} = useSelector((state) => state.auth)

  // Handle title change and update slug automatically from title
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setSlug(slugify(value));
  };
// handle file change for featured image upload
const handleFileChange = (e) => {
  e.preventDefault();
  const file = e.target?.files?.[0];
  if(file){
    setFeaturedImage(file);
  }
}

// Submit handler for creating a new blog post
  const handleSubmit = async (e)=>{
    e.preventDefault()
    // TODO: Blog creation logic appwrite API call
    if(!title || !content || !status || !userData){
      setAlert({ type: "error", message: "Title, content, status, and user are required." });
      return;
    }
    let uploadedImage = null;
    if(featuredImage){
      const imageResponse =await dispatch(uploadFile(featuredImage)).unwrap();
      uploadedImage = imageResponse.$id;
    }
   await dispatch(createBlog({ title, slug, content, featuredImage: uploadedImage, status, userId: userData?.$id })).unwrap();
    setAlert({ type: "success", message: "Blog created successfully!" });
  
    setTimeout(()=>{
setAlert(null)

    },1000)
    // Reset form fields after successful creation
setTitle("")
setSlug("")
setContent("")
setFeaturedImage(null);
setStatus("");
  }

  return (
    <>
  <div className="text-3xl text-center font-bold text-gray-800 mb-6">
  Create New Blog Post
</div>

    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow">
             {alert?.message && (
         <Alert id="alert-message" type={alert.type} message={alert.message} />
       )}
           <Input label="Title" value={title} onChange={handleTitleChange} placeholder="Enter title" />
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
           {/* Featured Image Upload */}
           <div className="mt-4">
           <Input
           label = "Featured Image"
           type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-4"
           />
           </div>
  {/* Status Toggle */}
  <div className="mt-4">
   <Input
  label="Status"
  type="select"
  name="status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  options={["Draft", "Published"]}
/>
  </div>
  {/* submit Button */}
      <Button type="submit" variant="primary" 
      className="mt-4"
      size="md"
      disabled={!title || !content}
      >Create Blog
        </Button>
    </form>
      </>
  );
}
