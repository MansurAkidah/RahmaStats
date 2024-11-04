import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth(); 

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthRoute;