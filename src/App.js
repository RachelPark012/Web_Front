import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import full from "./images/full.jpg"; //<img src={ full } width="100%" /> nav바 아래에 넣으면 되는데 레이아웃이 깨짐
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LoginForm from './pages/LoginForm';
//import LogoutButton from './pages/LogoutButton';
import Profile from './pages/Profile';
import NavBar from './pages/NavBar';
import SideBar from './pages/SideBar';
import Quals from './pages/Quals';
import Questions from './pages/Questions';
import Voc from './pages/VocQuals/Voc';
import VocView from './pages/VocQuals/VocView';
import Reviews from './pages/Reviews';
import VocQuestion from './pages/VocQuals/VocQuestion';
import Voc2 from './pages/VocReview/Voc2';
import VocView2 from './pages/VocReview/VocView2';
import VocQuestion2 from './pages/VocReview/VocQuestion2';
import Voc3 from './pages/VocQuestions/Voc3';
import VocView3 from './pages/VocQuestions/VocView3';
import VocQuestion3 from './pages/VocQuestions/VocQuestions3';
import axios from 'axios';
import SingIn from './pages/SignIn';


function App() {
  //유저 로그인 상태관리
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:5050/auth').then((response)=> {  
      setUser(response.data.name);  //user값이 있으면
      setIsLogin(true);  //token 값이 있으면
      //console.log(response.data.token, "home user 토큰 값");
      //console.log(response.data.name, "home user 닉네임 값");
    })
  }, []);

  const [userId, setUserId] = useState(null);
  
  const logout = () => setIsLogin(false);

  

  return (
    <>
    <Router>
      <header>
        {<NavBar isLogin={isLogin} />}
        <img src={ full } width="100%"/> 
      </header>                               
      <hr />
        <aside >
          <SideBar/> 
        </aside>
        <main >
          <Routes>
            <Route exact path="*" element={<Home/>} />
            <Route
              path="/login"
              element = {<LoginForm isLogin={isLogin} />
              }
            />
            <Route
              path="/profile"
              element={<Profile isLogin={isLogin} userId={userId}/>}
            />
            <Route path="/signin" element={<SingIn/>} />
            <Route element={NotFound} />
            <Route path="/quals" element={<Quals/>} />
            <Route path="/questions" element={<Questions/>} />
            <Route path="/reviews" element={<Reviews/>} />
            <Route path='/voc' element={<Voc />} />  
            <Route path='/voc/:vocId' element={<VocView />}  />
            <Route path='/voc/question' element={<VocQuestion />}  />
            <Route path='/voc2' element={<Voc2 />} /> 
            <Route path='/voc2/question2' element={<VocQuestion2 />}  />
            <Route path='/voc2/:vocId' element={<VocView2 />}  />
            <Route path='/voc3' element={<Voc3 />} /> 
            <Route path='/voc3/question3' element={<VocQuestion3 />}  />
            <Route path='/voc3/:vocId' element={<VocView3 />}  />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
