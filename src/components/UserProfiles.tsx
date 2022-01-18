import axios from "axios";
import React from "react";
import { BASE_URL } from "../constants";
import Dropzone from "./Dropzone";

export type UserProfilesType = {
  userProfileId: string;
  userProfileImageLink: string;
  username: string;
};

const UserProfiles = () => {
  const [userProfiles, setUserProfiles] = React.useState<
    UserProfilesType[] | []
  >([]);

  // API call to fetch user profiles
  const fetchUserProfiles = async () => {
    const response = await axios.get(`${BASE_URL}/api/v1/user-profile`);

    if (response?.data) setUserProfiles(response.data);
  };

  React.useEffect(() => {
    fetchUserProfiles();
  }, []);

  return (
    <div className="profileWrapper">
      {userProfiles.map((userProfile) => (
        <div key={userProfile.userProfileId}>
          {userProfile.userProfileId && (
            <img
              className="profile-image"
              src={`${BASE_URL}/api/v1/user-profile/${userProfile.userProfileId}/image/download`}
              alt="no image dropped!"
            />
          )}
          <br />
          <br />
          <h1>{userProfile.username}</h1>
          <p>{userProfile.userProfileId}</p>
          <Dropzone {...userProfile} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default UserProfiles;
