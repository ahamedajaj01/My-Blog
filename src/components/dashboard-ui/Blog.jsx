import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog, deleteBlog, deleteFile } from '../../appFeatures/blogSlice'; // your thunk
import {Button} from "../index"
import { TrashIcon } from "@heroicons/react/24/outline";


export default function Blog() {
  const { id } = useParams();
  const dispatch = useDispatch();
const navigate = useNavigate();
  const { blogs, status, error } = useSelector(state => state.blog);
  // Find the blog in state by slug
  const blog = blogs.find(b => b.$id === id);

  useEffect(() => {
    if (id) {
    dispatch(getBlog(id));
  }
  }, [id, dispatch]);

  if (status === 'loading') return <p>Loading blog...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  if (!blog) return <p>Blog not found</p>;

  const handleEdit = () => {
    navigate(`/dashboard/blog/${blog.$id}/edit`);
  }
// handle delete blog post
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        // Step 1: Delete the blog post
        await dispatch(deleteBlog(blog.$id));
        // Delete the featured image if it exists
await dispatch(deleteFile(blog.featuredImage)); 
 // Step 3: Redirect after successful deletion
        navigate('/dashboard/posts'); 
      } catch (error) {
        console.error("Failed to delete blog:", error);
      }
    }
  }
  return (
    <>
    <div className="relative max-w-4xl mx-auto p-16">
  <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

  {blog.imageUrl && (
    <img src={blog.imageUrl} alt={blog.title} className="mb-4 max-w-full" />
  )}
  
  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
  <p className="mt-4 text-gray-500">Status: {blog.status}</p><br/>

  {/* Edit button */}
  <Button
    onClick={handleEdit}
    className="mr-2"
    name="edit-button"
    type="button"
    variant="primary"
  >
    Edit Blog
  </Button>

  {/* ✅ Delete button fixed at bottom-right */}
  <Button
    variant="outline"
    size="sm"
    className="absolute bottom-4 right-4"
    onClick={handleDelete}
  >
    <TrashIcon className="w-5 h-5 text-red-600" />
  </Button>
</div>

   
      </>
  );
}
