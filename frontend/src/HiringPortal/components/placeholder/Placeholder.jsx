import React from 'react'
import './placeholder.scss'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
    if (typeof string !== 'string' || string.length === 0) {
        return '#000000'; // Default color if string is empty or undefined
      }
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }


  function stringAvatar(name) {
    if (typeof name !== 'string' || name.trim() === '') {
      // Handle case where name is not a valid string or is empty
      return {
        sx: {
          bgcolor: '#000000', // Default color if name is empty or undefined
        },
        children: '', // Empty string if name is empty or undefined
      };
    }
  
    const nameParts = name.split(' ');
    const firstInitial = nameParts[0] ? nameParts[0][0] : ''; // First initial of first name
    const secondInitial = nameParts[1] ? nameParts[1][0] : ''; // First initial of last name
  
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${firstInitial}${secondInitial}`, // Concatenated initials
    };
  }

  const Placeholder = ({ username }) => {
    return (
      <div className='placeHolderUser'>
        <Avatar {...stringAvatar(username)} />
      </div>
    );
  };

export default Placeholder