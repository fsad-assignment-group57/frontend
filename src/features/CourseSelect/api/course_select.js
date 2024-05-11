import axios from 'axios';

// const URL = `http://localhost:8080`;
const URL = ``;

const getCongfig = (token) => {return {
    headers: {
        "Authorization" : token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };}

export const getAllCourses = async (token) => {
    try {
        let response =  await axios.get(
            `${URL}/languages`,
            getCongfig(token)
        );
        return response;
    } catch (e) {
        throw e;
    }
}