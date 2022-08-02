import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";



export const createTour = createAsyncThunk(                           //  2)   Иккинчи булиб шу кодни тузамиз
  "tour/createTour",
  async ({ postedTourData, navigate, toast }, thunkAPI) => {
    try {

      const response = await api.createTour(postedTourData);
      toast.success("Tour Added Successfully");
      navigate("/");
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const getTours = createAsyncThunk(                           //  Барчани юзерларни постларини курсатади
  "tour/getTours",                                                         
  async (page, thunkAPI) => {
    try {
      const response = await api.getTours(page);
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getTour = createAsyncThunk(                           //       For Detail page
  "tour/getTour",                                                  
  async (id, thunkAPI) => {
    try {
      const response = await api.getTour(id);
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getToursByUser = createAsyncThunk(                           //  2)   Иккинчи булиб шу кодни тузамиз
  "tour/getToursByUser",                                                  //       Факат пост килган юзерни шахсий постлари чикади
  async (userId, thunkAPI) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const deleteTourByUser = createAsyncThunk(                          //       Факат пост килган юзер узини шахсий постлари учира олади
  "tour/deleteTourByUser",                                                  
  async ({tourId, toast}, thunkAPI) => {
    try {
      const response = await api.deleteTourByUser(tourId);
      toast.success('Tour Deleted Successfully')
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);




export const updateTourByUser = createAsyncThunk(                          //       Факат пост килган юзер узини шахсий постлари update кила олади
  "tour/updateTourByUser",                                                  
  async ({updatedDataTour, tourId, toast, navigate}, thunkAPI) => {
    try {
      const response = await api.updateTourByUser(updatedDataTour, tourId);
      toast.success('Tour Updated Successfully')
      navigate('/')
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const searchTour = createAsyncThunk(                          //       Факат пост килган юзер узини шахсий постлари update кила олади
  "tour/searchTour",                                                  
  async (searchQuery, thunkAPI) => {
    try {
      const response = await api.getToursBySearch(searchQuery);
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const getToursByTag = createAsyncThunk(                          //       Факат пост килган юзер узини шахсий постлари update кила олади
  "tour/getToursByTag",                                                  
  async (tag, thunkAPI) => {
    try {
      const response = await api.getTagTours(tag);
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

                                                                                      //  getRelatedToursInSlice  яъни юзер Detail page га утиб батафсил курган барча постларни Tag ларини олиб 
                                                                                      //  Back-End га  axios оркали post килиб жунатади ва уни   Back-End да   body дан оламиз
                                                                                      //  Ва у суралган tag даги маълумотларни      await TourModel.find({tags: {$in: tags}})     килиб топиб  
                                                                                      //  Front-End га жунатамиз ,  Front-End булса келган барча маълумотларни 
                                                                                      //  redux ни  relatedTours:[]  ичида  туплайди    ва браузерда юзерга сиз кизикан нарсалар деб худди youtube ни библиотека сига ухшатиб 
                                                                                      //  маълумотларни браузерни пастги ойнасида курсатиб беради

export const getRelatedToursInSlice = createAsyncThunk(                          
  "tour/getRelatedToursInSlice",                                                  
  async (tags, thunkAPI) => {
    try {
      const response = await api.getRelatedTours(tags);
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const likeTourSlice = createAsyncThunk(                           //       For Tour like 
  "tour/likeTourSlice",                                                  
  async ({_id}, thunkAPI) => {
    try {
      const response = await api.likeTour(_id);
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);




const tourSlice = createSlice({                             //  1)   Биринчи булиб шу кодни тузамиз
  name: "tour",
  initialState: {
    tour: {},                                         //    Detail page  тегишла
    tours:[],                                         //    Барча общий дата базадан келадиган постлар
    userCreatedTours:[],                              //    Факат юзерни узи тузган постлар учун
    tagTours:[],                                      //    Tagлари бир хил булган постлар учун
    relatedTours:[],                                  //    Юзер курган историядаги постлар учун ,  
                                                      //    яъни юзер Detail page га утиб батафсил курган барча постлари 
    currentPage:1,
    
    numberOfPages:null,                               //     		numberOfPages  Нечта сахифа борлигини курсатади  
                                                      //    		Мисол: 18 та булса  limit = 6  ( 18 / 6 ) = 3  та сахифа ,  
                                                      //  		  Хар бир сахифада 6 тадан пост                               
    error: "",
    loading: false,
  },

  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  },

  extraReducers: {                                           //  3)   Учинчи булиб шу кодни тузамиз
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },

    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload]
    },

    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },




    [getTours.pending]: (state, action) => {
      state.loading = true;
    },

    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload.data
      state.numberOfPages = action.payload.numberOfPages
      state.currentPage = action.payload.currentPage
    },

    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },




    [getTour.pending]: (state, action) => {
      state.loading = true;
    },

    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload
    },

    [getTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },




    [getToursByUser.pending]: (state, action) => {
      state.loading = true;
    },

    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userCreatedTours = action.payload
    },

    [getToursByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },




    [deleteTourByUser.pending]: (state, action) => {
      state.loading = true;
    },

    [deleteTourByUser.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log('action', action)
      const {arg: {tourId}} = action.meta   // tour ни id сини шу ердан оламиз
      if(tourId) {
        state.userCreatedTours = state.userCreatedTours.filter((item) => item._id !== tourId)
        state.tours = state.tours.filter((item) => item._id !== tourId)
      } 
    },

    [deleteTourByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },




    [updateTourByUser.pending]: (state, action) => {
      state.loading = true;
    },

    [updateTourByUser.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log('action', action)
      const {arg: {tourId}} = action.meta   // tour ни id сини шу ердан оламиз
      if(tourId) {
        state.userCreatedTours = state.userCreatedTours.map((item) => item._id === tourId ? action.payload : item)   //  Янги дата сервердан келса state га урнатамиз агар келмаса эскисини кайтадан урнатамиз
        state.tours = state.tours.map((item) => item._id === tourId ? action.payload : item )
      } 
    },

    [updateTourByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },



    [searchTour.pending]: (state, action) => {   
      state.loading = true;
    },

    [searchTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload
    },

    [searchTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },



    [getToursByTag.pending]: (state, action) => {   
      state.loading = true;
    },

    [getToursByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagTours = action.payload
    },

    [getToursByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },



    [getRelatedToursInSlice.pending]: (state, action) => {   
      state.loading = true;
    },

    [getRelatedToursInSlice.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload
    },

    [getRelatedToursInSlice.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;                     //      message  бу сервердан келадиган переменный номи
    },



    [likeTourSlice.pending]: (state, action) => {},

    [likeTourSlice.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log('action', action)
      const {arg: {_id}} = action.meta   // tour ни id сини шу ердан оламиз
      if(_id) {        
        state.tours = state.tours.map((item) => item._id === _id ? action.payload : item )
      } 
    },

    [likeTourSlice.rejected]: (state, action) => {    
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },

  },
});

export const {setCurrentPage} = tourSlice.actions
export default tourSlice.reducer;
