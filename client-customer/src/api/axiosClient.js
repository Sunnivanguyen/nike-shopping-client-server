// This JavaScript code is creating a custom instance of axios, a popular HTTP client for making requests to APIs. Here’s what each part does:

import axios from "axios";

const BASE_URL = import.meta.env.SERVER_BASE_URL;

// axios.create: This creates a new instance of axios with custom default settings. The baseURL is set to “http://localhost:8080”, which means all requests made with this instance will be sent to this URL. The headers are set to accept and send JSON data.

const BaseAxios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// BaseAxios.defaults.withCredentials = true;: This line allows the axios instance to send cookies with every request, which is necessary for sessions or cookie-based authentication.
BaseAxios.defaults.withCredentials = true;

// BaseAxios.interceptors.request.use: This is a function that intercepts every request made with this axios instance. Before the request is sent, it tries to get a token from the local storage. If a token exists, it adds an Authorization header with the token to the request.
BaseAxios.interceptors.request.use(
  async (config) => {
    let token;
    try {
      token = await localStorage.getItem("token");
    } catch (error) {
      console.log(error);
    }

    if (token !== null) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// BaseAxios.interceptors.response.use: This function intercepts every response received by this axios instance. It doesn’t modify the response in any way and simply returns it as is. If there’s an error, it rejects the Promise, which can be caught in a .catch() block where the request was made.

BaseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
//Finally, BaseAxios is exported so it can be imported and used in other parts of your application.
export default BaseAxios;
