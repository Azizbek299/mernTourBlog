import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export const LoadingToRedirect = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()

    useEffect(() => {

        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)   //  5 - 1    Хар секунд бир дан айриб туриб setCount килиб ичидаги маълумотни камайтириб боради
        }, 1000)

        count === 0 && navigate('/login')               //  Ва  count 0 га тенг булиб колса  login сахифага утказиб юборади

        return() => clearInterval(interval)             //    Буни езмаса setInterval тухтамайди     return ни езишдан максад ушбу сахифадан чикиб 
                                                                                                //   кетаетганизда унга бириктирилган функция ишлайди

    },[count, navigate])


  return ( 
    <div style={{marginTop:'100px', textAlign:'center'}}>
        <h5>Redirecting you in {count} seconds</h5>
    </div>
  )
}



