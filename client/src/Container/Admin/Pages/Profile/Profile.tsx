import React from 'react';
import Profile from "../../../../Component/Profile/Profile";

const AdminProfile = () => {
    return (
        <Profile heading={'Edit Admin Profile'} isAdmin={true}/>
    );
};
export default AdminProfile;
