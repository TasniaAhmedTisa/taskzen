import React from 'react';
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
const Login = () => {
    return (
        <div className='bg-red-200 min-h-screen p-40'>
 

    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center text-4xl font-bold">Login</h2>
              <p className="text-white-50 mb-3 text-center italic text-xl">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4' style={{ width: '80%' }} label='Email address' id='formControlLg' type='email' className='border-2'/>
              <MDBInput wrapperClass='mb-4' style={{ width: '80%' }} label='Password' id='formControlLg' type='password' className='border-2'/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn size='lg'>
                Login
              </MDBBtn>

              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100 bg-pink-600 btn-ghost" size="lg" >
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