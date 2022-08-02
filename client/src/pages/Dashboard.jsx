import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTourByUser, getToursByUser } from "../redux/features/tourSlice";
import { Spinner } from "../components/Spinner";
import {toast} from 'react-toastify'




export const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state.auth })); // Login булгандан кейин localStorage дан redux га келиб тушган жойдан маълумот оляпти
  const { userCreatedTours, loading } = useSelector((state) => ({
    ...state.tour,
  }));

  const userId = user?.result?._id;

  useEffect(() => {                     //  Шу сахифага утгунча ишламайди утгандан кейин ишлайди ва dispatch ни ишга туширади
    if (userId) {                       //  Ва юзерга тегишли постларни юзерни id га караб тортади
      dispatch(getToursByUser(userId));
    }
  }, [userId, dispatch]);


  const except = (str) => {
    if(str.length > 45) {                         //  Текст узунлиги 45 тадан ошса
      str = str.substring(0, 45) + ' ...'         //  Срез строки
    }
    return str
}


function handleDelete(tourId) {
  if(window.confirm('Are you sure you want to delete this tour ?')) {
    dispatch(deleteTourByUser({tourId, toast}))
  }
}


if(loading) {
  return <Spinner/>
}


  return (
    <div className="dashboard">

      {userCreatedTours.length === 0 && (
        <h3>No tour available with the user: {user?.result?.name}</h3>
      )}

      {userCreatedTours.length > 0 && (
       <>
          <h4 className="text-center">Dashboard: {user?.result?.name}</h4>
          <hr style={{maxWidth:'570px'}}/>
      </>  
      )}
   
      {userCreatedTours && userCreatedTours.map((item) => {
        return(
          <MDBCardGroup key={item._id} >
            <MDBCard style={{maxWidth:'600px'}} className='mt-2' >
              <MDBRow className='g-0' >
                <MDBCol md='4'>
                  <MDBCardImage className='rounded' src={item.imageFile} alt={item.title} fluid /> 
                </MDBCol>
                <MDBCol md='8'>
                  <MDBCardBody>
                    <MDBCardTitle className='text-start' >
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className='text-start' >
                      <small className="text-muted">
                        {except(item.description)}
                      </small>
                    </MDBCardText>
                    <div style={{marginLeft:'5px', float:'right', marginTop:'-60px'}}>

                       <MDBBtn className='mt-1' tag='a' color="none">
                        <MDBIcon fas icon="trash" style={{color:'#dd4b39'}} size='lg'  onClick={() => handleDelete(item._id)} />
                       </MDBBtn>

                       <Link to={`/editTour/${item._id}`}>
                          <MDBIcon fas icon="edit" style={{color:'#55acee', marginLeft:'10px'}} size='lg' />
                       </Link>

                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        )
      })}
    </div>
  );
};
