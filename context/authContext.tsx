'use client'
import { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import api from './apiRequest';

interface Props {
  children: React.ReactNode;
}

interface User {
  user: any;
  token: any;
}

interface AuthContextProps {
  register: (formData: any) => void;
  CooperationRegister: (formData: any) => void;
  login: (formData: any) => void;
  logout: () => void;
  currentUser: User | null;
  // token: User | null;
}

const defaultContext: AuthContextProps = {
  register: () => {},
  CooperationRegister: () => {},
  login: () => {},
  logout: () => {},
  currentUser: null,
  // token: null,
};


export const AuthContext = createContext<AuthContextProps>(defaultContext);

export const AuthContextProvider = ({ children }: Props ) => {


  // save user to the localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // save token to localStorage
  const [token, setToken] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storeToken = localStorage.getItem('dallUserToken');
  
      if (storeToken) {
        try {
          // Attempt to parse the storeToken, and set it to null if parsing fails
          return JSON.parse(storeToken) || null;
        } catch (error) {
          console.error('Error parsing user data:', error);
          return null;
        }
      } else {
        return null;
      }
    }
    return null;
  });

  // get the register axios from the login page
  const register = async (formData: any) => {
    const res = await axios.post('https://dall.app/api/individual/register', formData)
    
    console.log(res.data)
    setCurrentUser(res.data)
    setToken(res.data.access_token)

  }

  const CooperationRegister = async (formData: any) => {
    const res = await axios.post('https://dall.app/api/company/register', formData)
    
    console.log(res)
    setCurrentUser(res.data)
    setToken(res.data.access_token)

  }

  // get the login axios from the login page
  const login = async (formData: any) => {
    const res = await axios.post('https://dall.app/api/login', formData)

    console.log(res.data)
    setCurrentUser(res.data)
    setToken(res.data.access_token)
  }

  const logout = async () => {
    try {
      const res = fetch('https://dall.app/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      setCurrentUser(null)
      setToken(null)

      // const res = await api.post('/logout')
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    localStorage.setItem('dallUserToken', JSON.stringify(token))
  }, [currentUser, token])

  return (
    <AuthContext.Provider value={{ login, logout, currentUser, register, CooperationRegister }}>
      {children}
    </AuthContext.Provider>
  )
}