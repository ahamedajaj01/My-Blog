import React,{useEffect} from 'react'
import {getBlog} from "../appFeatures/blogSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';



function ReadPost() {
  const { blogs, status, error } = useSelector(state => state.blog);
  const { id } = useParams();
    const blog = blogs.find(b => b.$id === id);

  const dispatch = useDispatch();
useEffect(() => {
    if (id) {
    dispatch(getBlog(id));
  }
  }, [id, dispatch]);
   if (status === 'loading') return <p>Loading blog...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  if (!blog) return <p>Blog not found</p>;

    return (
  <div className="relative max-w-4xl mx-auto p-4">
  <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

  {blog.imageUrl && (
    <img src={blog.imageUrl} alt={blog.title} className="mb-4 max-w-full" />
  )}
  
  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
  <p className="mt-4 text-gray-500">Status: {blog.status}</p><br/><div>
     
    </div>
    </div>
  )
}

export default ReadPost
