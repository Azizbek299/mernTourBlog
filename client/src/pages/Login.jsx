import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBInput,
  MDBCardFooter,
  MDBBtn,
  MDBSpinner,
  MDBValidation,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, googleSignIn } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';



export const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => ({ ...state.auth })); //  useSelector(state => state.auth)  килиб езса хам ишлайди

  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const { email, password } = formValue;

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));    //    Хохлаган функцияларизни redux га жунатсангиз булади уша функциялар redux да бажарилади яъни ишга тушади
    }                                                     //    Агар купрок переменный жунатмокчи булсак  {}  object ни ичига жойлаб жунатилади
                                                          //    reduxSlice  даги  login  функциясини кодлари шу ерга кушимча булиб уланади dispatch ердамида факат у бизга куринмайди
  }                                                       //    Сабаби reduxSlice  даги  login  функциясини ичидаги toast ва navigate ларни шу ерда ишлашидир

  function onInputChange(e) {
    let { name, value } = e.target;                       //    e.target.name ,  e.target.value  оляпмиз
    setFormValue({ ...formValue, [name]: value });        //    formValue ни ичини очиб  email:email дегандай гап
  }

  useEffect(() => {
    error && toast.error(error);                          //  useEffect  error ни кузатади агар унда хатолик чикса toast ни ишга тушуради
  }, [error]);                                            //    error ни кузатяпти


function googleSuccess(response) {                        //    response  GoogleLogin дан келяпти
   const email = response?.profileObj?.email              //    Сурок белгиси агар ичида маълумот булса дегани , агар йук булса хатолик бермайди
   const name = response?.profileObj?.name 
   const token = response?.tokenId
   const googleId = response?.googleId
   const result = {email, name, token, googleId}
   dispatch(googleSignIn({result,navigate, toast}))
}

function googleFailure(error) {
  toast.error(error)
}

                            

useEffect(() => {             //    Бу булмаса  GoogleLogin  ишламайди
  function start() {
    gapi.auth2.init({
       clientId: process.env.REACT_APP_CLIENT_ID_GOOGLE, 
       scope: '' });
  }
  
  gapi.load('client:auth2', start)
}, []);



  return (
    <div className="loginPage">
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>

        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>

            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your password"
              />
            </div>

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />

          <GoogleLogin
            //clientId="1242354368582-d4363463460qg5011ve8c8436346.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>

                  <MDBIcon className='me-2' fab icon='google'/>
                  Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};
