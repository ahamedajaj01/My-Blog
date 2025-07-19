// ===== Provider Setup (currently Appwrite) ===== //
// This file sets up the Appwrite client and account for user authentication

import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // Function to create a new user
  async createUser({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
          // 👇 This is the missing piece
    await this.account.createEmailPasswordSession(email, password);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  // Method inside your AuthService class
  async loginUser({ email, password }) {
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
      const user = await this.account.deleteSessions();
      return user;
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
  }

  // Method to update password from account setting passsword
  async updatePassword({ currentPassword, newPassword }) {
    try {
      // Will throw if current password is incorrect
      const res = await this.account.updatePassword(
        newPassword,
        currentPassword
      );
      return res;
    } catch (error) {
      throw error; // Let the caller handle the error
    }
  }
  // Method to  update/change username
  async updateName(newName) {
    try {
      const res = await this.account.updateName(newName);
      return res;
    } catch (error) {
      throw error; // Let the caller handle the error
    }
  }

  // Method to update Email from account setting
  async updateEmail({ newEmail, password }) {
    if (!newEmail || !password) throw new Error("Email and password required");
    try {
      // ✅  Update email
    const res = await this.account.updateEmail(newEmail, password);
    // ✅ Log out after update
    await this.account.deleteSession("current");
      return res;
    } catch (error) {
      throw error;
    }
  }

//  send reset password link to email method
async forgetPassword (email) {
  if(!email) return;
  try {
    const res = await this.account.createRecovery(email, config.appwritePasswordRecoveryUrl)
    return res
  } catch (error) {
    throw(error)
  }
}

// reset password from reset link
async resetPassword(userId,secret,newPassword) {
  try {

    const res = await this.account.updateRecovery(userId,secret,newPassword)
    return res;
  } catch (error) {
        throw error;
  }
}

}

// Exporting the AuthService instance
const authService = new AuthService();
export default authService;
