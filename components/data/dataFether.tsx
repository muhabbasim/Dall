import api from "@/context/apiRequest";
import { AuthContext } from "@/context/authContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type ItemProps = {
  id: number;
  name: string;
}

interface UserDataProps {
  first_name: string;
  second_name: string;
  last_name: string;
  email: string;
  image: string;
  phone: number | string;
  birth_country: ItemProps;
  birth_city: ItemProps;
  birth_date: string;
  residence_country: ItemProps;
  residence_city: ItemProps;
  gender: ItemProps;
  nationality: ItemProps;
  education_institute: ItemProps;
  education_level: ItemProps;
  major: ItemProps;
  experience_years: ItemProps;
  occupation: ItemProps;
  skills: number;
  password: string;
  password_confirmation: string;
  created_at: string;
  joined_at: string;
  name: string;
}

interface CooperationDataProps {
  name: string;
  email: string;
  phone: number;
  image: string;
  country: number;
  city: number;
  departments: number;
  staff: number;
  password: string;
  role: string;
  joined_at: string;
}

// User data
export const useUserData = () => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const res = await api.get(`/individual/user-data`);
      return res.data?.data as UserDataProps;
    },
  });
};


export const useCompanyData = () => {
  return useQuery({
    queryKey: ['cooperationData'],
    queryFn: async () => {
      const res = await api.get(`/company/show`);
      return res.data?.data as CooperationDataProps;
    },
  });
};

