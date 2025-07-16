// Blog Service for managing blog posts
import { Client, Databases, Storage, ID, Query, Permission, Role } from "appwrite";
import config from "../config/config";

export class BlogService {
  databases;
  storage;
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  // Function to create a new blog post
  async createBlogPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
        [
           Permission.read(Role.any()), // 👈 or Role.user(userId)
    Permission.write(Role.user(userId)),
        ]
      );
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  }
  
  //  function to update/edit blog post
  async updateBlogPost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Error creating updating blog post:", error);
      throw error;
    }
  }
  // function to delete blog post
  async deleteBlogPost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return false;
    }
  }
  // Function to get a blog post by slug
  async getBlogPost(documentId) {
    try {
      const post = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
      documentId
      );
      return post;
    } catch (error) {
      console.error("Error getting blog post:", error);
      return null;
    }
  }
  // Function to get all blog posts
  async getAllBlogPosts(queries = [Query.equal("status", "published")]) {
    try {
      const response = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
      return response.documents;
    } catch (error) {
      console.error("Error getting all blog posts:", error);
      return [];
    }
  }

  // Function to upload a file to the storage bucket
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  // Function to delete a file from the storage bucket
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

// Function to get a file preview URL from storage
getFilePreview(fileId) {
  try {
    return this.storage.getFileView(config.appwriteBucketId, fileId);
  } catch (error) {
    console.error("Error getting file preview:", error);
    return null;
  }
}

}

export const blogService = new BlogService();
export default blogService;