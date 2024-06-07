import axios from "axios";
import { getUserID } from "../util/userData";
import { useEffect, useState } from "react";
const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = getUserID();
        // console.log('User ID:', userID );
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/user/getById/${userID}`
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-profile">
      <h2>Profile</h2>
      {userData ? (
        <div className="user-details">
          <p>
            <strong>Name:</strong> {userData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
