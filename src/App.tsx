import React from 'react';
import './App.css';
import axios from "axios";
import {useDropzone} from 'react-dropzone'
import { BASE_URL } from './constants';

type UserProfilesType = {
  userProfileId: string
  userProfileImageLink: string
  username: string
}

const UserProfiles = () => {

  const [userProfiles, setUserProfiles] = React.useState<UserProfilesType[] | []>([]);

  // API call to fetch user profiles
  const fetchUserProfiles = async () => {
    const response = await axios.get(`${BASE_URL}/api/v1/user-profile`)
    
    if (response?.data) setUserProfiles(response.data);
    
  }
  
  React.useEffect(() => {
    fetchUserProfiles();
  }, [])
  
  return (
    <>

      {userProfiles.map(userProfile => (
        <div key={userProfile.userProfileId}>
          {
            userProfile.userProfileId && 
            <img className='profile-image' src={`${BASE_URL}/api/v1/user-profile/${userProfile.userProfileId}/image/download`} alt='no image dropped!'/>
          }
          <br />
          <br />
          <h1>{userProfile.username}</h1>
          <p>{userProfile.userProfileId}</p>
          <Dropzone { ...userProfile }/>
          <br />
        </div>
      ))}
    </>
  )
}

const Dropzone = ({ userProfileId }: UserProfilesType) =>  {
  const onDrop = React.useCallback(acceptedFiles => {
    // retrieving the dropped file
    const file = acceptedFiles[0];    
    
    // adding file to payload
    const formData = new FormData()
    formData.append("file", file)
    
    // API call to upload the file in S3 Bucket
    axios.post(`${BASE_URL}/api/v1/user-profile/${userProfileId}/image/upload`, 
    formData, 
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(() => window.location.reload())
      .catch(() => alert("Error while uploading profile image!"))
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the profile image here ...</p> :
          <p>Drag 'n' drop profile image here, or click to select profile image</p>
      }
    </div>
  )
}

function App() {

  return (
    <div className='App'>
        <UserProfiles />
    </div>
    
  );
}

export default App;
