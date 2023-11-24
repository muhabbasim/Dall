import axios from 'axios';

const newRequest = axios.create({
  baseURL: 'https://dall.app/api/',
  withCredentials: true,
})

export default newRequest;