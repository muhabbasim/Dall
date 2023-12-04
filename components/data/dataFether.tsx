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


// interface FormDataProps {
//   countries: [];
//   departments: [];
//   education_levels: [];
//   education_institutes: [];
//   specializations: [];
//   occupations: [];
//   experience_year: [];
//   skills: [];
//   majors: [];
//   hobbies: [];
//   jobs: [];
//   genders: [];
//   diplomas: [];
// }


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



// Cities data
export const useCities = (countryId: number) => {
  return useQuery({
    queryKey: ['cities', countryId],
    queryFn: async () => {
      const res = await api.get(`/get/country-cities/${countryId}`);
      return res.data;
    },
  });
};

// // Education level data
// export const useEducationLevel = () => {
//   return useQuery({
//     queryKey: ['educationLevel'],
//     queryFn: async () => {
//       const res = await api.get(`/get/education-levels`);
//       return res.data;
//     },
//   });
// };



  


