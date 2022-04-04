import { useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService} from "myBase";


function App() {
  // firebase에 비해 렌더링 속도가 빨라 로그인을 하더라도 ui상에서 로그인 창이 다시 나오는 것을 볼 수 있다.
  // 이문제를 해결하자
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    // 로그인 상태에 대해 감지하는 sdk이다.
    // state로 감지하고 있어 강제로 로그아웃하더라도 즉시 반영된다.
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      }else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj } /> : "Initializing..."}
    </>
  );
}

export default App;
