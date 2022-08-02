import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export const RelatedTour = ({ relatedTours, tourId }) => {
  const except = (str) => {
    if (str.length > 45) {
      //  Текст узунлиги 45 тадан ошса
      str = str.substring(0, 45) + " ..."; //  Срез строки
    }
    return str;
  };

  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
        {relatedTours.length > 1 && <h4 className='relatedTour'>Related Tours</h4>}

        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        {relatedTours.filter((item) => item._id !== tourId).splice(0, 3).map((item, index) => (
            <MDBCol key={index}>
                <MDBCard>
                    <Link to={`/tour/${item._id}`}>
                        <MDBCardImage 
                            src={item.imageFile}
                            alt={item.title}
                            position='top'
                        />    
                    </Link> 
                    <span className="text-start tag-card">
                        {item.tags.map((tag, index) => (
                            <Link to={`/tour/tag/${tag}`} key={index}># {tag}</Link> 
                        ))}
                    </span>
                    <MDBCardBody>
                        <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
                        <MDBCardText className='text-start'>{except(item.description)}</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        ))}
        </MDBRow>
                   
        </>
      )}
    </>
  );
};
