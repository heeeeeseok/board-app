import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const User = {
  email: 'abc@naver.com',
  pw: 'System2000!!'
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwConfirmValid, setPwConfirmValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

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

  const handlePwConfirm = (e) => {
    const value = e.target.value
    setPwConfirm(value);  // setState()는 비동기로 처리된다.

    if (pw == value) {
      setPwConfirmValid(true);
    } else {
      setPwConfirmValid(false);
    }
  }

  const onClickConfirmButton = () => {
    if (email == User.email && pw === User.pw) {
      alert('로그인 성공')
    } else {
      alert('로그인 실패')
    }
  }

  useEffect(() => {
    if (emailValid && pwValid && pwConfirmValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid, pwConfirmValid]);

  return (
    <div className='page'>
      <div className='titleWrap'>
        <br/>
        로그인
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
        <br />
        <div className='buttonWrap'>
          <button onClick={onClickConfirmButton} disabled={notAllow} className='bottomButton'>
            로그인
          </button>
        </div>
        <hr nonshade/>
        <div className='registerWrap'>
          <div className='registerTitle'>
            <Link to="/register">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


