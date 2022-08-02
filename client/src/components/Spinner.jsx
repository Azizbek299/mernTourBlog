import { MDBSpinner } from "mdb-react-ui-kit";
import React from "react";

export const Spinner = () => {
  return (
    <div
      style={{
        margin: "100px",
        textAlign: "center",
      }}
    >
      <MDBSpinner color="primary" className='me-2' style={{width:'3rem', height:'3rem'}}>
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};
