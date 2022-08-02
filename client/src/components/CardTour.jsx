import React from 'react'
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup, MDBBtn, MDBIcon, MDBTooltip} from 'mdb-react-ui-kit'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeTourSlice } from '../redux/features/tourSlice'





export const CardTour = (props) => {
    const {user} = useSelector((state) => ({...state.auth}))
    const dispatch = useDispatch()

    const userId = user?.result?._id || user?.result?.googleId


    const except = (str) => {
          if(str.length > 45) {                         //  Текст узунлиги 45 тадан ошса
            str = str.substring(0, 45) + ' ...'         //  Срез строки
          }
          return str
    }

    const Likes = () => {
        if (props.likes.length > 0) {
          return props.likes.find((like) => like === userId) ? (
            <>
              <MDBIcon fas icon="thumbs-up" />
              &nbsp;
              {props.likes.length > 2 ? (
                <MDBTooltip
                  tag="a"
                  title={`You and ${props.likes.length - 1} other people likes`}  
                >                                                                     {/* Браузерда шу like белгисини устига олиб борса  You and ${props.likes.length - 1} other people likes  шу езув куринади*/ }
                  {props.likes.length} Likes
                </MDBTooltip>
              ) : (
                `${props.likes.length} Like${props.likes.length > 1 ? "s" : ""}`
              )}
            </>
          ) : (
            <>
              <MDBIcon far icon="thumbs-up" />
              &nbsp;{props.likes.length} {props.likes.length === 1 ? "Like" : "Likes"}
            </>
          );
        }
        return (
          <>
            <MDBIcon far icon="thumbs-up" />
            &nbsp;Like
          </>
        );
      };


    function handleLike() {
        dispatch(likeTourSlice({_id:props._id}))
    }

  return (
    <MDBCardGroup>
        <MDBCard className='h-100 mt-2 d-sm-flex' style={{maxWidth:'25rem'}}>
            <MDBCardImage
                src={props.imageFile}
                alt={props.title}
                position='top'
                style={{maxWidth:'100%', height:'180px'}}
            />
                <div className="top-left">{props.name}</div>
                <span className="text-start tag-card">
                    {props.tags.map((tag, index) => {
                        return(
                            <Link to={`/tour/tag/${tag}`} key={index}> # {tag}</Link>                            
                        )
                    })}

                    <MDBBtn style={{float:'right'}} tag='a' color='none' onClick={!user?.result ? null : handleLike}>
                        
                        {!user?.result ? (
                          <MDBTooltip title='Please login to like tour'  tag='p'>
                              <Likes/>
                          </MDBTooltip>                          
                        ) : (
                          <Likes/>
                        )}
                        
                      
                    </MDBBtn>
                </span>
                
                <MDBCardBody>
                    <MDBCardTitle className='text-start'>
                        {props.title}
                    </MDBCardTitle>
                    <MDBCardText className='text-start'>
                        {except(props.description)}
                        <Link to={`/tour/${props._id}`}>
                            Read More 
                        </Link> 
                    </MDBCardText>
                </MDBCardBody>
        </MDBCard>
    </MDBCardGroup>
  )
}
