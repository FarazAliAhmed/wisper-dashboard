import jwt_decode from "jwt-decode";

export function isTokenExpired(token) {
  try {
    const decoded = jwt_decode(token);
    if (decoded && typeof decoded.exp === "number") {
      const expirationTimestamp = decoded.exp * 1000; // Convert to milliseconds
      const expirationTimestamp1 = decoded.iat * 1000; // Convert to milliseconds
      const currentTimestamp = Date.now();
      // console.log(new Date(expirationTimestamp));
      return currentTimestamp > expirationTimestamp;
    }
    // Handle if decoded or exp is not available
    return true;
  } catch (error) {
    // Decoding failed or other error occurred
    return true; // Treat invalid tokens as expired
  }
}
