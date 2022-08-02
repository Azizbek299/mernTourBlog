import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Header } from "./components/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import { AddEditTour } from "./pages/AddEditTour";
import { DetailTour } from "./pages/DetailTour";
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";   // component ни ичида PrivateRoute юзер логин булган булса керакли сахифага утказади булмаса Login сахифага утказади
import { NotFound } from "./pages/NotFound";
import { TagTours } from "./pages/TagTours";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user)); //  Хар доим localStorage ни текшириб туриб redux га урнатиб куяди
  }, [user, dispatch]); //  Браузер обновить булса хам зиени йук

  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour/search" element={<Home />} />    {/*  navigate(`/tour/search?searchQuery=${search}`)   <Route path='' /> га сурок белгисидан кейин у егини езмаса хам булади */}
        <Route path='/tour/tag/:tag' element={<TagTours/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/addTour"
          element={
            <PrivateRoute>          {/* PrivateRoute  факат рухсат берилган яъни логин еки регистрациядан утган юзерлар учун */}
              <AddEditTour />
            </PrivateRoute>
          }
        />

        <Route
          path="/editTour/:id"
          element={
            <PrivateRoute>
              <AddEditTour />
            </PrivateRoute>
          }
        />
        <Route path="/tour/:id" element={<DetailTour />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound/>}/>
      </Routes>

      
    </div>
  );
}

export default App;
