import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setcredentials] = useState({
        name:"", email : "", password: ""
    });

    let navigate = useNavigate();

const handleSubmit= async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         },
         body: JSON.stringify({name: credentials.name, email: credentials.email, password:credentials.password}),
      }); 
      const json = await response.json();
      console.log(json);
      if(json.success){
        //Save the authtoken to local browser storage and redirect
        localStorage.setItem('token', json.authtoken);
        navigate('/login');
        props.showAlert("Account Created Successfully", "success");

      }else{
        props.showAlert("Invalid Credentials", "danger");
      }
}

const onChange=(e)=>{
    //State: {description: "", tag: "", title: ""}
    setcredentials({...credentials, [e.target.name]: e.target.value});
  }
  
  return (
    <div className='container mt-3'>
        <h2>Create a new iNotebook Account</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="name" className="form-control" id="name" name="name" onChange={onChange} required aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange}  minLength={5} required aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} minLength={5}  required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup;