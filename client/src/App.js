import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor/ApplyDoctor";
import Notification from "./pages/Notification/Notification";
import Users from "./pages/Admin/Users/Users";
import Doctors from "./pages/Admin/Doctors/Doctors";
import Profile from "./pages/DoctorProfile/Profile";
import BookingPage from "./pages/BookingPage/BookingPage";
function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>

          <Route 
          path="/" 
          element={
            <ProtectedRoute>
                 <HomePage />
            </ProtectedRoute>
          } />

        <Route 
          path="/apply-doctor" 
          element={
            <ProtectedRoute>
                 <ApplyDoctor/>
            </ProtectedRoute>
          } />

        <Route 
          path="/doctor/book-appointment/:doctorId" 
          element={
            <ProtectedRoute>
                 <BookingPage/>
            </ProtectedRoute>
          } />

        <Route 
          path="/doctor/profile/:id" 
          element={
            <ProtectedRoute>
                 <Profile/>
            </ProtectedRoute>
          } />

      <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute>
                 <Users/>
            </ProtectedRoute>
          } />
         

         <Route 
          path="/admin/doctors" 
          element={
            <ProtectedRoute>
                 <Doctors/>
            </ProtectedRoute>
          } />

         <Route 
          path="/notification" 
          element={
            <ProtectedRoute>
                 <Notification/>
            </ProtectedRoute>
          } />


          <Route 
          path="/login" 
          element={
            <PublicRoute>
                  <Login />
            </PublicRoute>
          } />


          <Route 
          path="/register" 
          element={
          <PublicRoute>
              <Register />
          </PublicRoute>
          } />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
