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
import React, { useState, useEffect } from "react";

function LearningApp(props) {
  const [language, setLanguage] = useState("Hindi");
  const [user, setUserName] = useState("sowmith");
  const [data, setData] = useState(null);
  const [valid2, setValid2] = useState(true);
  const [valid3, setValid3] = useState(true);

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));

      fetch("http://localhost:8081/FSAD/getLevel/"+user+"/"+language)
      .then((response) => response.json())

      .then((json) => {setValid2(json.level2) ; setValid3(json.level3)})
      .catch((error) => console.error(error));

    /*setValid2(false);
    setValid3(false);*/
  }, []);

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
    Hi {user} , Welcome to {language} Learning
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
            <LabTabs language= {language} user={user} level = "1" />
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
            <LabTabs  language= {language} user={user} level = "2" />
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
            <Typography>Level 2 Intermediate</Typography>
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
            <LabTabs language= {language} user={user} level = "3"  />
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
            <Typography>Level 3 Advance</Typography>
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
