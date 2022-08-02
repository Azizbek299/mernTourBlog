import React, { useEffect } from 'react'
import {MDBCol, MDBContainer, MDBRow, MDBTypography} from 'mdb-react-ui-kit'
import {useDispatch, useSelector} from 'react-redux'
import { getTours, setCurrentPage } from '../redux/features/tourSlice'
import { CardTour } from '../components/CardTour'
import { Spinner } from '../components/Spinner'
import Pagination from '../components/Pagination'
import {useLocation} from 'react-router-dom'



function useQuery() {                               //  Агар биз браузерда search килиб бирор нарса излаганимизда
  return new URLSearchParams(useLocation().search)  //  у маълумот булмаса 
}



export const Home = () => {
  const {tours, loading, currentPage, numberOfPages} = useSelector((state) => ({...state.tour}))
  const dispatch = useDispatch()
  const location = useLocation()


  const query = useQuery()                       //  code for search
  const searchQuery = query.get('searchQuery')   //  code for search
  


  useEffect(() => {
    dispatch(getTours(currentPage))
  },[currentPage, dispatch])

  
  if(loading) {
    return <Spinner/>
  }



  return (
    <div className='home'>

      <MDBRow className='mt-5'>
          {tours.length === 0 && location.pathname === '/' && (
            <MDBTypography className='text-center mb-0' tag='h2'>
              No Tour Found
            </MDBTypography>
          )}

          {/* Пастдаги кодда биз home сахифасида булмасак демак search сахифасидамиз */}
          {tours.length === 0 && location.pathname !== '/' && (
            <MDBTypography className='text-center mb-0' tag='h2'>
              We couldn't find any matches for   "{searchQuery}"
            </MDBTypography>
          )}

          <MDBCol>
            <MDBContainer>
              <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
                {tours && tours.map((item, index) => {
                  return(
                    <CardTour  key={index} {...item}/>
                  )
                })}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
      </MDBRow>

      {tours.length > 0 && (

      <Pagination 
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        dispatch={dispatch}  
      />

      )}                

    </div>
  )
} 
