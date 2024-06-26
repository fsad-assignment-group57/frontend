import React from 'react'
import './CourseCard.css'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

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

const CourseCard = ({Course,key, userDetails}) => {
  const navigate = useNavigate();

  const navigateToCourse = () => {
  navigate("/learnings", {state:{userDetails, Course}})
  }

  return (
    <div className='card-parent' onClick={navigateToCourse}>
        <div className="card-title">
            <h1>{Course.name}</h1>
            <h3>({Course.name2})</h3>
        </div>
        <div className="progress-bar">
            <BorderLinearProgress variant="determinate" value={Course.progress} progress={Course.progress}/>
            <label className='progress-label'>{Course.progress}%</label>
        </div>
    </div>
  )
}

export default CourseCard