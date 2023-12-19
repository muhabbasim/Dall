import api from "@/context/apiRequest";

const imageUpload = async (file) => {

  try {
    const formData = new FormData();
    formData.append('file', file)

    const res = await api.post(`/upload-image`, {image: formData})
    // console.log(res);

  } catch (error) {
    console.log(error);
  }
}

export default imageUpload;