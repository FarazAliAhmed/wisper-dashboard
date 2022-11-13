// const IS_DEV_ENV = process.env.NODE_ENV === "development";

// module.exports = {
//   apiUrl: IS_DEV_ENV
//     ? "http://localhost:5000/api"
//     : "https://wisper-reseller.herokuapp.com/api",
//   adminUrl: IS_DEV_ENV
//     ? "http://localhost:5000/api/admin"
//     : "https://wisper-reseller.herokuapp.com/api/admin",
// };

module.exports = {
  apiUrl: "https://wisper-reseller.herokuapp.com/api",
// apiUrl: "https://api.wisper.ng/api",
  adminUrl: "https://wisper-reseller.herokuapp.com/api/admin",
// adminUrl: "https://api.wisper.ng/api/admin",
};
