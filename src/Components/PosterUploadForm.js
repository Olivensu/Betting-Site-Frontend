import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PosterUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState('')

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      if (!selectedFile) {
        alert('Please select an image to upload.');
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/uploadPoster`, formData);
  
        console.log(response.data);
        alert('Image uploaded successfully.');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again later.');
      }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/getPosterImage`)
        .then(res=>{
            console.log(res.data.url)
            setImage(res.data.url)
        })
        .catch(err => console.log(err));
    },[image])

  return (
    <div className='m-auto text-center my-10'>
      <h2 className='text-xl font-bold my-5 '>Upload Poster Image</h2>
      <input className='border-sky-600 border-2 rounded-xl mr-5' type="file" onChange={handleFileChange} />
      <button className='btn btn-success' onClick={handleUpload}>Upload</button>

      <div>
        <img className='m-auto' src={image} alt="none" />
      </div>
    </div>
  );
};

export default PosterUploadForm;
