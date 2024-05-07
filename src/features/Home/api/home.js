import axios from 'axios';

const URL = `http://localhost:5001`;
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