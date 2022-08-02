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
  MDBCardGroup,
} from "mdb-react-ui-kit";
import {useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getToursByTag } from "../redux/features/tourSlice";
import { Spinner } from "../components/Spinner";



export const TagTours = () => {
    const {tagTours, loading} = useSelector((state) => ({...state.tour}))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {tag} = useParams()

    useEffect(() => {
        if(tag) {
            dispatch(getToursByTag(tag))
        }
        // eslint-disable-next-line
    },[])


    const except = (str) => {
        if(str.length > 45) {                         //  Текст узунлиги 45 тадан ошса
          str = str.substring(0, 45) + ' ...'         //  Срез строки
        }
        return str
  }


    if(loading) {
        <Spinner/>
    }

  return <div className='tagTours'>
    <h3 className='text-center'>Tours with tag:  {tag}</h3>
    <hr style={{maxWidth:'570px'}} />
    {tagTours && tagTours.map((item) => {
        return(
            <MDBCardGroup key={item._id}>
                <MDBCard style={{maxWidth:'600px'}} className='mt-2' >
                    <MDBRow className='g-0' >
                        <MDBCol md="4" >
                            <MDBCardImage  className='rounded' src={item.imageFile} alt={item.title} fluid />
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBCardBody>
                                <MDBCardTitle className='text-start' >
                                    {item.title}
                                </MDBCardTitle>
                                <MDBCardText className='text-start' >
                                    {except(item.description)}
                                    <>
                                        <MDBBtn style={{marginTop:'10px'}} size="sm" rounded color="info" onClick={() => navigate(`/tour/${item._id}`)} >
                                            Read More
                                        </MDBBtn>
                                    </>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBCardGroup>
        )
    })}
  </div>;
};
