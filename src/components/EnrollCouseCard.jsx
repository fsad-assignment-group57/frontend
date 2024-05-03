import React from 'react'
import './EnrollCourseCard.css'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const BorderLinearProgress = styled(LinearProgress)(({ theme,value }) => ({
    height: 20,
    // borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#ffff'
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      background: `linear-gradient(90deg, #d61515 ${100 - value}%, #15d629 100%)`
    },
  }));

const EnrollCourseCard = ({Course,key}) => {
  return (
    <div className='enr-card-parent'>
        <div className="enr-card-title">
            <h1>{Course.name}</h1>
            <h3>({Course.name2})</h3>
        </div>
        <div className="enrolled">
            {Course.enrolled ? <label>Enroll</label> : <label>Enrolled. Go to Course</label> }
        </div>
    </div>
  )
}

export default EnrollCourseCard;