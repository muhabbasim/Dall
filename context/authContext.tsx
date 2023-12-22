'use client'
import { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import api from './apiRequest';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

type userInfoProps = {
  id: number;
  birth_date: string;
}

interface userDataProps {
  first_name: string;
  second_name: string;
  last_name: string;
  email: string;
  phone: string;
  
  birth_country: userInfoProps;
  birth_city: userInfoProps;
  birth_date: Date,
  residence_country: userInfoProps;
  residence_city: userInfoProps;
  gender: userInfoProps;
  nationality: userInfoProps;
  
  education_institute: userInfoProps;
  education_level: userInfoProps;
  major: userInfoProps;
  experience_years: userInfoProps;
  occupation: userInfoProps;
  skills: number;

  password: string;
  password_confirmation: string;
}

type InputProps = {
  id: number;
}

interface User {

  //single user
  first_name: string | undefined;
  second_name: string;
  last_name: string;
  email: string;
  phone: string | string;
  
  birth_country: number & InputProps;
  birth_city: number & InputProps;
  birth_date: string;
  residence_country: number & InputProps;
  residence_city: number & InputProps;
  gender: number & InputProps;
  nationality: number & InputProps;
  
  education_institute: number & InputProps;
  education_level: number & InputProps;
  major: number & InputProps;
  experience_years: number & InputProps;
  occupation: number & InputProps;
  skills: number;
  is_verified: boolean;

  // cooperations user
  name: string;
  staff: number;
  address: string;
  password: string;
  password_confirmation: string;
  departments: number;
  country: number & InputProps;
  city: number & InputProps;
  role: string;

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

   const router = useRouter();
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
    setCurrentUser(res.data.user);
    setToken(res.data.access_token)

  }

  const CooperationRegister = async (formData: any) => {
    const res = await axios.post('https://dall.app/api/company/register', formData)
    
    console.log(res)
    setCurrentUser(res.data.user);
    setToken(res.data.access_token)

  }

  // get the login axios from the login page
  const login = async (formData: any) => {
    const res = await axios.post('https://dall.app/api/login', formData)

    console.log(res.data)
    setCurrentUser(res.data.user);
    setToken(res.data.access_token)

    if( res.data?.user.role === "company") {
      router.push('/cooperation/dashboard')
    } else if (res.data?.user.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/individual/dashboard')
    }
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