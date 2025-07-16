// ===== Provider Setup (currently Appwrite) ===== //
// This file sets up the Appwrite client and account for user authentication

import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

export class AuthService {
    client = new Client()
    account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // Function to create a new user
  async createUser({email, password, name}) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  // Method inside your AuthService class
  async loginUser({email, password}) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
  // Method to get the current user
  async getCurrentUser() {
   try {
    return await this.account.get();
  } catch (error) {
    throw error; // rethrow other errors
    
  }

  }
  // Method to log out the current user
  async logoutUser() {
    try {
      const user =  await this.account.deleteSessions();
      return user;
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
    
  }
}

// Exporting the AuthService instance
const authService = new AuthService();
export default authService;


