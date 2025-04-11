import { useEffect, useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');

  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  };

  useEffect(() => {
    const userIdFromCookie = getCookie('userId');
    const nicknameFromCookie = getCookie('nickname');

    if (userIdFromCookie && nicknameFromCookie) {
      setUserId(userIdFromCookie);
      setNickname(nicknameFromCookie);
      console.log(`로그인된 사용자: ${nicknameFromCookie} (${userIdFromCookie})`);
    }
  }, []);

  return (
    <div>
      <div>{userId}</div>
      <div>{nickname}</div>
    </div>
  );
}
