import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {

    const [credentials,setcredentials] = useState({email:"",password:""});
    const onHandleChange = (e)=>{
        setcredentials({...credentials,[e.target.name]:[e.target.value]});
    }
    const history = useNavigate()
    useEffect(()=>{
    
        if(localStorage.getItem("token")){
          
          history("/");
      }
      },[])
    const onSubmit = async(e)=>{

        //preventDefault
        e.preventDefault();
        //e.prevendDefault();
        const host = 'http://localhost:5000';
        const email = credentials.email;
        const password = credentials.password;
        const responce = await fetch(`${host}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
              "Content-type": "application/json",
              
          },
          body: JSON.stringify({email,password})
          });

          const json = await responce.json();
          if(json.success){
            console.log(json.authtoken);
            localStorage.setItem("token",json.authtoken);
           
            
            history("/");
        }else{
            console.log(json);
            toast.error(`Error ${json.msg}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

    }
  return (
    <>
    <div className='container col-6 mt-4'>

    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
     <form onSubmit={onSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input
      type="email"
      className="form-control"
      id="email"
      aria-describedby="emailHelp"
      placeholder="Enter email"
      name='email'
      value={credentials.email}
      onChange={onHandleChange}
    />
    <small id="emailHelp" className="form-text text-muted">
      We'll never share your email with anyone else.
    </small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input
      type="password"
      className="form-control"
      id="password"
      placeholder="Password"
      name='password'
      value={credentials.password}
      onChange={onHandleChange}
    />
  </div>
  
  
  <button type="submit" className="btn btn-primary mt-2">
   Login
  </button>
</form>
</div>
    </>
  )
}

export default Login;
