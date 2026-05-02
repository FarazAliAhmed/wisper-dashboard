import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // Handle invalid/expired JWT tokens globally
  if (error.response && (error.response.status === 400 || error.response.status === 401)) {
    const errorData = error.response.data;
    const errorMessage = errorData?.error || errorData?.message || JSON.stringify(errorData);
    
    console.log('Auth error detected:', errorMessage);
    
    // Check if it's a token-related error
    if (errorMessage.toLowerCase().includes('authorization') || 
        errorMessage.toLowerCase().includes('token') ||
        errorMessage.toLowerCase().includes('jwt') ||
        error.response.status === 401) {
      
      console.error('Invalid or expired token detected. Logging out...');
      
      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      
      return Promise.reject(error);
    }
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
