const config = {
  apiUrl: import.meta.env.PROD 
    ? 'https://course-selling-application-j9jn.onrender.com'
    : 'http://localhost:3000'
};

export default config;