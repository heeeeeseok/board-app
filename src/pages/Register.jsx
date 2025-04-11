import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';


export default function Register() {
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwConfirmValid, setPwConfirmValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }

  const handlePw = (e) => {
    setPw(e.target.value);

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (pwRegex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleNickname = (e) => {
    setNickname(e.target.value);
  }

  const handlePwConfirm = (e) => {
    const value = e.target.value
    setPwConfirm(value);  // setState()는 비동기로 처리된다.

    if (pw == value) {
      setPwConfirmValid(true);
    } else {
      setPwConfirmValid(false);
    }
  }

  const onClickConfirmButton = (email, pw) => {
    console.log(username);
    
    fetch('http://localhost:9000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": username,
        "password": pw,
        "email": email,
        "nickname": nickname
      })
    })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '회원가입 실패');
      }

      return data;
    })
    .then(data => {
      alert('회원가입 성공');
      navigate('/');
    })
    .catch(error => {
      console.error(error);
      alert('회원가입 중 오류 발생');
    });
  }

  useEffect(() => {
    if (emailValid && pwValid && pwConfirmValid && nickname.length > 0 && username.length > 0) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid, pwConfirmValid, nickname, username]);

  return (
    <div className='register-container'>
      <div className='titleWrap'>
        <br/>
        회원가입
      </div>

      <div style={{ marginTop: "26px" }} className='inputTitle'>사용자 이름</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='사용할 아이디를 입력하세요'
            value={username}
            onChange={handleUsername}/>
        </div>
      
      <div className='contentWrap'>
        <div className='inputTitle'>이메일 주소</div>
        <div className='inputWrap'>
          <input
            type="text"
            className='input'
            placeholder="이메일 주소를 입력하세요"
            value={email}
            onChange={handleEmail}/>
        </div>

        {/* 이메일 에러처리 */}
        <div className='errorMessageWrap'>
          {
            !emailValid && email.length > 0 && (
              <div>이메일 형식이 맞지 않습니다.</div>
            )
          }
        </div>

        <div style={{ marginTop: "26px" }} className='inputTitle'>비밀번호</div>
        <div className='inputWrap'>
          <input
            type='password'
            className='input'
            placeholder='비밀번호를 입력하세요'
            value={pw}
            onChange={handlePw}/>
        </div>

        {/* 비밀번호 에러처리 */}
        <div className='errorMessageWrap'>
          {
            !pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )
          }
        </div>

        <div style={{ marginTop: "26px" }} className='inputTitle'>비밀번호 확인</div>
        <div className='inputWrap'>
          <input
            type='password'
            className='input'
            placeholder='비밀번호를 다시 입력하세요'
            value={pwConfirm}
            onChange={handlePwConfirm}/>
        </div>

        {/* 비밀번호 확인 에러처리 */}
        <div className='errorMessageWrap'>
          {
            !pwConfirmValid && pwConfirm.length > 0 && (
              <div>비밀번호가 일치하지 않습니다</div>
            )
          }
        </div>

        <div style={{ marginTop: "26px" }} className='inputTitle'>닉네임</div>
        <div className='inputWrap'>
          <input
            type='text'
            className='input'
            placeholder='표시할 닉네임을 입력하세요'
            value={nickname}
            onChange={handleNickname}/>
        </div>

        <div className='buttonWrap'>
          <button onClick={() => onClickConfirmButton(email, pw)} disabled={notAllow} className='bottomButton'>
            회원가입
          </button>
        </div>
        <div className='loginWrap'>
          <div className='loginTitle'>
            계정이 있으신가요?<Link to="/">로그인하기</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


