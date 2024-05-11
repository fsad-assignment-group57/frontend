import axios from 'axios';

const URL = `http://localhost:8080/api`;
const config = {
    headers: {
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

export const signup = async (usernameAndPassword) => {
    try {
        let {username,password} = {...usernameAndPassword}
        usernameAndPassword = {
            'username':username,
            'password':password
        }
        let response =  await axios.post(
            `${URL}/auth/register`,
            usernameAndPassword,config
        );
        return response;
    } catch (e) {
        throw e;
    }
}