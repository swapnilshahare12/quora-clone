import { useState, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import UserContext from "./context/usercontext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Following from "./pages/Following";
import Answer from "./pages/Answer";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Mobilenavbar from "./components/Mobilenavbar";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const homePage = useRef();
  const [post, setPost] = useState(null);
  const [preventUser, setPreventUser] = useState(false);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user,
          setUser,
          googleUser,
          setGoogleUser,
          darkMode,
          setDarkMode,
          homePage,
          post,
          setPost,
          preventUser,
          setPreventUser
        }}
      >
        <Router>
          <Mobilenavbar />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/following" element={<Following />} />
            <Route path="/answer" element={<Answer />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
