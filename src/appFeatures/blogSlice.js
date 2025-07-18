import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "../appwrite/blogService";
import authService from "../appwrite/auth"

// Async thunk to create a new blog post
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (
    { title, slug, content, featuredImage, status, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await blogService.createBlogPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
      });
      return response; // Return created blog post
    } catch (error) {
      return rejectWithValue(
        error.message.includes("already exists")
          ? "Slug already in use. Try another."
          : error.message
      );
    }
  }
);

// Async thunk to update an existing blog post
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (
    { id, title, content, featuredImage, status },
    { rejectWithValue }
  ) => {
    try {
      const response = await blogService.updateBlogPost(id, {
        title,
        content,
        featuredImage,
        status,
      });
      return response; // Return updated blog post
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a blog post by slug
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (slug, { rejectWithValue }) => {
    try {
      const success = await blogService.deleteBlogPost(slug);
      if (!success) {
        throw new Error("Failed to delete blog post.");
      }
      return slug; // Return slug so we can remove it from the Redux state
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Async thunk to get an existing blog post by slug
export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (id, { rejectWithValue }) => {
    try {
      const blog = await blogService.getBlogPost(id);
      // Add imageUrl for the blog if it has a featuredImage
      if (blog.featuredImage) {
        const imageUrl = await blogService.getFilePreview(blog.featuredImage);
        return { ...blog, imageUrl }; // Return blog with imageUrl
      }
      return blog; // Return the fetched blog post
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch blog post.");
    }
  }
);

// Async thunk to fetch all blog posts
export const getAllBlogs = createAsyncThunk(
    "blog/getAllBlogs",
    async (_, { rejectWithValue }) => {
        try {
        const blogs = await blogService.getAllBlogPosts();
              // Add imageUrl for each blog if it has featuredImage
          const blogsWithImages = await Promise.all(
            blogs.map( async (blog) =>{
              if (blog.featuredImage) {
              const imageUrl = await blogService.getFilePreview(blog.featuredImage);
                return {...blog, imageUrl}
              }
              return blog;
            })
          );
        return blogsWithImages; // Return the list of blogs with images
        } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch blogs.");
        }
    }
)

 // Thunk to get only current user's blogs
 export const getUserBlogs = createAsyncThunk(
  "blogs/getUserBlogs",
  async(_, {rejectWithValue})=>{
    try {
       const user = await authService.getCurrentUser(); // get current logged in user
      const blogs = await blogService.getUserBlogs(user.$id); // fetch their blogs
       // Add imageUrl for each blog if it has featuredImage
        const blogsWithImages = await Promise.all(
            blogs.map( async (blog) =>{
              if (blog.featuredImage) {
              const imageUrl = await blogService.getFilePreview(blog.featuredImage);
                return {...blog, imageUrl}
              }
              return blog;
            })
          );
        return blogsWithImages; // Return the list of blogs with images
    } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch user blogs");
    }
  }
 )

// Async thunk to delete a file (used when deleting a blog post with image)
export const deleteFile = createAsyncThunk(
  "blog/deleteFile",
  async (fileId, { rejectWithValue }) => {
    try {
      await blogService.deleteFile(fileId); // No need to return response; it's void
      return fileId; // Return fileId to optionally remove it from state
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete file.");
    }
  }
);

// Async thunk to upload a file (used when creating or updating a blog post)
export const uploadFile = createAsyncThunk(
  "blog/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const response = await blogService.uploadFile(file);
      return response; // Return the uploaded file information
    } catch (error) {
      return rejectWithValue(error.message || "Failed to upload file.");
    }
  }
);

// initial state for the blog slice
const initialState = {
  blogs: [],
   files: [], 
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};
// Main blog slice
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlogState: (state) => {
      state.blogs = [];
      state.status = "idle";
      state.error = null;
    },
  },

  //  Handle async thunk states (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      //  1: when the createBlog thunk is triggered
      .addCase(createBlog.pending, (state) => {
        state.status = "loading"; // Set status to loading when the request is pending
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when the request is fulfilled
        state.blogs.push(action.payload); // Add the new blog post to the state
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when the request is rejected
        state.error = action.payload; // Set the error message
      })

      // 2: when the updateBlog thunk is triggered
      .addCase(updateBlog.pending, (state) => {
        state.status = "loading"; // Set status to loading when the request is pending
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded when the request is fulfilled
        const index = state.blogs.findIndex(
          (blog) => blog.$id === action.payload.$id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload; // Update the existing blog post in the state
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when the request is rejected
        state.error = action.payload; // Set the error message
      })

      // 3: when the deleteBlog thunk is triggered
      .addCase(deleteBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted blog from the state
        state.blogs = state.blogs.filter((blog) => blog.$id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when the request is rejected
        state.error = action.payload; // Set the error message
      })

      // 4: when the getBlog thunk is triggered
      .addCase(getBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the fetched blog post to the state
        const existingIndex = state.blogs.findIndex(
          (blog) => blog.$id === action.payload.$id
        );
        if (existingIndex === -1) {
          state.blogs.push(action.payload); // If not already in state, add it
        } else {
          state.blogs[existingIndex] = action.payload; // If it exists, update it
        }
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed when the request is rejected
        state.error = action.payload; // Set the error message
      })

    //   5: when the getAllBlogs thunk is triggered
        .addCase(getAllBlogs.pending, (state) => {
            state.status = "loading"; 
        })
        .addCase(getAllBlogs.fulfilled, (state, action) => {
            state.status = "succeeded"; 
            state.blogs = action.payload; // Set the blogs to the fetched list
        })
        .addCase(getAllBlogs.rejected, (state, action) => {
            state.status = "failed"; // Set status to failed when the request is rejected
            state.error = action.payload; // Set the error message
        })

        // When the getUserBlogs thunk is triggered
        
         .addCase(getUserBlogs.pending, (state) => {
            state.status = "loading"; 
        })
        .addCase(getUserBlogs.fulfilled, (state, action) => {
            state.status = "succeeded"; 
            state.blogs = action.payload; // Set the blogs to the fetched list
        })
        .addCase(getUserBlogs.rejected, (state, action) => {
            state.status = "failed"; // Set status to failed when the request is rejected
            state.error = action.payload; // Set the error message
        })

        // 6: when the deleteFile thunk is triggered
        .addCase(deleteFile.pending, (state) => {
            state.status = "loading";
        })
        .addCase(deleteFile.fulfilled, (state, action) => {
            state.status = "succeeded";
            // Remove the deleted file from the state
            state.files = state.files.filter((file) => file.id !== action.payload);
        })
        .addCase(deleteFile.rejected, (state, action) => {
            state.status = "failed"; // Set status to failed when the request is rejected
            state.error = action.payload; // Set the error message
        })

        // 7: when the uploadFile thunk is triggered
        .addCase(uploadFile.pending, (state) => {
            state.status = "loading";
        })
        .addCase(uploadFile.fulfilled, (state, action) => {
            state.status = "succeeded";
            // Add the uploaded file to the state
            state.files.push(action.payload);
        })
        .addCase(uploadFile.rejected, (state, action) => {
            state.status = "failed"; // Set status to failed when the request is rejected
            state.error = action.payload; // Set the error message
        })

        
  },
});

// Export the actions generated by createSlice
export const { resetBlogState } = blogSlice.actions;
// Export the reducer to be used in the store
export default blogSlice.reducer;
