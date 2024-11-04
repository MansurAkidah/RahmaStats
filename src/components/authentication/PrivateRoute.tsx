import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/authentication/login" />;
  }

  return children;
};

export default PrivateRoute;