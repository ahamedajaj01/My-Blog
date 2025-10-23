const config = {
appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
appwriteBucketId : String(import.meta.env.VITE_BUCKET_ID),
appwritePasswordRecoveryUrl : String(import.meta.env.VITE_APPWRITE_PASSWORD_RECOVERY_REDIRECT_URL),

}

export default config;