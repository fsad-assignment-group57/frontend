import axios from 'axios';

const URL = `http://localhost:8080/api`;
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

export const login = async (usernameAndPassword) => {
    try {
        let {username,password} = {...usernameAndPassword}
        usernameAndPassword = {
            'username':username,
            'password':password
        }
        let response =  await axios.post(
            `${URL}/auth/login`,
            usernameAndPassword,config
        );
        return response;
    } catch (e) {
        throw e;
    }
}