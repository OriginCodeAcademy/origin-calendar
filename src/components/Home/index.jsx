import React from 'react';
import SignIn from '../SignIn'

const Home = (props) => (
  <div className="home">
    <video poster="" playsinline="" autoplay="" muted="" loop="true">
          <source src="https://www.origincodeacademy.com/wp-content/uploads/2017/09/typing-of-codes-2833-1.mp4" type="video/mp4" />
      </video>
      <h1 className="title">Welcome</h1>
        <SignIn save={props.save}/>
  </div>
);

export default Home;
