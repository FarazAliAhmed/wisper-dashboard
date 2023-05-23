import { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import AuthLayout from "../../layouts/AuthLayout";
import mail from '../../assets/dashboard/mail.svg'

import "./auth.scss";

const CheckEmail = ({match}) => {
  const { email } = match.params;

  return (
    <AuthLayout >
 
       
        <div className="gap-2 -pb-4 mt-4" style={{display:"flex", justifyContent:"flex-start", alignItems:"center", flexDirection:"column"}}>
          <img src={mail} style={{width:"5rem"}}/>
          <h1 style={{fontSize:"1.3rem"}}>Check the link sent to your email</h1>
          <p style={{fontSize:"0.7rem", textAlign:"center", color:"#434343"}}>Please click the link sent to {email} to verify your email</p>
         

         <p className="mt-4 ">Didn’t get an email? <a href="/forgot-password" style={{cursor:"pointer"}}>Click here to resend</a> </p>
        </div>

    </AuthLayout>
  );
};

export default CheckEmail;
