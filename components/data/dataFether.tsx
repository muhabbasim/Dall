import api from "@/context/apiRequest";
import { useQuery } from "@tanstack/react-query";

interface UserDataProps {
  first_name: string;
  second_name: string;
  last_name: string;
  email: string;
  phone: number;
  birth_country: number;
  birth_city: number;
  birth_date: Date;
  residence_country: number;
  residence_city: number;
  genders: number;
  nationality: number;
  education_institute: number;
  education_level: number;
  major: number;
  experience_years: number;
  occupation: number;
  skills: number;
  password: string;
  password_confirmation: string;
}

interface CooperationDataProps {
  name: string;
  email: string;
  phone: number;
  country: number;
  city: number;
  departments: number;
  staff: number;
  password: string;
  role: string;
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


  


