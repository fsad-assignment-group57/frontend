import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect, useContext } from "react";
import Speech from "react-speech";
import MyImage from "./img/google.png";
import YouTube, { YouTubeProps } from "react-youtube";
import Quiz from "./Quiz";
import { AuthContext } from "../../store/context/Auth";

export default function LabTabs(props) {
  const [value, setValue] = React.useState("1");
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [videos, setVideos] = useState(null);
  const [sentenceFormations, setSentenceFormations] = useState(null);
  const user = props.user;
  const password = props.password;
  const language = props.language;
  const level = props.level;
  const content = [
    {
      english: "Hello",
      name: "नमस्ते",
      ePrononuce: "namaste",
    },
    {
      english: "Good Night",
      name: "शुभ रात्रि",
      ePrononuce: "shubh raatri",
    },
    {
      english: "How are you",
      name: "आप कैसे हैं? ",
      ePrononuce: "aap kaise hain ",
    },
    {
      english: "Hello",
      name: "Bonjour",
      ePrononuce: "Bonjour",
    },
  ];

  const sentences = [
    {
      english: "Weather is good",
      name: "मौसम अच्छा है",
    },
    {
      english: "Its raining outside",
      name: "बाहर बारिश हो रही हे",
    },
    {
      english: "Food is delicious",
      name: "खाना स्वादिष्ट है? ",
    },
  ];

  const authCtx = useContext(AuthContext);

  const videoLinks = [
    {
      description: "Learn Hindi from HindiPod10 ",
      link: "1lrz11BbqCA",
    },
    {
      description: "Learn Hindi Varnmala ",
      link: "Yvb3we9HMFo",
    },
  ];

  const opts = {
    height: "200",
    width: "400",
  };

  const style = {
    play: {
      button: {
        width: "28",
        height: "28",
        cursor: "pointer",
        pointerEvents: "none",
        outline: "none",
        backgroundColor: "yellow",
        border: "solid 1px rgba(255,255,255,1)",
        borderRadius: 6,
      },
    },
  };

  useEffect(() => {
    {
    }

    getContent();

    getVideoLinks();

    getSentence();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getContent() {
    fetch(
      "/languages_structure/" + level + "/" + language,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Indicates JSON data
          Authorization: authCtx.token, // Example authorization header
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
      .then((json) => setData(json))
      .catch((error) => console.error(error));
    //    setData(content);
  }

  function getVideoLinks() {
    fetch(
      "/youtubeLink/" + level + "/" + language,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Indicates JSON data
          Authorization: authCtx.token, // Example authorization header
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
      .then((json) => setVideos(json))
      .catch((error) => console.error(error));
    //    setVideos(videoLinks);
  }

  function getSentence() {
    fetch("/sentence/" + level + "/" + language, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Indicates JSON data
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
    })
      .then((response) => response.json())
      .then((json) => setSentenceFormations(json))
      .catch((error) => console.error(error));
    //    setVideos(videoLinks);
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {/* Hello {user}, Welcome to level {level} of {language}*/}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Word Learning" value="1" />
            <Tab label="Video Links" value="2" />
            <Tab label="Sentence Creation" value="3" />
            <Tab label="Quiz" value="4" />
          </TabList>
        </Box>

        <TabPanel value="1">
          {" "}
          {data ? (
            <tbody>
              <tr>
                <th></th>
                <th></th>
              </tr>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.english_word} &nbsp; &nbsp; &nbsp; </td>
                  <td>
                    {" "}
                    {item.language_word} &nbsp; &nbsp; &nbsp;{" "}
                    <button>
                      {" "}
                      <img src={MyImage} />
                      <Speech
                        text={item.word_spell_in_english}
                        pitch="1"
                        rate="1"
                        volume="3"
                        lang="en-US"
                        voice="Google UK English Female"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            "Loading..."
          )}
        </TabPanel>

        <TabPanel value="2">
          <div>
            {videos
              ? videos.map((video) => (
                  <div>
                    {" "}
                    {video.description}
                    <YouTube
                      videoId={video.link_youtube_word}
                      opts={opts}
                      height="200"
                      width="640"
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </TabPanel>

        <TabPanel value="3">
          <div>
            {sentenceFormations ? (
              <tbody>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
                {sentenceFormations.map((sentence, i) => (
                  <tr key={i}>
                    <td> {sentence.english_word} &nbsp; &nbsp; &nbsp; </td>
                    <td> {sentence.language_word} </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              "Loading..."
            )}
          </div>
        </TabPanel>

        <TabPanel value="4">
          <Quiz level={level} language={language} user={user} token={authCtx.token} submitQuiz={props.submitQuiz}  />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
