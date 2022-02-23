export const formIsValid = (errorObject) => {
  return Object.keys(errorObject).length > 0;
};

export const validateProperty = (input) => {
  const { name, value } = input;
  if (name === "email") {
    if (value.trim() === "") return "Email is required";
  }
  if (name === "password") {
    if (value.trim() === "") return "Password is required";
    if (value.trim().length < 5)
      return "Password must be a minimum of 5 characters";
  }
  if (name === "username") {
    if (value.trim() === "") return "Username is required";
    if (value.trim().length > 10)
      return "Username must be a maximum of 10 characters";
  }
  if (name === "name") {
    if (value.trim() === "") return "Name is required";
    if (value.trim().length < 5)
      return "Name must be a minimum of 5 characters";
  }
};

export const validateForm = (data) => {
  const errors = {};
  if (data.email.trim() === "") errors.email = "email is required";
  if (data.password.trim() === "") errors.password = "password is required";

  return errors;
};

export const handleFailedRequest = (errorObj) => {
  if (errorObj.response && errorObj.response.status === 400) {
    return {
      status: false,
      message: errorObj.response.data,
    };
  }

  if (errorObj.response && errorObj.response.status === 401) {
    return {
      status: false,
      message: errorObj.response.data.message,
    };
  }

  if (errorObj.response && errorObj.response.status === 500) {
    return {
      status: false,
      message: "Someting went wrong. Try again later",
    };
  }
  return { status: false, message: "Something went wrong. Try again later" };
};
