import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";



export const login = createAsyncThunk(                           //  2)   Иккинчи булиб шу кодни тузамиз
  "auth/login",
  async ({ formValue, navigate, toast }, thunkAPI) => {
    try {

      const response = await api.signIn(formValue);
      toast.success("Login Successfully");
      navigate("/");
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const register = createAsyncThunk(                           //  3)   Иккинчи булиб шу кодни тузамиз
  "auth/register",
  async ({ formValue, navigate, toast }, thunkAPI) => {
    try {

      const response = await api.signUp(formValue);
      toast.success("Register Successfully");
      navigate("/");
      return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const googleSignIn = createAsyncThunk(                           //  4)   Иккинчи булиб шу кодни тузамиз
  "auth/googleSignIn",
  async ({result,navigate, toast}, thunkAPI) => {

    try {
     
      const response = await api.googleSignIns({result});
      toast.success("Google Sign In Successfully");
      navigate("/");
      //console.log('response.data', response.data) 
      return response.data
    

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const authSlice = createSlice({                             //  1)   Биринчи булиб шу кодни тузамиз
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },

    setLogout: (state, action) => {
      localStorage.removeItem('profile')
      state.user = null
    }
  },

  extraReducers: {                                           //  3)   Учинчи булиб шу кодни тузамиз
    [login.pending]: (state, action) => {
      state.loading = true;
    },

    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify({...action.payload}))
      state.user = action.payload;
    },

    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
    },


    [register.pending]: (state, action) => {
        state.loading = true;
      },
  
    [register.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem('profile', JSON.stringify({...action.payload}))
        state.user = action.payload;
      },
  
    [register.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
      },


    [googleSignIn.pending]: (state, action) => {
        state.loading = true;
      },
  
    [googleSignIn.fulfilled]: (state, action) => {
        state.loading = false; 
        localStorage.setItem('profile', JSON.stringify({...action.payload}))
        state.user = action.payload;
      },
  
    [googleSignIn.rejected]: (state, action) => {
        state.loading = false;
        console.log('reject',action.payload) 
        state.error = action.payload.message;         //      message  бу сервердан келадиган переменный номи
      },
  },
});


export const {setUser, setLogout} = authSlice.actions
export default authSlice.reducer;





