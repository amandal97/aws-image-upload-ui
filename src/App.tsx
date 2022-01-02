import React from 'react';
import './App.css';
import axios from "axios";
import {useDropzone} from 'react-dropzone'

type UserProfilesType = {
  userProfileId: string
  userProfileImageLink: string
  username: string
}

const UserProfiles = () => {

  const [userProfiles, setUserProfiles] = React.useState<UserProfilesType[] | []>([]);

  const fetchUserProfiles = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/user-profile")
    
    console.log(response)
    
    if (response?.data) setUserProfiles(response.data);
    
  }
  
  React.useEffect(() => {
    fetchUserProfiles();
  }, [])
  
  return (
    <>

      {userProfiles.map(userProfile => (
        <div key={userProfile.userProfileId}>
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
    const file = acceptedFiles[0];
    console.log("dropped file", file)
    const formData = new FormData()
    formData.append("file", file)
    axios.post(`http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`, 
    formData, 
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => console.log("successful", res))
      .catch(err => console.error("error", err))
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
