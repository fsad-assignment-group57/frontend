import { View, Text, StyleSheet } from "react-native";
//import Accordion from 'react-bootstrap/Accordion';
import "bootstrap/dist/css/bootstrap.min.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LabTabs from "./LabTabs";
import React, { useState, useEffect, useContext } from "react";
import './learning.css'
import { useLocation } from "react-router-dom";
import Header from '../../components/Header';
import { AuthContext } from '../../store/context/Auth';


function LearningApp() {
  const { state } = useLocation();
  
  const [language, setLanguage] = useState(state.Course.name2);
  const [userName, setUserName] = useState(state.userDetails.username);

  const authCtx = useContext(AuthContext);

  console.log("State: ", language, userName);

  const [password, setPassword] = useState("xyz81"); //Do we need this? 
  const [data, setData] = useState(null);
  const [valid2, setValid2] = useState(false);
  const [valid3, setValid3] = useState(false);

  useEffect(() => {
    fetchUserLevel();


    /*setValid2(false);
    setValid3(false);*/
  }, []);

  const fetchUserLevel = () => {
    
    fetch("/getUserLevel/"+userName+"/"+language,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Indicates JSON data
        'Authorization': authCtx.token, // Example authorization header,
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Host": "localhost:8080",
        "Connection": "keep-alive",
        "Access-Control-Request-Method": "*",
        "Origin": "http://localhost:3000",
        "Access-Control-Request-Headers": "access-control-allow-credentials,access-control-allow-methods,access-control-allow-origin,allow,content-type",
        "Accept": "*/*",
        "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,da;q=0.7",
        "Accept-Encoding": "gzip, deflate, br"
      },
    }

    )
   .then((response) => response.json())

    .then((json) => {
      if (json>=2 ){
        setValid2(true);
         setValid3(true);
      }else if (json==1){
        setValid2(true);
      }

      })
    .catch((error) => console.error(error));
  }

  const submitQuiz = (level) => {
    fetch(
      "/userlevel/" + userName + "/" + level + "/" +language,
      {
        method: "post",
        headers: { "Content-Type": "application/json" ,
        "Authorization" : authCtx.token ,
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Host": "localhost:8080",
        "Connection": "keep-alive",
        "Access-Control-Request-Method": "*",
        "Origin": "http://localhost:3000",
        "Access-Control-Request-Headers": "access-control-allow-credentials,access-control-allow-methods,access-control-allow-origin,allow,content-type",
        "Accept": "*/*",
        "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,da;q=0.7",
        "Accept-Encoding": "gzip, deflate, br"
         },
      }
    ).then((response) =>     fetchUserLevel()  );
  };

  return (
    <div className="App">
      {/* <View>

<View style={styles.container}>
 <Text>Mark</Text>
 <Text style={{backgroundColor: 'green'}}>Tom</Text>
 <Text style={{backgroundColor: 'red'}}>Williams</Text>
 <Text>Sara</Text>
</View>

<View style={styles.container}>
 <Text>Mark</Text>
 <Text style={{backgroundColor: 'green'}}>Tom</Text>
 <Text style={{backgroundColor: 'red'}}>Williams</Text>
 <Text>Sara</Text>
</View>

<View style={styles.container}>
 <Text>Mark</Text>
 <Text style={{backgroundColor: 'green'}}>Tom</Text>
 <Text style={{backgroundColor: 'red'}}>Williams</Text>
 <Text>Sara</Text>
</View>

  </View>*/}

      {/*<Accordion >
      <Accordion.Item eventKey="0" flush>
        <Accordion.Header>Level 1 Begineer</Accordion.Header>
        <Accordion.Body>
          Begineerr
          Quiz
        </Accordion.Body>
      </Accordion.Item>
     { 5==4 ? <Accordion.Item eventKey="1">
        <Accordion.Header>Level 2 Intermediate</Accordion.Header>
        <Accordion.Body>
        Intermediate <br/>
        Quiz
        </Accordion.Body>
      </Accordion.Item> : 
      <Accordion.Item eventKey="1">
      <Accordion.Header disabled >Level 2 Intermediate is locked. Please complete previous levels</Accordion.Header>
    
    </Accordion.Item> 
      }
      <Accordion.Item eventKey="2">
        <Accordion.Header>Level 3 Advance</Accordion.Header>
        <Accordion.Body>
        Advance
        Quiz
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>*/}
            <Header userDetails={authCtx.userDetails} />

    <label className='resume-course'>Hi {userName} , Welcome to {language} Learning</label>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Level 1 Begineer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <LabTabs language= {language} user={userName} password={password} submitQuiz={submitQuiz}  level = "1" />
          </Typography>
        </AccordionDetails>
      </Accordion>
      {valid2 ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Level 2 Intermediate</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography>
            <LabTabs  language= {language} user={userName} password={password} submitQuiz={submitQuiz}  level = "2" />
          </Typography>
        </AccordionDetails>
        </Accordion>
      ) : (
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography className="resume-course">Level 2 Intermediate (Complete Previous Levels to unlock)</Typography>
          </AccordionSummary>
       
        </Accordion>
      )}
      {valid3 ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Level 3 Advance</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography>
            <LabTabs language= {language} user={userName} password={password} submitQuiz={submitQuiz} level = "3"  />
          </Typography>
        </AccordionDetails>
        </Accordion>
      ) : (
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography className="resume-course">Level 3 Advance (Complete Previous Levels to Unlock)</Typography>
          </AccordionSummary>
       
        </Accordion>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    color: "#ff0000",
    justifyContent: "space-around",
    flex: 1,
  },
});

export default LearningApp;
