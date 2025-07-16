// routes/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PublicRoute({ children }) {
 const { userData, authReady } = useSelector((state) => state.auth);

  if (!authReady) return <p>Loading...</p>; // wait for auth check to finish

  return userData ? <Navigate to="/dashboard" replace /> : children;
}
