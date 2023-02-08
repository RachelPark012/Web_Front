import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import CheckForm from './CheckForm';
import Profile from './Profile';
import DepComboBox from './DepComboBox';
import NumComboBox from './NumComboBox';
import TextField from "@mui/material/TextField";
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import axios from 'axios';

function SignInOri() {
  const [id, setId] = useState('');
  const [finalId, setFinalId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [finalPassword, setFinalPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [finalName, setFinalName] = useState('');
  const [number, setNumber] = useState('');
  const [major, setMajor] = useState('');


  const handleSubmitClick = () => {
    console.log(finalId, "finalId 결과값");
    console.log(finalPassword, "finalPassword 결과값");
    console.log(userName, "userName 결과값"); //안나옴
    console.log(number, "number 결과값");  //안나옴
    console.log(major, "major");

    axios.post('http://localhost:5050/register',
      {
        id: finalId,           
        password: finalPassword,  
        name: userName,  
        classof: number,           
        dept: major,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        console.log(result);
        console.log("signupDB!");
        window.alert('회원가입이 되었습니다! 로그인 해주세요.');
        <Link to="/login"/>
      })
      .catch((error) => {
        window.alert('회원가입이 정상적으로 되지 않았습니다.');
        console.log(error);
      })
  };

  const onIdCheckClick = () => {
    
      axios.post('http://localhost:5050/checkId',
        {
          id: id 
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((result) => {
          console.log(result.data, "결과값");
          console.log(result.data.success, "LoginSuccess 결과값");
          if (result.data.success === true){
          // 성공하면
          //if(id.length < 3){
          //  window.alert("4글자 이상으로 입력해주세요!")
          //}
            window.alert("사용할 수 있는 아이디입니다.");
            setFinalId(id);
            console.log(finalId,"최종 ID입니다.");
          } else if (result.data.success === false) {
            window.alert("사용할 수 없는 아이디입니다.");
            console.log("사용할 수 없는 아이디");
            setId("");
          }
        })
        .catch((error) => {
          window.alert("아이디 등록 실패");
          console.log(error);
        })
    };
  

  const onPwCheckClick = (event) => {
    event.preventDefault();
    if(password !== confirmedPassword  && password!=="" && confirmedPassword!==""){
      alert('비밀번호가 일치하지 않습니다.');
    } else if(password===""){
      alert('비밀번호란이 공백입니다.');
    } else if(confirmedPassword===""){
      alert('비밀번호 확인란이 공백입니다.');
    }else{
      const finalPassword = confirmedPassword;
      setFinalPassword(finalPassword);
      alert('비밀번호가 일치합니다.');
    }
  }

  const onNameCheckClick = () => {

    axios.post('http://localhost:5050/checkUsername',
        {
          name: userName 
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((result) => {
          console.log(result.data, "결과값");
          console.log(result.data.success, "LoginSuccess 결과값");
          if (result.data.success === true){
          // 성공하면
          window.alert("사용할 수 있는 닉네임입니다.");
          setFinalName(userName);
          console.log(userName,"최종 닉네임입니다.");
          } else if (result.data.success === false) {
            window.alert("사용할 수 없는 닉네임입니다.");
            console.log("사용할 수 없는 닉네임");
            setId("");
          }
        })
        .catch((error) => {
          window.alert("닉네임 등록 실패");
          console.log(error);
        });
  }
  
  return (
    <>
     <Container>
        <div style={{ 
          display: 'flex', justifyContent: 'center', alignItems: 'center', 
          width: '100%', height: '5vh'
          }}>
          <form style={{ display: 'flex', flexDirection: 'column'}}>
            <h1>Sign In</h1>
            <div>
            <TextField
                required
                id="outlined-required"
                label="아이디"
                value={id}
                name={id}
                onChange={({ target: { value } }) => setId(value)}  ///아이디 중복확인 ok
                type="text"
                placeholder="아이디"
                size="small"
              />
            &nbsp; <Button variant="outlined" value={id} onClick = {onIdCheckClick}>중복 확인</Button>
            </div>
            <br/>
            <div>
            <TextField
                required
                id="outlined-required"
                label="비밀번호"
                value={password}
                name={password}
                onChange={({ target: { value } }) => setPassword(value)}
                type="password"
                placeholder="비밀번호" 
                size="small"
              />
            </div>
            <br/>
            <div>
            <TextField
                required
                id="outlined-required"
                label="비밀번호 입력확인"
                value={confirmedPassword}
                onChange={({ target: { value } }) => setConfirmedPassword(value)}    ///비밀번호 재확인 ok
                type="password"
                placeholder="비밀번호 입력확인" 
                size="small"
              />
            &nbsp; <Button variant="outlined" value={confirmedPassword} onClick = {onPwCheckClick} >일치 확인</Button>
            </div>
            <br/>
            <div>
            <TextField
                required
                id="outlined-required"
                label="닉네임"
                value={userName}
                name={userName}
                onChange={({ target: { value } }) => setUserName(value)}  ///아이디 중복확인 ok
                type="text"
                placeholder="닉네임"
                size="small"
              />
            &nbsp; <Button variant="outlined" value={userName} onClick = {onNameCheckClick}>중복 확인</Button>

            </div>
            <br/>
            <NumComboBox value={number}
              onChange={({ target: { value } }) => setNumber(value)}  //체크박스 오케이  >> 숫자만 입력 가능하게 해야 함
              />  
            <br/>
            <DepComboBox value={major}
              onChange={({ target: { value } }) => setMajor(value)} />
            <br/>
            <Button variant="contained" onClick={handleSubmitClick}>Sign In</Button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default SignInOri;