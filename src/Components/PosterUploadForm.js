import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PosterUploadForm = ({photos}) => {
    const [info, setInfo] = useState('');
    const [getInfo, setGetInfo] = useState('')
//   console.log(photos,'olive');

useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/getinfo`)
    .then(res=>{
        console.log(res.data.info)
        setGetInfo(res.data.info)
    }).catch(err=>{
        console.log(err);
    })
},[])

//   const handleChange = (e)=>{
//       e.preventDefault();

//       const formData = new FormData();
//       formData.append("photo", e.target.files[0]);
//       axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/save`, formData)
//       .then((res)=>{
//           console.log(res.data);
//       })
//       .catch((err)=>{
//           console.log(err)
//       })
//   }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(info)
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/saveinfo`, {info})
    .then(res=>{
        console.log(res.data);
        alert('Information Submitted successfully')
    })
    .catch(err=>{
        console.log(err);
    })

  }

  return (
    <div className='text-center'>
        {/* <h1>{value}</h1>
        <p>Grid</p>
        <label htmlFor='file_picker'>
            <input type="file" name="file_picker" id="" onChange={(e)=>handleChange(e)} />
        </label> */}
        <div>
<p>{getInfo}</p>

            <div className='my-10'>
                <form onSubmit={handleSubmit} action="">
                    <textarea onChange={(e)=>{setInfo(e.target.value)}} className="textarea textarea-bordered border-sky-300 w-full max-w-xs" 
                    placeholder="Enter your info"></textarea>
                    <input
                    type="submit"
                    value="Submit"
                    className="m-5 btn-success cursor-pointer text-white text-bold text-xl block mx-auto input w-full max-w-xs"
                    />
                </form>
            </div>
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
    </div>
  );
};

export default PosterUploadForm;
