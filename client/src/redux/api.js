import axios from 'axios'

const devEnv = process.env.NODE_ENV !== 'production'          // deploy айтида езилади
const {REACT_APP_DEV_API, REACT_APP_PROD_API} = process.env   // deploy айтида езилади


const API = axios.create({
  baseURL:`${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,  // true булса localhost да ишлайди false булса heroku серверида ишлайди
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
},
})


API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {                      //      localStorage  да маълумот булса
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token }`;
    }
    return req;
  });



export const signIn = (formData) => API.post('/users/signin', formData)   // Серверга дата жунатяпти 
                                                                          // formData бу браузердан келадиган маълумот
export const signUp = (formData) => API.post('/users/signup', formData)

export const googleSignIns = ({result}) => API.post('/users/googleSignIn', result)




export const createTour = (tourData) => API.post('/tour', tourData) 

export const getTours = (page) => API.get(`/tour?page=${page}`)

export const getTour = (id) => API.get(`/tour/${id}`)                                                             //       For Detail page

export const deleteTourByUser = (id) => API.delete(`/tour/${id}`)             //       For  Delete

export const updateTourByUser = (updatedDataTour,id) => API.patch(`/tour/${id}`, updatedDataTour)                 //       For Update

export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`)                                    //       For only Author posts page

export const getToursBySearch = (searchQuery) => API.get(`/tour/search?searchQuery=${searchQuery}`)

export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`) 

export const getRelatedTours = (tags) => API.post('/tour/relatedTours', tags)           //  getRelatedTours  яъни юзер Detail page га утиб батафсил курган барча постларни Tag ларини олиб 
                                                                                        //  Back-End га  axios оркали post килиб жунатади ва уни   Back-End да   body дан оламиз
                                                                                        //  Ва у суралган tag даги маълумотларни      await TourModel.find({tags: {$in: tags}})     килиб топиб  
                                                                                        //  Front-End га жунатамиз ,  Front-End булса келган барча маълумотларни 
                                                                                        //  redux ни  relatedTours:[]  ичида  туплайди    ва браузерда юзерга сиз кизикан нарсалар деб худди youtube ни библиотека сига ухшатиб 
                                                                                        //  маълумотларни браузерни пастги ойнасида курсатиб беради

export const likeTour = (id) => API.patch(`/tour/like/${id}`)  





