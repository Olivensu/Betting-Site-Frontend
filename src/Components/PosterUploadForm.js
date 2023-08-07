import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PosterUploadForm = ({photos}) => {
  console.log(photos,'olive');

  const handleChange = (e)=>{
      e.preventDefault();

      const formData = new FormData();
      formData.append("photo", e.target.files[0]);
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/save`, formData)
      .then((res)=>{
          console.log(res.data);
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  const value = 'olive'

  return (
    <div>
        <h1>{value}</h1>
        <p>Grid</p>
        <label htmlFor='file_picker'>
            {/* <AifillPlusCircle></AifillPlusCircle> */}
            <input type="file" name="file_picker" id="" onChange={(e)=>handleChange(e)} />
        </label>
        <div>
        {
            photos ? photos.map(({photo,_id})=>(
                <div key={_id}>
                    {
                        console.log(photo)
                    }
                    <img src={`${process.env.REACT_APP_API_BASE_URL}/upload/${photo}`} alt="none" />
                    <h1>yes</h1>
                </div> 
            )): <div><h1>nothing</h1></div>
        }
        </div>        
        <p>hello</p>
    </div>
  );
};

export default PosterUploadForm;
