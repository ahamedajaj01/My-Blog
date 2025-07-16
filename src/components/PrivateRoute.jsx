// routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
  const { userData, authReady } = useSelector((state) => state.auth);


  if (!authReady) return <p>Loading...</p>;  // Or show a spinner

  return userData ? children : <Navigate to="/login" replace />;
}
