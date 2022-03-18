import tableData from './plansTable'


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

export const totalDataSold = (dataTransactions = []) => {
  let sum = 0;
  if (dataTransactions.length === 0) return sum;
  dataTransactions.forEach((transaction) => {
    sum += transaction.data_volume;
  });
  return sum;
};


// export const formatDataToNaira = (volume) => {
//   let amount = (volume/1024)*300
//   const currencyString = amount.toLocaleString('en-US', {
//     style: 'currency',
//     currency: 'NGN',
//   });
//   return currencyString.replace("NGN", "₦").split(".")[0]
// }

// export const getUserBalance = (currentBalance, user) => {
//   const { volume, unit, cash } = currentBalance
//   return user?.type === "mega" ? `${volume}`.split(".")[0] + ` ${unit}` : ` ${unit}` + `${cash}`.split(".")[0]
// }

export const displayBalance = (volume, unit, cash, user) => {
  if(user.type === "mega"){
    return `${parseInt(volume)} ${unit}`
  }else{
    return `${unit} ${parseInt(cash)}`
  }
}

export const getPlanFromId = (plan_id) => {
  const id = parseInt(plan_id)
  const plan = tableData.filter((plan_data) => {
    console.log(plan_id, plan_data["dataId"])
    return plan_data["dataId"] === id
  })
  return plan[0]
}