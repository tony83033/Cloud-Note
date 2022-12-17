import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sign = () => {
    const [credentials,setcredentials] = useState({email:"",password:"",cpassword:"",name:""});
    
    const onHandleChange = (e)=>{
        setcredentials({...credentials,[e.target.name]:[e.target.value]});
    }
    let history = useNavigate();

    
  useEffect(()=>{
    
    if(localStorage.getItem("token")){
      
      history("/");
  }
  },[])
    const onSubmit = async (e) =>{

            e.preventDefault();
            const host = 'http://localhost:5000';
           
            
            const email = credentials.email.toString();
            const password = credentials.password.toString();
            const name = credentials.name.toString();
           // http://localhost:3000/api/v1/auth/sign
           console.log(email,password,name);
            const responce = await fetch(`${host}/api/v1/auth/sign`, {
                method: 'POST',
                headers: {
                  "Content-type": "application/json",
                  
              },
              body: JSON.stringify({name,email,password})
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
    <label htmlFor="exampleInputEmail1">Name</label>
    <input
      type="text"
      className="form-control"
      id="name"
      aria-describedby="emailHelp"
      placeholder="Enter your Name"
      name='name'
      value={credentials.name}
      onChange={onHandleChange}
      required
    />
   
  </div>

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
      required
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
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input
      type="password"
      className="form-control"
      id="cpassword"
      placeholder="Password"
      name='cpassword'
      value={credentials.cpassword}
      onChange={onHandleChange}
      required
    />
  </div>
  
  
  <button type="submit" className="btn btn-primary mt-2">
   Sign
  </button>
</form>
</div>
    </>
  )
}

export default Sign
