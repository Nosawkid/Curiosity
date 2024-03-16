import React from 'react';
import './sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const actions = [
  { name: 'Profile', link: '/HiringPortal/Profile', icon: <AccountBoxIcon /> },
  { name: 'Add Vacancy', link: '/HiringPortal/Newvacancy', icon: <PostAddIcon /> },
  { name: 'My Posts', link: '/HiringPortal/myposts', icon: <AllInboxIcon /> },
  // { name: 'Complaints', link: '/HiringPortal/Complaints', icon: <NewReleasesIcon /> },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <div className='hiringSidebar'>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, left: 16 }}
        icon={<SpeedDialIcon />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            tooltipTitle={action.name}
            icon={action.icon}
            onClick={() => handleNavigation(action.link)}
            sx={{ width: "60px", height: "60px" }}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Sidebar;
