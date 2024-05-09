import axios from 'axios';

const URL = `http://localhost:8080`;
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

export const getAllCourses = async () => {
    try {
        let response =  await axios.get(
            `${URL}/api/v1/languages`,
        );
        return response;
    } catch (e) {
        throw e;
    }
}