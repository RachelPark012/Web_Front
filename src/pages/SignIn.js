import React, { useState, useCallback } from 'react';
import { Route, Link } from 'react-router-dom';
import CheckForm from './CheckForm';
import Profile from './Profile';
import DepComboBox from './DepComboBox';
import NumComboBox from './NumComboBox';
import TextField from "@mui/material/TextField";
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import axios from 'axios';

function SignIn() {
  //이름, 비밀번호, 비밀번호 확인, 닉네임, 학번, 전공
  const [id, setId] = useState('');
  const [finalId, setFinalId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [finalPassword, setFinalPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [finalName, setFinalName] = useState('');
  const [number, setNumber] = useState('');
  const [major, setMajor] = useState('');

  //오류메시지 상태저장
  const [IdMessage, setIdMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
  const [userNameMessage, setUserNameMessage] = useState('')

  // 유효성 검사
  const [isId, setIsId] = useState(false)
  const [isFinalId, setIsFianlId] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
  const [isUserName, setIsUserName] = useState(false)
  const [isFinalUserName, setIsFianlUserName] = useState(false)


  const handleSubmitClick = () => {
    console.log(finalId, "finalId 결과값");
    console.log(finalPassword, "finalPassword 결과값");
    console.log(userName, "userName 결과값"); 
    console.log(number, "number 결과값");  //안나옴
    console.log(major, "major"); //안나옴

    axios.post('http://localhost:5050/register',
      {
        id: finalId,           
        password: finalPassword,  
        name: finalName,  
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
        window.location.replace("/login"); 
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
            window.alert("사용할 수 있는 아이디입니다.");
            setIsFianlId(true)
            setFinalId(id);
            console.log(finalId,"최종 ID입니다.");
          } else if (result.data.success === false) {
            window.alert("사용할 수 없는 아이디입니다.");
            console.log("사용할 수 없는 아이디");
          }
        })
        .catch((error) => {
          window.alert("아이디 등록 실패");
          console.log(error);
        })
    };

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
          window.alert("사용할 수 있는 닉네임입니다.");
          setIsFianlUserName(true)
          setFinalName(userName);
          console.log(userName,"최종 닉네임입니다.");
          } else if (result.data.success === false) {
            window.alert("사용할 수 없는 닉네임입니다.");
            console.log("사용할 수 없는 닉네임");
          }
        })
        .catch((error) => {
          window.alert("사용할 수 없는 닉네임입니다.");
          console.log(error);
        });
  }

  // 아이디
  const onChangeId = useCallback((e) => {
    const idRegex = /^[A-Za-z0-9_]{3,}$/  
    setId(e.target.value)
    console.log(id);
    if (!idRegex.test(e.target.value)) {
      setIdMessage('3글자 이상, 영문자/숫자/_만 사용가능합니다!')
      setIsId(false)
    } else {
      setIdMessage('올바른 아이디 형식입니다 :)')
      setIsId(true)
      setFinalId(e.target.value)
    }
  }, [])


  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    setPassword(e.target.value)

    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
      setIsPassword(false)
    } else {  
      setPasswordMessage('안전한 비밀번호에요 : )')
      setIsPassword(true)
    }
  }, [])

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback((e) => {
    setConfirmedPassword(e.target.value)

      if (password === e.target.value) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
        setIsPasswordConfirm(true)
        setFinalPassword(e.target.value)
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요.')
        setIsPasswordConfirm(false)
      }
    },
    [password]
  )

  // 닉네임
  const onChangeNickName = useCallback((e) => {  
      const nameRegex = /[\s]/g;
      setUserName(e.target.value)
    if (nameRegex.test(e.target.value) || e.target.value.length<3) {
      setUserNameMessage('공백을 제외한 3글자 이상만 사용가능해요!')
      setIsUserName(false)}
      else {
      setUserNameMessage('올바른 닉네임 형식입니다 :)')
      setIsUserName(true)
      setFinalName(e.target.value);
    }
  }, [])

  //학번
  const handleNumChange = (event) => {
    setNumber(event.target.value.options.label);
    console.log(event.target.value.options.label, "학번");  //미해결
  };

  //전공
  const handleMajorChange = (event) => {
    setMajor(event.target.value.options.label);  //미해결
  };


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
                onChange={onChangeId}  ///아이디 중복확인 ok
                type="text"
                placeholder="아이디"
                size="small"
              />
            &nbsp; <Button variant="outlined" value={id} onClick = {onIdCheckClick}
            disabled={!(isId)}>중복 확인</Button>
            <br/>
            {id.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{IdMessage}</span>}
            </div>
            <br/>
            <div>
            <TextField
                required
                id="outlined-required"
                label="비밀번호"
                value={password}
                name={password}
                onChange={onChangePassword}  ///비밀번호 ok
                type="password"
                placeholder="비밀번호" 
                size="small"
              />
              <br />
              {password.length > 0 && (
                        <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
              )}
            </div>
            <br/>
            <div>
            <TextField
                required
                id="outlined-required"
                label="비밀번호 입력확인"
                value={confirmedPassword}
                onChange={onChangePasswordConfirm}    ///비밀번호 재확인 ok
                type="password"
                placeholder="비밀번호 입력확인" 
                size="small"
              />
              <br/>
              {confirmedPassword.length > 0 && (
                        <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
              )}
            </div>
            <br/>
            <div>
            <TextField
                required
                id="outlined-required"
                label="닉네임"
                value={userName}
                name={userName}
                onChange={onChangeNickName}
                type="text"
                placeholder="닉네임"
                size="small"
              />
            &nbsp; <Button variant="outlined" value={userName} onClick = {onNameCheckClick}
            disabled={!(isUserName) || userName.length < 3}>중복 확인</Button>
            <br />
            {userName.length > 1 && (
                        <span className={`message ${isUserName ? 'success' : 'error'}`}>{userNameMessage}</span>
              )}

            </div>
            <br/>
            <NumComboBox value={number}
              onChange={handleNumChange}  //체크박스 값 확인 필요
              /> 
            <br/>
            <DepComboBox value={major}
              onChange={handleMajorChange} />
       
            <br/>
            <Button variant="contained" onClick={handleSubmitClick} 
            disabled={!(isId && isPassword && isPasswordConfirm && isUserName)}>Sign In</Button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default SignIn;