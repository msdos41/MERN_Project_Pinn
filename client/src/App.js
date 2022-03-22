import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("jwttest"));
  console.log("current user:",user);
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Navigate to='/posts' replace />}></Route>
          <Route path='/posts' exact element={<Home />}></Route>
          <Route path='/posts/search' exact element={<Home />}></Route>
          <Route path='/posts/:id' element={<PostDetails />}></Route>
          <Route path='/auth' exact element={!user ? <Auth /> : <Navigate to='/posts' />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
