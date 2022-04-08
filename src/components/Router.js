import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({refreshUser, isLoggedIn, userObj }) => {

    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div style={{maxWidth: '890px', width: '100%', margin: '0 auto', marginTop: '80px', display: 'flex', justifyContent: 'center'}}>
            <Routes>
                {isLoggedIn ? 
                (
                <>
                    <Route exact path="/" element={<Home userObj={userObj} />}></Route>
                    <Route exact path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />}></Route>
                    <Route path="*" element={<Navigate replace to='/' />}></Route>
                </>
                ) : 
                (
                <>
                    <Route exact path="/" element={<Auth />}></Route>
                    {/* 기존 redirect, useHistory */}
                    <Route path="*" element={<Navigate replace to='/' />}></Route>
                </>
                )}
            </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;