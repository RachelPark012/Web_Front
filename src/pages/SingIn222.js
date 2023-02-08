import React, { useState, useCallback, useNavigate } from 'react';
import axios from 'axios';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import TextField from "@mui/material/TextField";
import './SingIn.css';


const SingIn222 = () => {
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
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
    const [isUserName, setIsUserName] = useState(false)

    //const navigate = useNavigate();
  
    const onSubmit = () => {
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
  
    // 아이디
    const onChangeId = useCallback(() => {
        const idRegex = /([a-z\_]{3,6})$/
        //setId(id)
      if (id.length < 2 || id.length > 7) {
        setIdMessage('3글자 이상 7글자 미만으로 입력해주세요.')
        setIsId(false)
      } if (!idRegex.test(id)) {
        setIdMessage('숫자+영문자+특수문자 조합으로 4자리 이상 입력해주세요!')
        setIsId(false)
      } else {
        setIdMessage('올바른 아이디 형식입니다 :)')
        setIsId(true)
      }
    }, [])

  
    // 비밀번호
    const onChangePassword = useCallback(() => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
      setPassword(password)
  
      if (!passwordRegex.test(password)) {
        setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
        setIsPassword(false)
      } else {  
        setPasswordMessage('안전한 비밀번호에요 : )')
        setIsPassword(true)
      }
    }, [])
  
    // 비밀번호 확인
    const onChangePasswordConfirm = useCallback(
      () => {
        //setConfirmedPassword(passwordConfirmCurrent)
  
        if (password === confirmedPassword) {
          setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
          setIsPasswordConfirm(true)
        } else {
          setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요.')
          setIsPasswordConfirm(false)
        }
      },
      [password]
    )

    // 닉네임   공백제외 2이상 10이하
    const onChangeNickName = useCallback(() => {
        const nameRegex = /(?=.*[!@#$%^*+=-])(?=.*[0-9]).{2,10}$/
        setId(id)
      if (userName.length < 2 || userName.length > 10) {
        setUserNameMessage('2글자 이상 10글자 미만으로 입력해주세요.')
        setIsUserName(false)
      } if (!nameRegex.test(id)) {
        setUserNameMessage('숫자+영문자+특수문자 조합으로 2자리 이상 입력해주세요!')
        setIsUserName(false)} 
        else {
        setUserNameMessage('올바른 아이디 형식입니다 :)')
        setIsUserName(true)
      }
    }, [])
  
    return (
      <>
        <Container>
                <div style={{ 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                width: '100%', height: '5vh'
                }}>
                <form style={{ display: 'flex', flexDirection: 'column'}}>
                    <h1>Sign In</h1>
                  <form  onSubmit={onSubmit}>
                    <div className="formbox">
                        <TextField text="아이디" type="text" typeName="name"  
                        onChange={({ target: { value } }) => setId(value)}
                        />
                        {id.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{IdMessage}</span>}
                        &nbsp; <Button variant="outlined" value={id} onClick = {onIdCheckClick}>중복 확인</Button>
                    </div>
            
                    <div className="formbox">
                        <TextField
                        type="password"
                        //onChange={onChangePassword}
                        passwordText="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
                        title="비밀번호"
                        typeTitle="password"
                        onChange={({ target: { value } }) => setPassword(value)}
                        />
                        {password.length > 0 && (
                        <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
                        )}
                    </div>
            
                    <div className="formbox">
                        <TextField
                        type="password"
                        //onChange={onChangePasswordConfirm}
                        passwordText=" "
                        title="비밀번호 확인"
                        typeTitle="passwordConfirm"
                        onChange={({ target: { value } }) => setConfirmedPassword(value)}    ///비밀번호 재확인 ok
                        />
                        {confirmedPassword.length > 0 && (
                        <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
                        )}
                    </div>

                    <div className="formbox">
                        <TextField text="이메일" type="email" typeName="email"
                        onChange={({ target: { value } }) => setUserName(value)} 
                        />
                        {userName.length > 0 && <span className={`message ${isUserName ? 'success' : 'error'}`}>{userNameMessage}</span>}
                        &nbsp; <Button variant="outlined" value={userName} onClick = {onChangeNickName}>중복 확인</Button>
                    </div>
            
                    {/* 이름, 패스워드, 패스워드 확인, 닉네임이 다 맞다면 주황버튼으로 */}
                    <button
                        className={
                            isId && isPassword && isPasswordConfirm && isUserName
                            ? "border-2 border-black w-[100px] md:w-[200px] md:text-xl"
                            : "border-2 border-black bg-black text-white w-[100px] md:w-[200px] md:text-xl"
                            }
                        type="submit"
                        disabled={!(isId && isPassword && isPasswordConfirm && isUserName)}
                        >
                        회원가입
                        </button>
                  </form>
                </form>
            </div>
        </Container>
      </>
    )
  }
  
  export default SingIn222