import React from 'react';
import { Link } from 'react-router-dom';
import './IndexComponent.css';

function IndexComponent() {
    return (
      <div className="index-container">
        <h2>Hello from IndexComponent test1 !</h2>
        <Link to="/login">
          <button className="login-button">Go to Login</button>
        </Link>
      </div>
    );
  }

export default IndexComponent;
