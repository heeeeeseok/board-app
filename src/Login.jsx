import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Login.css';


export default function Login() {
  const [username, setUsername] = useState('');
  const [pw, setPw] = useState('');

  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handlePw = (e) => {
    setPw(e.target.value);
  }

  const onClickConfirmButton = () => {
    const params = {
      username: username,
      password: pw,
    };
    
    // 쿼리 문자열로 변환
    const queryString = new URLSearchParams(params).toString();

    fetch(`http://localhost:9000/login?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    })
    .then(data => {
      const userId = data.userId;
      const nickname = data.nickname;
      const TTL = 60 * 60; // 1시간

      // userId 쿠키
      document.cookie = `userId=${encodeURIComponent(userId)}; path=/; max-age=${TTL}; SameSite=Strict`;
    
      // nickname 쿠키
      document.cookie = `nickname=${encodeURIComponent(nickname)}; path=/; max-age=${TTL}; SameSite=Strict`;

      navigate('/home');
    })
    .catch(error => {
      console.error(error);
      alert('로그인 중 오류 발생');
    });
  }

  useEffect(() => {
    if (username.length == 0 || pw.length == 0) {
      setNotAllow(true);
      return;
    }
    setNotAllow(false);
  }, [username, pw]);

  return (
    <div className='login-container'>
      <div className='titleWrap'>
        <br/>
        로그인
      </div>
      <div className='contentWrap'>
        <div className='inputTitle'>사용자 이름</div>
        <div className='inputWrap'>
          <input
            type="text"
            className='input'
            placeholder="사용자 이름을 입력하세요"
            value={username}
            onChange={handleUsername}/>
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

        <br />
        <div className='buttonWrap'>
          <button onClick={onClickConfirmButton} disabled={notAllow} className='bottomButton'>
            로그인
          </button>
        </div>
        <div className='registerWrap'>
          <div className='registerTitle'>
            <Link to="/register">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


