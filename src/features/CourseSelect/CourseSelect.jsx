import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import EnrollCourseCard from '../../components/EnrollCouseCard';
import "./CourseSelect.css";
import { getAllCourses } from './api/course_select';
import { AuthContext } from '../../store/context/Auth';

let courseListTemp;

const CourseSelect = ({handleClose,open,addCourse, courses}) => {
    const authContext = useContext(AuthContext);
    const [courseList, setCourseList] = useState([
        // {
        //     name: "English",
        //     name2: "english",
        //     enrolled: true
        // },
        // {
        //     name: "हिंदी",
        //     name2: "hindi",
        //     enrolled: false
        // },
        // {
        //     name: "Français",
        //     name2: "french",
        //     enrolled: true
        // },
        // {
        //     name: "Malayalam",
        //     name2: "malayalam",
        //     enrolled: true
        // },
        // {
        //     name: "Tamil",
        //     name2: "Tamil",
        //     enrolled: true
        // },{
        //     name: "Telugu",
        //     name2: "Tamil",
        //     enrolled: true
        // }
    ]);

    function checkIfEnrolled(name) {
      for(let ele of courses){
        if(ele.name.toLowerCase() == name.toLowerCase()){
          return false;
        }
      }
      return true;
    }

    useEffect(() => {
      (async () => {
        let courses = await getAllCourses(authContext.token);
        let courseTemp = [];
        courses.data.forEach(ele => {
          courseTemp.push({
            name: ele.languages,
            name2: ele.nativeLanguage,
            enrolled: checkIfEnrolled(ele.languages)
          })
        });
        await setCourseList(courseTemp);
        courseListTemp = [...courseTemp]
      })();
    },[courses]);

    const filterCourseList = (event) => {
      if(event.target.value == undefined || event.target.value == null){
        setCourseList(...courseListTemp);
      } else {
        let temp = courseListTemp.filter((ele) => {return ele.name.toLowerCase().includes(event.target.value.toLowerCase())})
        setCourseList(temp)
      }
      
    }
    
  return (
    <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 1200 }}>
            <h2 id="unstyled-modal-title" className="modal-title">
                Enroll for course
            </h2>
            <input type='search' placeholder='Search Courses' onChange={filterCourseList}/>
            <div className="course-list">
            {courseList.length== 0 ? 
                <label className='no-learnings'>Loading Courses...</label> :
                <>            
                    {courseList.map((course,i) => <EnrollCourseCard Course={course} key={i} addCourse={addCourse}/>)}
                </>}
            </div>
          
        </ModalContent>
      </Modal>
  )
}


const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ 'base-Backdrop-open': open }, className)}
        ref={ref}
        {...other}
      />
    );
  });
  
  Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
  };
  
  const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;
  
  const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
  );
  

export default CourseSelect