'use client'
import { createContext, useState, useEffect } from 'react'
import axios from 'axios';

interface Props {
  children: React.ReactNode;
}

interface User {

  id: string;
  user: any;
  
  // Add other properties as needed
}
interface AuthContextProps {
  register: (formData: any) => void;
  login: (formData: any) => void;
  logout: () => void;
  currentUser: User | null;
}

const defaultContext: AuthContextProps = {
  register: () => {},
  login: () => {},
  logout: () => {},
  currentUser: null,
};


export const AuthContext = createContext<AuthContextProps>(defaultContext);

export const AuthContextProvider = ({ children }: Props ) => {


  // const [ currentUser, setCurrentUser ] = useState(
  //   JSON.parse(localStorage.getItem("currentUser")!) || null
  // );

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // get the register axios from the login page

  const register = async (formData: any) => {
    const res = await axios.post('https://dall.app/api/individual/register', formData)
    
    console.log(res.data)
    setCurrentUser(res.data)
  }

  // get the login axios from the login page
  const login = async (formData: any) => {
    const res = await axios.post('https://dall.app/api/login', formData)
    
    console.log(res.data)
    setCurrentUser(res.data)
  }

  const logout = async () => {
    await axios.post('https://dall.app/api/logout')
    setCurrentUser(null)
  }

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ login, logout, currentUser, register }}>
      {children}
    </AuthContext.Provider>
  )
}