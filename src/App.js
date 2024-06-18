import logo from "./logo.svg";
import "./App.css";
import {
  AddStudent,
  LandingPage,
  MainPage,
  StudentList,
  Login,
  Map,
  Register,
  StudentDashboard,
  Class,
  TeacherDashboard,
  ClassDetail,
  CourseRegister,
  StudentDetail,
  ClassGrade,
  StudentGrade
} from "./pages";
import { Navigation } from "./components";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <div className="fixed top-0 z-10 w-full">
          <Navigation />
        </div> */}
        <div className=" dark:bg-main-dark-bg">
          <Routes>
            <Route index element={ <Login />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/addstudent" element={<AddStudent />} />
            <Route path="/map" element={<Map/>} />
            <Route path="/studentlist" element={<StudentList/>}/>
            <Route path="/landingpage" element={<LandingPage/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/student" element={<StudentDashboard/>}/>
            <Route path="/teacher" element={<TeacherDashboard/>}/>
            <Route path="/class" element={<Class/>}/>
            <Route path="/courseregister" element={<CourseRegister/>}/>
            <Route path="/studentdetail/:student_id" element={<StudentDetail/>}/>
            <Route path="/classdetail/:id" element={<ClassDetail />} />
            <Route path="/classgrade/:id" element={<ClassGrade/>} />
            <Route path="/studentgrade/:id" element={<StudentGrade/>} />
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
