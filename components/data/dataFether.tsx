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

// Countries data
export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await api.get(`/get/countries`);
      return res.data;
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

// Education level data
export const useEducationLevel = () => {
  return useQuery({
    queryKey: ['educationLevel'],
    queryFn: async () => {
      const res = await api.get(`/get/education-levels`);
      return res.data;
    },
  });
};

export const useEducationInstitutions = () => {
  return useQuery({
    queryKey: ['educationInstitutions'],
    queryFn: async () => {
      const res = await api.get(`/get/education-institutes`);
      return res.data;
    },
  });
};

export const useSpecialization = () => {
  return useQuery({
    queryKey: ['specialization'],
    queryFn: async () => {
      const res = await api.get(`/get/specializations`);
      return res.data;
    },
  });
};

export const useOccupations = () => {
  return useQuery({
    queryKey: ['occupations'],
    queryFn: async () => {
      const res = await api.get(`/get/occupations`);
      return res.data;
    },
  });
};

export const useExperienceYears = () => {
  return useQuery({
    queryKey: ['experienceYears'],
    queryFn: async () => {
      const res = await api.get(`/get/experience-years`);
      return res.data;
    },
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await api.get(`/get/skills`);
      return res.data;
    },
  });
};

export const useMajors = () => {
  return useQuery({
    queryKey: ['majors'],
    queryFn: async () => {
      const res = await api.get(`/get/majors`);
      return res.data;
    },
  });
};

export const useHobbies = () => {
  return useQuery({
    queryKey: ['hobbies'],
    queryFn: async () => {
      const res = await api.get(`/get/hobbies`);
      return res.data;
    },
  });
};

export const useDiplomas = () => {
  return useQuery({
    queryKey: ['diplomas'],
    queryFn: async () => {
      const res = await api.get(`/get/diplomas`);
      return res.data;
    },
  });
};

export const useGenders = () => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: async () => {
      const res = await api.get(`/get/genders`);
      return res.data;
    },
  });
};


// Export the hooks individually
// export { useUserData, useCountries, useCities, useEducationLevel }

  


