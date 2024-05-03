import React from 'react'
import Header from '../../components/Header';
import CourseCard from '../../components/CourseCard';
import './home.css'
import {useState} from 'react'
import Chart from '../../components/Chart';
import CourseSelect from '../CourseSelect/CourseSelect';

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
            name: "Français",
            name2: "french",
            progress: 50
        },
    ]);
    const [openModal, setOpenModal] = React.useState(false);
    const openLangSelectModal = () => setOpenModal(true);
    const closeLangSelectModal = () => setOpenModal(false);
       
    
    
  return (
    <>
        <Header />
        {courses.length > 0 ? 
            <div className="resume-parent">
                <br/>
                <label className='resume-course'>Resume Course</label>
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
                    {courses.map((course,i) => <CourseCard Course={course} key={i}/>)}
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