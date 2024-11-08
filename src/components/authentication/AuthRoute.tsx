import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth(); 
  const WHITELISTED_EMAIL = 'akidahmansur@gmail.com';

  
    if (currentUser?.email === WHITELISTED_EMAIL) {
      return <Navigate to="/" />;
    }
    if (currentUser){
      return <Navigate to="/sales/salesindex" />;
    }

  // if (currentUser) {
  //   console.log("Current user found");
  //   console.log(currentUser.email);
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default AuthRoute;