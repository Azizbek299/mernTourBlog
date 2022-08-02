import React from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTour } from "../redux/features/tourSlice";
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useEffect } from "react";




export const Header = () => {

  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('')


  const token = user?.token

  useEffect(() => {
    if(token) {
      const decodedToken = jwt_decode(token)
  
      if(decodedToken.exp * 1000 < new Date().getTime()) {    // Token ни вакти тугаб колса авто тарзда юзерни Logout килиб чикариб юборади
        dispatch(setLogout())
      }
    }
    // eslint-disable-next-line
  },[])







  function handleLogout() {
    dispatch(setLogout())
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(search) {
      dispatch(searchTour(search))
      navigate(`/tour/search?searchQuery=${search}`)
      setSearch('')
    }else{
      navigate('/')
    }
  }


  return (
    <div className="header">
      <MDBNavbar fixed="top" expand="lg" style={{ background: "#f0e6ea" }}>
        <MDBContainer
          href="/"
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
        >
          <MDBNavbarBrand>Tour App</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toogle navigation"
            onClick={() => setShow(!show)}
            style={{ color: "#606080" }}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse show={show} navbar>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                
                {user?.result?._id && (
                    <h5 className='userName'>{user?.result?.name}</h5>
                )}

              <MDBNavbarItem>
                <MDBNavbarLink href="/">
                  <p className="header-text">Home</p>
                </MDBNavbarLink>
              </MDBNavbarItem>

              {user?.result?._id && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/addTour">
                      <p className="header-text">Add Tour</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                  <MDBNavbarItem>
                    <MDBNavbarLink href="/dashboard">
                      <p className="header-text">Dashboard</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}

              {user?.result?._id? (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">
                    <p className="header-text" onClick={handleLogout}>Logout</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              ) : (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">
                    <p className="header-text">Login</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              )}
              
            </MDBNavbarNav>

                <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
                  <input type="text"
                    className='form-control'
                    placeholder="Search Tour"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                   />
                   <div style={{marginTop:'5px', marginLeft:'5px'}}>
                    <MDBIcon fas icon="search" />
                   </div>
                </form>

          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};
