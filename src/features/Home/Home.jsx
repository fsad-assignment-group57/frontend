import React, { useContext,useEffect } from 'react'
import Header from '../../components/Header';
import CourseCard from '../../components/CourseCard';
import './home.css'
import {useState} from 'react'
import CourseSelect from '../CourseSelect/CourseSelect';
import { AuthContext } from '../../store/context/Auth';
import BasicTable from '../../components/Table';
import { getUserLevelForCourse, getLeaderboard , getRegisteredCourses , addCourses} from './api/home'

const Home = () => {
    const [courses,setCourses] = useState([
        // {
        //     name: "English",
        //     name2: "english",
        //     progress: 83
        // },
        // {
        //     name: "हिंदी",
        //     name2: "hindi",
        //     progress: 0
        // },
        // {
        //     name: "Spanish",
        //     name2: "spanish",
        //     progress: 50
        // },
    ]);

    const [openModal, setOpenModal] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const openLangSelectModal = () => setOpenModal(true);
    const closeLangSelectModal = () => setOpenModal(false);
    const authCtx = useContext(AuthContext);
    
    useEffect(()=> {
        (async () => {
            try {
                const res = await getRegisteredCourses(authCtx.userDetails.username);
                let temparr = [];
                for(let ele of res.data.languages){
                    let progress = await getUserLevelForCourse(authCtx.userDetails.username, ele);
                    temparr.push({name:ele, name2:ele, progress:(+progress.data/3*100).toFixed(2)})
                };
                setCourses(temparr);
            } catch (err) {
                console.error("ERROR | ",err);
                setCourses([])
            }
        })();

        (async () => {
            setLeaderboard((await getLeaderboard()).data)
        })();

    },[])

    const addNewCourse = (language) => {
        setCourses([...courses, {name: language, name2: language, progress:0}]);
        let languages = [];
        courses.forEach(ele => languages.push(ele.name2));
        languages.push(language.toLowerCase())
        addCourses(authCtx.userDetails.username, languages);
    }
    
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
        <br />
        <div className="stats">
            <div className="streak-info">
                <h1>Daily Streak: {10}</h1>
            </div>
            <div className="table-parent">
            <BasicTable leaderboard={leaderboard}/>
            </div>
        </div>
        <br />
        <CourseSelect open ={openModal} handleClose={closeLangSelectModal} addCourse={addNewCourse} courses={courses}/>
    </>
  )
}

export default Home