// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PosterUploadForm = () => {
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileChange = (event) => {
//       setSelectedFile(event.target.files[0]);
//     };
  
//     const handleUpload = async () => {
//       if (!selectedFile) {
//         alert('Please select an image to upload.');
//         return;
//       }
  
//       try {
//         const formData = new FormData();
//         formData.append('poster', selectedFile);
  
//         const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/uploadPoster`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
  
//         console.log(response.data);
//         alert('Image uploaded successfully.');
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         alert('Error uploading image. Please try again later.');
//       }
//     };

//   return (
//     <div>
//       <h2>Upload Poster Image</h2>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default PosterUploadForm;
