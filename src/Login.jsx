import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate("/manage");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
      // Redirect or update UI as needed
    } catch (error) {
      console.error("Error logging in with email:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign in:", result.user);
      // Redirect or update UI as needed
    } catch (error) {
      console.error("Error logging in with Google:", error);
      alert("Google login failed: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailLogin();
  };

    return (
        <div className='bg-red-200 min-h-screen p-40'>
 

    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center text-4xl font-bold">Login</h2>
              <p className="text-white-50 mb-3 text-center italic text-xl">Please enter your login and password!</p>
              <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">


              <MDBInput
                    wrapperClass='mb-4'
                    style={{ width: '80%' }}
                    label='Email address'
                    id='formControlLg'
                    type='email'
                    className='border-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    style={{ width: '80%' }}
                    label='Password'
                    id='formControlLg'
                    type='password'
                    className='border-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <MDBCheckbox
                    name='flexCheck'
                    id='flexCheckDefault'
                    className='mb-4'
                    label='Remember password'
                  />
              <MDBBtn type="submit" size='lg' style={{ width: '80%' }} className='btn btn-disabled'>
              Login
              </MDBBtn>
              </form>


              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100 bg-pink-600 btn-ghost" size="lg" onClick={handleGoogleLogin} >
                Sign in with google
              </MDBBtn>

              

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>



            
        </div>
    );
};

export default Login;