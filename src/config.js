// // const IS_DEV_ENV = process.env.NODE_ENV === "development";

// // module.exports = {
// //   apiUrl: IS_DEV_ENV
// //     ? "http://localhost:5000/api"
// //     : "https://wisper-reseller.herokuapp.com/api",
// //   adminUrl: IS_DEV_ENV
// //     ? "http://localhost:5000/api/admin"
// //     : "https://wisper-reseller.herokuapp.com/api/admin",
// // };

// module.exports = {
//   // // Test URL
//   // apiUrl: "http://localhost:5000/api",
//   // adminUrl: "http://localhost:5000/api/admin",

//   // apiUrlV2: "https://localhost:5000/api/v2",

//   // REAL URL

//   apiUrl: "https://wisper-reseller.herokuapp.com/api",

//   apiUrlV2: "https://wisper-reseller.herokuapp.com/api/v2",
// // apiUrl: "https://api.wisper.ng/api",
//   adminUrl: "https://wisper-reseller.herokuapp.com/api/admin",
//   adminUrlV2: "https://wisper-reseller.herokuapp.com/api/v2/admin",
// // adminUrl: "https://api.wisper.ng/api/admin",
// };

// const { REACT_APP_DB_URL } = process.env;
const REACT_APP_DB_URL = "https://wisperapi-prod.up.railway.app";
// const REACT_APP_DB_URL = "http://localhost:8000";

module.exports = {
  // // Test URL
  // apiUrl: "http://localhost:5000/api",
  // adminUrl: "http://localhost:5000/api/admin",

  // apiUrlV2: "https://localhost:5000/api/v2",
  // apiUrlV2: "https://localhost:5000/api/v2",

  // REAL URL

  apiUrl: `${REACT_APP_DB_URL}/api`,

  apiUrlV2: `${REACT_APP_DB_URL}/api/v2`,
  // apiUrl: "https://api.wisper.ng/api",
  adminUrl: `${REACT_APP_DB_URL}/api/admin`,
  adminUrlV2: `${REACT_APP_DB_URL}/api/v2/admin`,
  // adminUrl: "https://api.wisper.ng/api/admin,
};
