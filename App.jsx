import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Learn from './Learn.jsx';
import Play from './Play.jsx';
import Impact from './Impact.jsx';
import Dashboard from './Dashboard.jsx';
import TeacherLogin from './TeacherLogin.jsx';
import StudentLogin from './StudentLogin.jsx';
import Feedback from './Feedback.jsx';

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/learn" element={<Learn/>} />
        <Route path="/play" element={<Play/>} />
        <Route path="/impact" element={<Impact/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/teacher-login" element={<TeacherLogin/>} />
        <Route path="/student-login" element={<StudentLogin/>} />
      </Routes>
    </Layout>
  );
}
