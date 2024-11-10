import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName?: string | null, photoURL?: string | null) => Promise<void>;
  resetSessionTimer: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Session timeout duration in milliseconds (e.g., 1 hour)
const SESSION_TIMEOUT = 60 * 60 * 1000; 

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);
  //const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Function to reset the session timer
  const resetSessionTimer = () => {
    //setLastActivity(Date.now());
    
    // Clear existing timeout
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }

    // Set new timeout
    const newTimeout = setTimeout(async () => {
      if (currentUser) {
        await logout();
      }
    }, SESSION_TIMEOUT);

    setSessionTimeout(newTimeout);
  };

  // Sign up with email and password
  const signup = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    resetSessionTimer();
    return result;
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    resetSessionTimer();
    return result;
  };

  // Google Sign In
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    resetSessionTimer();
    return result;
  };

  // Logout
  const logout = async () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }
    return signOut(auth);
  };

  // Reset Password
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const updateUserProfile = async (displayName?: string | null, photoURL?: string | null) => {
    if (!currentUser) throw new Error('No user logged in');
    resetSessionTimer();
    return updateProfile(currentUser, { displayName, photoURL });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        resetSessionTimer();
      }
    });

    // Clean up function
    return () => {
      unsubscribe();
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, []);

  // Effect to handle user activity
  useEffect(() => {
    const handleActivity = () => {
      if (currentUser) {
        resetSessionTimer();
      }
    };

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [currentUser]);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    googleSignIn,
    logout,
    resetPassword,
    updateUserProfile,
    resetSessionTimer,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};