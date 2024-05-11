import axios from 'axios';

const URL = `http://localhost:5001`;
const URL2 = ``;

const getCongfig = (token) => {return {
    headers: {
        "Authorization" : token,
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
    }
  };}

export const getRegisteredCourses = async (user_id) => {
    try {
        let response =  await axios.get(
            `${URL}/user-languages/${user_id}`,
        );
        return response;
    } catch (e) {
        throw e;
    }
}

export const getUserLevelForCourse = async (username,language,token) => {
    try {
        let response =  await axios.get(
            `${URL2}/getUserLevel/${username}/${language}`, 
            getCongfig(token)
        );
        return response;
    } catch (e) {
        throw e;
    }
}

export const addCourses = async (user_id, languages) => {
    try {
        let response =  await axios.post(
            `${URL}/user-languages/`,
            {
                "user_id": user_id,
                "languages":languages
            }
        );
        return response;
    } catch (e) {
        throw e;
    }
}

export const getLeaderboard = async (token) => {
    try {
        let response =  await axios.get(
            `${URL2}/getUserPoints`,
            getCongfig(token)
        );
        return response;
    } catch (e) {
        throw e;
    }
}
