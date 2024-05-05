import React, { useContext } from 'react'
import Header from '../../components/Header';
import CourseCard from '../../components/CourseCard';
import './home.css'
import {useState} from 'react'
import Chart from '../../components/Chart';
import CourseSelect from '../CourseSelect/CourseSelect';
import { AuthContext } from '../../store/context/Auth';

const Home = () => {
    const [courses,setCourses] = useState([
        {
            name: "English",
            name2: "english",
            progress: 83
        },
        {
            name: "हिंदी",
            name2: "hindi",
            progress: 0
        },
        {
            name: "Spanish",
            name2: "spanish",
            progress: 50
        },
    ]);
    const [openModal, setOpenModal] = React.useState(false);
    const openLangSelectModal = () => setOpenModal(true);
    const closeLangSelectModal = () => setOpenModal(false);
    const authCtx = useContext(AuthContext);
    
    
  return (
    <>
        <Header userDetails={authCtx.userDetails} />
        {courses.length > 0 ? 
            <div className="resume-parent-home">
                <br/>
                <label className='resume-course-home'>Resume Course</label>
                <a className='add-course-label' onClick={openLangSelectModal}>Add Course</a>
            </div> : 
                <>
            </>
        }
        <div className="learnings-page">
            {courses.length== 0 ? 
                <div className="resume-parent">
                    <label className='no-learnings'>No Courses selected</label>
                    <a className='add-course-label' onClick={openLangSelectModal}>Add Course</a>
                </div> :
                <>            
                    {courses.map((course,i) => <CourseCard Course={course} key={i} userDetails={authCtx.userDetails}/>)}
                </>
        }
        </div> 
        <div className="stats">
            <div className="chart">
                {/* <Chart /> */}
            </div>
        </div>
        <CourseSelect open ={openModal} handleClose={closeLangSelectModal}/>
    </>
  )
}

export default Home