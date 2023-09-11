import _ from "lodash";
// import tableData from "./plansTable";

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
  if (name === "newPass") {
    if (value.trim() === "") return "Password is required";
    if (value.trim().length < 5)
      return "Password must be a minimum of 5 characters";
  }
  if (name === "currentPass") {
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
      message: errorObj.response.data.message,
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

export const displayBalance = (volume, unit, cash, mega_wallet, user) => {
  console.log(user);
  if (user?.type === "mega") {
    const totalArray = Object.values(mega_wallet);
    const totalBalance = totalArray.reduce((prev, curr) => {
      if (typeof curr == "string") {
        return prev;
      } else {
        return prev + curr;
      }
    }, 0);

    // console.log("arr", totalArray);

    // console.log(`${totalBalance / 1000} GB`);
    return `${totalBalance / 1000} GB`;
  } else {
    return `₦ ${parseInt(cash)}`;
  }
};

export const getPlanFromId = (plan_id, plans) => {
  const id = parseInt(plan_id);
  const tableData = parseDataPlans(plans);
  const plan = tableData.filter((plan_data) => {
    // console.log(plan_id, plan_data["dataId"]);
    return parseInt(plan_data["dataId"]) === id;
  });
  return plan[0];
};

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export function getBusinessTransactionFromAllTransactions(
  allTransactions = [],
  businessID
) {
  return allTransactions.filter(
    (transaction) => transaction?.business_id === businessID
  );
}

// Currently being used in application
// {
//   dataId: 234,
//   network: "mtn",
//   plan_type: "sme",
//   amount: "₦245",
//   size: "1.0 gb",
//   duration: "30 days",
// },

// What is fetched from the backend
// id: "626b0cc4e2e545785a5399a3"
// network: "mtn"
// plan_id: 206
// plan_type: "gifting"
// price: 2400
// size: "10 gb"
// unit: "gb"
// validity: "monthly"
// volume: 10
// __v: 0
// _id: "626b0cc4e2e545785a5399a3"

export function parseDataPlans(plans) {
  const formated_plans = plans.map((plan) => {
    return {
      dataId: plan["plan_id"],
      network: plan["network"],
      plan_type: plan["plan_type"],
      amount: plan["price"],
      size: `${plan["volume"]}.0 ${plan["unit"]}`,
      // size: "1.0 gb",
      duration: plan["validity"],
    };
  });

  return formated_plans;
}

export function parseDataPlansUser(plans) {
  const formated_plans = plans.map((plan) => {
    return {
      dataId: plan["plan_id"],
      network: plan["network"],
      plan_type: plan["plan_type"],
      amount: plan["price"],
      size: `${plan["volume"]}.0 ${plan["unit"]}`,
      // size: "1.0 gb",
      duration: plan["validity"],
    };
  });

  return formated_plans;
}

export function parseDataAllocatePlans(plans) {
  const formated_plans = plans.map((plan) => {
    return {
      volume: plan["volume"],
      id: plan["plan_id"],
      error: false,
      size: `${plan["volume"]}.0 ${plan["unit"]}`,
      validity: plan["validity"],
      price: plan["price"],
      network: plan["network"],
      plan_type: plan["plan_type"],
    };
  });

  return formated_plans;
}

export const plan_types = [
  "mtn_sme",
  "mtn_gifting",
  "airtel",
  "glo",
  "9mobile",
];
