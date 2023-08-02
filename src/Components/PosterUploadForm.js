import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PosterUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [posterImageUrl, setPosterImageUrl] = useState('');

  useEffect(() => {
    // Fetch the poster image URL from your backend API
    fetchPosterImageUrl();
  }, []);

  const fetchPosterImageUrl = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-poster-image`);
      if (response.status === 200) {
        setPosterImageUrl(response.data.url);
      }
    } catch (error) {
      console.error('Error fetching poster image URL:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('posterImage', selectedFile);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload-poster`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Poster image updated successfully');
      } else {
        setMessage('Error uploading poster image');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className=' text-center m-auto'>
      <h1 className='text-3xl text-center my-10'>Poster Image Upload</h1>
      <form onSubmit={handleSubmit}>
        <input className="m-5 block mx-auto border-2 input w-full max-w-xs" type="file" name="posterImage" accept="image/*" onChange={handleFileChange} />
        <button className='btn btn-success text-center' type="submit">Upload</button>
      </form>
      <div>{message}</div>
      {posterImageUrl && <img className='m-auto' src={posterImageUrl} alt="Poster" />}
    </div>
  );
};

export default PosterUploadForm;
