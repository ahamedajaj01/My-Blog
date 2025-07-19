import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function PageTitle() {
      const location = useLocation();
  useEffect(() => {
    const path = location.pathname;

    const titleMap = {
        "/": "MyBlog-Homepage",
        "/posts": "Explore Blogs",
        "/about":"About",
        "/login":"login-page",
        "/signup":"Signup-Create your account",
      "/dashboard": "Dashboard-Account",
      "/dashboard/create": "Create Post",
      "/dashboard/posts": "My Posts",
      "/dashboard/setting": "Settings",
      "/dashboard/setting/account": "Account Settings",
      "/dashboard/setting/security": "Security Settings",
      "/dashboard/setting/preferences": "Preferences setting",
    }
      // Fallback to a default title
    document.title = titleMap[path] || "My Blog App";

  }, [location]);

  return (
    <div>
      
    </div>
  )
}

export default PageTitle;
