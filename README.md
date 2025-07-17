# 📝 Blogify – A Modern Blogging Platform

A full-featured blog web application where users can **sign up**, **log in**, **create blogs**, **edit or delete them**, and **upload a featured image**. Built with **React**, **Redux Toolkit**, and **Appwrite** as the backend.

# LIVE DEMO

https://my-blog-ashy-phi.vercel.app/login
---

## 🚀 Features

- 🔐 **Authentication**
  - User Signup / Login
  - Password reset (optional)
  - Auth state management with Redux

- ✍️ **Blog Management**
  - Create blog posts with title, content (with TinyMCE), and featured image
  - Auto-generate URL slugs from blog titles
  - View blog details via slug-based URLs
  - Edit / Delete own blogs
  - Store and manage blog data using Appwrite Database

- 🖼️ **Featured Images**
  - Upload featured images during blog creation
  - Images stored and served from Appwrite storage

- 🌐 **Routing**
  - Public and private routes
  - Friendly URL structure: `/blog/:slug`
  - 404 page for invalid routes

- ⚛️ **Tech Stack**
  - React + Vite
  - Redux Toolkit
  - React Router
  - TinyMCE (rich text editor)
  - Appwrite (Auth + DB + Storage)
  - Tailwind CSS

---

## 📁 Project Structure

```
src/
├── app/                # Redux store configuration
├── components/         # Reusable UI components (Navbar, BlogCard, etc.)
├── features/           # Redux slices (authSlice, blogSlice)
├── pages/              # Page components (Login, Signup, BlogList, BlogDetail, etc.)
├── services/           # API abstraction layer (authService.js, blogService.js)
├── utils/              # Utility functions (slugify)
├── App.jsx             # Main App component with routing
├── main.jsx            # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
 git https://github.com/ahamedajaj01/My-Blog.git
cd My-Blog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Appwrite

- Setup a project on [Appwrite](https://appwrite.io)
- Enable **Authentication**, **Database**, and **Storage**
- Create:

  - Users collection (auto)
  - Blogs collection with fields:
    - title (string)
    - content (string)
    - slug (string)
    - featuredImage (string - file URL or ID)
    - userId (string)
  - Bucket for featured images

- Create `.env` file:

```env
VITE_APPWRITE_ENDPOINT=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DB_ID=your_db_id
VITE_APPWRITE_COLLECTION_ID=your_blogs_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

---

## 🧪 Development

```bash
npm run dev
```

---

## 🛡️ Authentication Flow

- Redux manages auth state
- Tokens are stored securely
- On app load, check session and set user in Redux
- Logout clears session and Redux state

---

## ✨ Slug Generation

- On blog title input, we auto-generate slugs like:
  - Title: `My First Blog!`
  - Slug: `my-first-blog`

---

## 📸 Featured Image Upload

- Users upload images during blog creation
- Images are stored in Appwrite's storage
- On edit, user can update or remove image

---

## 🗑️ Blog Access & Security

- Only the blog creator can edit or delete
- Route guards prevent unauthorized access

---

## 🙌 Credits

Built by [Ajaj Ahamed Thakurai]("https://www.linkedin.com/in/ajaj-ahamed-323369364") with ❤️ using React & Appwrite.
