import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../appFeatures/blogSlice";
import {Link} from "react-router-dom"
import striptags from "striptags"; 


function Posts() {
  const dispatch = useDispatch();
  const {blogs} = useSelector((state) => state.blog)
    const userData = useSelector((state) => state.auth.userData);

    const truncateText= (html, wordLimit = 50)=>{
          const text = striptags(html);
const words = text.split(" ");
return words.length > wordLimit ? words.slice(0, wordLimit).join(" ")+ "...":text;
    }

  useEffect(()=>{
    dispatch(getAllBlogs())
  }, [dispatch])
  return (
     <div className="max-w-4xl mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4 text-center">Recent Published Blog Posts</h1>
         {blogs.length === 0 ? (
           <p className="text-center text-gray-600">No blog posts found.</p>
         ) : (
           <ul className="space-y-4">
             {blogs.map((blog) => (
               
               <li key={blog.$id} className="p-4 border rounded shadow hover:shadow-lg transition">
                 
                  {blog.imageUrl && (
               <img src={blog.imageUrl} style={{ maxWidth: "300px" }} />
             )}
                 <h2 className="text-3xl  font-semibold">{blog.title}</h2>
                    {/* ✅ Show plain truncated text */}
              <p className="text-gray-600 dark:text-white">
                {truncateText(blog.content, 50)}
              </p>
                 {/* <p className="text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: blog.content }} />
                 <div className="mt-2 text-sm text-gray-500">
                   Status: <span className="font-medium">{blog.status}</span>
                 </div>
                    */}

            <Link
              to={blog.userId === userData?.$id? `/dashboard/blog/${blog.$id}`:`/posts/readPost/${blog.$id}`}
              className="text-blue-600 mt-3 inline-block"
            >
              Read More →
            </Link>
               </li>  
             ))}
           </ul>
         )}
       </div>
  )
}

export default Posts
