import axios from "axios";
import React from "react";
import { useDropzone } from "react-dropzone";
import { BASE_URL } from "../constants";
import { UserProfilesType } from "./UserProfiles";

const Dropzone = ({ userProfileId }: UserProfilesType) => {
  const onDrop = React.useCallback((acceptedFiles) => {
    // retrieving the dropped file
    const file = acceptedFiles[0];

    // adding file to payload
    const formData = new FormData();
    formData.append("file", file);

    // API call to upload the file in S3 Bucket
    axios
      .post(
        `${BASE_URL}/api/v1/user-profile/${userProfileId}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => window.location.reload())
      .catch(() => alert("Error while uploading profile image!"));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the profile image here ...</p>
      ) : (
        <p>
          Drag 'n' drop profile image here, or click to select profile image
        </p>
      )}
    </div>
  );
};

export default Dropzone;
