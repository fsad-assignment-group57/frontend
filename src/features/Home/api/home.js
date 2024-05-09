import axios from 'axios';

const URL = `http://localhost:5001`;
const URL2 = `http://localhost:8080/api/v1`;
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

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

export const getUserLevelForCourse = async (username,language) => {
    try {
        let response =  await axios.get(
            `${URL2}/getUserLevel/${username}/${language}`,
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

export const getLeaderboard = async () => {
    try {
        let response =  await axios.get(
            `${URL2}/getUserPoints`,
        );
        return response;
    } catch (e) {
        throw e;
    }
}
