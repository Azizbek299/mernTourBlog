import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import Filebase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux' 
import { createTour, updateTourByUser } from "../redux/features/tourSlice";
import { Spinner } from "../components/Spinner";



const initialState = {
  title: "",
  description: "",
  tags: [],
};




export const AddEditTour = () => {

  const {error, loading, userCreatedTours} = useSelector((state) => ({...state.tour}))
  const {user} = useSelector((state) => ({...state.auth}))

  const [tourData, setTourData] = useState(initialState);
  const [tagErrorMsg, setTagErrorMsg] = useState(null)


  const { title, description, tags } = tourData;


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {id} = useParams()        //  Браузерни url сидан олинган id


  useEffect(() => {
    if(id) {
      const whichSinglTourShouldBeUpdated = userCreatedTours.find((tour) => tour._id === id)  //  redux ни ичидан маълумотни излаб топяпмиз
      setTourData({...whichSinglTourShouldBeUpdated})   //  state ни ичидан излаб топилган маълумотни чачиб битта битта setTourData ни ичига жойлаяпмиз 
    }                                                   //  Бунинг натижасида Браузерда барча поляларни value си узгартирилиши керак булган дата билан тулиб колади
    
  },[id, userCreatedTours])

 
  useEffect(() => {
    error && toast.error(error)
  },[error])



 

  function onInputChange(e) {
    const {name, value} = e.target
    setTourData({...tourData, [name]: value})
  }


  function handleAddTag(tag) {
    setTagErrorMsg(null)
    setTourData({...tourData, tags:[...tourData.tags, tag]})    //  Эски tag ларни учириб юбормасдан янгисини кушиб куяди
  }

  function handleDeleteTag(deleteTag) {
    setTourData({...tourData, tags: tourData.tags.filter((tag) => tag !== deleteTag)})   //  deleteTag  дан бошка барчасини хотирада саклаб колади

  }

  function handleClear() {
    setTourData({title:'', description:'', tags:[]})
  }



  function handleSubmit(e) {
    e.preventDefault()

    if (!tags.length) {                            // Submit дан олдин поля тулдирилганми текширади , тулдирилмаган булса браузерда огохлантиради
      setTagErrorMsg('Please provide some tags')
    }

    if (title && description && tags) {
      const postedTourData = {...tourData, name:user?.result?.name}  //  Расм пастда  tourData ни ичига куйилган 
  
      if(!id) {
        dispatch(createTour({postedTourData, navigate, toast}))       //  Браузердан id келмаса createTour ишга тушиб янги пост тузамиз
      }else{
        dispatch(updateTourByUser({tourId:id, updatedDataTour:postedTourData, navigate, toast}))  //  Браузердан id келса updateTourByUser ишга тушиб  постни update киламиз
      }
      handleClear()
    }
   
}


if(loading) {
  return <Spinner/>
}


  return (
    <div className="container addTour">
      <MDBCard alignment="center">

        
        <h5>{ id ? 'Update Tour' : 'Add Tour' }</h5>
          
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
            <div className="col-md-12">
              <MDBInput
                className="form-control"
                type="text"
                placeholder="Enter Title"
                name="title"
                value={title}
                onChange={onInputChange}
                required
                invalid
                validation="Please provide title"
              />
            </div>

            <div className="col-md-12">
              <MDBInput
                className="form-control"
                type="text"
                placeholder="Enter Description"
                name="description"
                value={description}
                onChange={onInputChange}
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              />
            </div>
            
            
      
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>

            {tagErrorMsg && <div className='tagErrMsg'>{tagErrorMsg}</div>}   { /* tags полясини тулдирмасангиз шу ерда огохлантириш езуви куринади  */}

            <div className="d-flex justify-content-start">
              <Filebase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })  //  Расм шу ерда авто тарзда useState ни ичига куйилади
                }
              />
            </div>

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}> {id ? 'Update' : 'Submit'} </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};
