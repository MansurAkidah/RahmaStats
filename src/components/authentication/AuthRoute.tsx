import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth(); 
  const ADMIN_EMAIL = 'akidahmansur@gmail.com';
  const AGENT_EMAIL = 'akidahmansur786@gmail.com'
  
    if (currentUser?.email === ADMIN_EMAIL) {
      return <Navigate to="/" />;
    }
    if (currentUser?.email != AGENT_EMAIL){
      return <Navigate to="/pages/catalog" />;
    }

  if (currentUser) {
    console.log("Current user found");
    console.log(currentUser.email);
    return <Navigate to="/pages/welcome" />;
  }

  return children;
};

export default AuthRoute;