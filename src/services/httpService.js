import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // Handle invalid/expired JWT tokens globally
  if (error.response && error.response.status === 400) {
    const errorMessage = error.response.data?.error || error.response.data?.message || '';
    
    // Check if it's a token-related error
    if (errorMessage.includes('Authorization Token is invalid') || 
        errorMessage.includes('Authorization Token not provided') ||
        errorMessage.includes('jwt expired') ||
        errorMessage.includes('invalid token')) {
      
      console.error('Invalid or expired token detected. Logging out...');
      
      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Redirect to login page
      window.location.href = '/login';
      
      return Promise.reject(error);
    }
  }

  // Handle 401 Unauthorized - also force logout
  if (error.response && error.response.status === 401) {
    console.error('Unauthorized access. Logging out...');
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
    return Promise.reject(error);
  }

  if (!expectedError) {
    console.error("An unexpected error occurrred.", error);
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};
