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
import { useDispatch, useSelector } from 'react-redux' 
import {toast} from 'react-toastify'
import { register } from "../redux/features/authSlice";





export const Register = () => {
  const dispatch = useDispatch()
  const {loading, error } = useSelector((state) => ({...state.auth}))   //  useSelector(state => state.auth)  килиб езса хам ишлайди
  
  const [formValue, setFormValue] = useState({ email: "", password: "", firstName:'', lastName:'', confirmPassword:'' });
  const {firstName, lastName, email, password, confirmPassword } = formValue;

  const navigate = useNavigate()
  
  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      return toast.error('Password should match')
    }

    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({formValue, navigate, toast}))   //    Хохлаган функцияларизни redux га жунатсангиз булади уша функциялар redux да бажарилади яъни ишга тушади
    }                                                    //    Агар купрок переменный жунатмокчи булсак  {}  object ни ичига жойлаб жунатилади
                                                          //    reduxSlice  даги  login  функциясини кодлари шу ерга кушимча булиб уланади dispatch ердамида факат у бизга куринмайди
  }                                                     //    Сабаби reduxSlice  даги  login  функциясини ичидаги toast ва navigate ларни шу ерда ишлашидир

  function onInputChange(e) {
    let {name, value} = e.target                        //    e.target.name ,  e.target.value  оляпмиз
    setFormValue({...formValue, [name]:value})          //    formValue ни ичини очиб  email:email дегандай гап
  }

  useEffect(() => {
    error && toast.error(error)                     //  useEffect  error ни кузатади агар унда хатолик чикса toast ни ишга тушуради
  }, [error])                                       //    error ни кузатяпти

  return (
    <div className="loginPage">
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>

        <MDBCardBody>

          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
          <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide First Name"
              />
            </div>

            <div className="col-md-6">
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide Last Name"
              />
            </div>

            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide email"
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
                validation="Please provide password"
              />
            </div>

            <div className="col-md-12">
              <MDBInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide confirm password"
              />
            </div>

            <div className="col-12">
              <MDBBtn style={{width:'100%'}} className='mt-2'>

                {loading && (
                  <MDBSpinner size="sm" role='status' tag='span' className='me-2'/>
                )}

                  Register
              </MDBBtn>
            </div>

          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/login'>
            <p>Already have an account ?  Sign In</p>
            </Link> 
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};
