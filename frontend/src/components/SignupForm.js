import React, {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function SignupForm() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  })
  const [user,setUser] = useState({
    name:"",email:"",password:"",conpass:""
  })
  
  let name, value;
  const handleInputs = (event) =>{
    console.log(event);
    name = event.target.name;
    value = event.target.value;
    setUser({...user, [name]:value});
  }

  const PostData = async(e) =>{
    e.preventDefault();
    const {name,email,password,conpass} = user;
    if(password===conpass){
      const response = await fetch("/api/v1/auth/createuser", {
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name,
          email:email,
          password
        })
      });
      const data = await response.json();
      if(data.success){
        window.alert("Registration Successful");
        console.log("Registration Successful");
        navigate("/login");
      } else {
        window.alert(data.error);
        console.log(data.error);
      }
    } else {
      window.alert("Password not same");
      console.log("Password not same");
    }
    
  }

  return (
    <div>
      <div className="outer">
        <div className="innerleft">
          <h3>Already have an account?</h3>
          <h3>Login <Link to="/login">here</Link></h3>
        </div>
        <div className="mains">
          <form method="post" onSubmit={PostData}>
          <div className="sections">
              <input type="text" className="input" name="name" id="name" 
              value = {user.name}
              onChange={handleInputs}
              placeholder="Minimum 3 letters"/>
              <label htmlFor="username">NAME</label>
            </div>
            <div className="sections">
              <input type="email" className="input" name="email" id="username" 
              value = {user.email}
              onChange={handleInputs}
              placeholder="example@mail.com"/>
              <label htmlFor="username">USERNAME/E-MAIL</label>
            </div>
            <div className="sections">
              <input type="password" className="input" name="password" id="password" 
              value = {user.password}
              onChange={handleInputs}
              placeholder="********"/>
              <label htmlFor="password">PASSWORD</label>
            </div>
            <div className="sections">
              <input type="password" className="input" name="conpass" id="confpass" 
              value = {user.conpass}
              onChange={handleInputs}
              placeholder="********"/>
              <label htmlFor="confpass">CONFIRM PASSWORD</label>
            </div>
            <div className="sections">
              <button type="submit" className="button" value="signup"> SIGN UP </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
