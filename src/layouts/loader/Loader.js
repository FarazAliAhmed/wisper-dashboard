import React from "react";
import "./loader.scss";
import { Spinner } from "reactstrap";

const Loader = ({isLoading, children}) => {
  if(isLoading){
    return (
      <div className="fallback-spinner">
        <div className="loading">
          <Spinner color="primary" />
        </div>
      </div>
    )
  }else{
    return {children}
  }
};
export default Loader;
