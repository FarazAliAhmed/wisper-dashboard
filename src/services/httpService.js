import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // Handle invalid/expired JWT tokens globally (but not on login/register pages)
  const currentPath = window.location.pathname;
  const isAuthPage = currentPath.includes('/login') || currentPath.includes('/register') || currentPath.includes('/forgot-password');
  
  if (!isAuthPage && error.response && (error.response.status === 400 || error.response.status === 401)) {
    const errorData = error.response.data;
    const errorMessage = errorData?.error || errorData?.message || JSON.stringify(errorData);
    
    // Check if it's a token-related error
    if (errorMessage.toLowerCase().includes('authorization') || 
        errorMessage.toLowerCase().includes('token') ||
        errorMessage.toLowerCase().includes('jwt') ||
        error.response.status === 401) {
      
      console.error('Session expired. Please login again.');
      
      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Redirect to login page with message
      window.location.href = '/login?session=expired';
      
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
