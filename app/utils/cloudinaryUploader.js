import axios from "axios";

const handleImageUpload = async (files, uploadPreset, cloudName) => {
  const uploadedUrls = [];

  for (const file of files) {
    const formData = new FormData(); // ✅ Move this **inside** the loop
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url;
      uploadedUrls.push(imageUrl);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }

  return uploadedUrls;
};

export default handleImageUpload;
