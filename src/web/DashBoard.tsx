import React from 'react';
import HeaderWeb from '../components/Header/HeaderWeb';
import UpdateInfor from '../components/PersonalInformation/UpdateInfor';

const DashBoard = () => {
    return (
        <div>
            <HeaderWeb />
            <div className='content-web DashBoard'>
                <UpdateInfor />
            </div>
        </div>
    )
}

export default DashBoard