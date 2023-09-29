import React, { useState, useContext, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../componentscss/Navbar.css";
import UserContext from "../context/usercontext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const homePage = useRef();
  const [activeHome, setActiveHome] = useState(true);
  const [activeFollowing, setActiveFollowing] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState(false);
  const [activeSpaces, setActiveSpaces] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();


  const createPostHandler = () => {
    setCreatePost(true);
    setAddQuestion(false);
    setIsHovered(false);
    setDemo(!true);
  };

  const activeHomePage = () => {
    setActiveHome(true);
    setActiveFollowing(false);
    setActiveAnswer(false);
    setActiveNotifications(false);
    document.title = "(12) Quora";
  };
  const activeFollowingPage = () => {
    setActiveFollowing(true);
    setActiveHome(false);
    setActiveAnswer(false);
    setActiveNotifications(false);
    document.title = "Following";
  };
  const activeAnswerPage = () => {
    setActiveAnswer(true);
    setActiveFollowing(false);
    setActiveHome(false);
    setActiveNotifications(false);
    document.title = "Write Answers";
  };
  const activeNotificationsPage = () => {
    setActiveNotifications(true);
    setActiveAnswer(false);
    setActiveFollowing(false);
    setActiveHome(false);
    document.title = "Notifications - Quora";
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate("/login");
    setTimeout(() => {
      toast("Logout successfully", {
        type: "success",
        theme: "light",
        position: "bottom-center",
      });
    }, 0.001);
  };
  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="logo">
          <Link to="/">
            <svg
              width="202px"
              height="115px"
              viewBox="0 0 202 115"
              className="logocolor"
            >
              <path d="M24.4,31.9 C37.1,31.9 49.1,41.8 49.1,56.2 C49.1,64.3 45.3,70.9 39.9,75.3 C41.5,77.9 43.5,79.7 45.9,79.7 C48.7,79.7 49.9,77.5 50.1,75.7 L50.1,75.7 L53.7,75.7 C53.9,78.1 52.7,87.3 42.7,87.3 C36.5,87.3 33.3,83.7 30.9,79.7 C28.9,80.1 26.7,80.5 24.5,80.5 C12.2,80.5 0,70.6 0,56.2 C0,41.8 12.2,31.9 24.4,31.9 Z M114.1,42.8 C124.3,42.8 132.5,50 132.6,60.7 C132.6,72 124.3,79.4 114.1,79.4 C104.2,79.4 95.6,71.9 95.6,60.7 C95.6,49.8 104.1,42.8 114.1,42.8 Z M181.4,42.8 C190.4,42.8 196,45.2 196,54.2 L196,54.2 L196,69.6 C196,72 196.8,73.2 198.8,73.2 C199.8,73.2 200.6,72.8 201,72.6 L201,72.6 L201.9,74.4 C201.1,75.8 198.5,78.4 193.7,78.4 C189.5,78.4 186.9,76.4 186.5,73.2 L186.5,73.2 L186.3,73.2 C184.3,76.8 180.7,79.2 175.5,79.2 C169.3,79.2 165.5,76 165.5,70.2 C165.5,58.8 181.4,62 186,54.4 L186,54.4 L186,52.6 C186,47.2 183.8,46 181.4,46 C174.2,46 177.4,54.4 171,54.4 C167.8,54.4 166.6,52.6 166.6,50.4 C166.6,46.2 171.8,42.8 181.4,42.8 Z M67.6,43.6 L67.6,67 C67.6,71.4 69.8,73.4 73,73.4 C75.6,73.4 78.4,72.2 79.8,69.4 L79.8,50 C79.8,48 79.2,47.2 77,47.2 L74.6,47.2 L74.6,43.6 L89.8,43.6 L89.8,69.3 C89.8,71.7 90.6,72.9 93.4,72.9 L93.8,72.9 L93.8,76.7 L80.2,78.9 L80.2,73.8 L80,73.8 C77.4,77.1 73.6,79.1 68.6,79.1 C62.4,79.1 57.8,75.9 57.8,67.3 L57.8,50 C57.8,48 57,47.2 54.8,47.2 L52.6,47.2 L52.6,43.6 L67.6,43.6 Z M157.9,43 C161.1,43 163.7,44.8 163.7,48.4 C163.7,51 162.5,53.6 158.9,53.6 C155.9,53.6 155.3,50.8 152.7,50.8 C150.5,50.8 148.7,53 148.7,56.2 L148.7,70.4 C148.7,73.6 149.5,74.6 153.1,74.6 L155.1,74.6 L155.1,78.4 L133.5,78.4 L133.5,74.7 L134.9,74.7 C138.5,74.7 138.9,73.7 138.9,70.5 L138.9,50 C138.9,48 137.9,47.2 135.7,47.2 L133.7,47.2 L133.7,43.6 L147.5,43.6 L148.1,50.8 L148.5,50.8 C149.9,45.6 154.1,43 157.9,43 Z M24.5,35.8 C15.3,35.8 11.3,42.7 11.3,56.1 C11.3,69.5 15.3,76.4 24.5,76.4 C26.2,76.4 27.7,76 28.9,75.6 C27.1,71.4 24.7,67.4 20.1,67.4 C19.3,67.4 18.5,67.6 17.7,68 L17.7,68 L16.3,65.2 C18.3,63.5 21,62.2 24.7,62.2 C30.5,62.2 33.5,65 35.9,68.6 C37.3,65.6 37.9,61.4 37.9,56.1 C37.9,42.7 33.9,35.8 24.5,35.8 Z M114.1,46.2 C109.3,46.2 106.5,51 106.5,60.6 C106.5,70.4 109.3,75.4 114.1,75.4 C119.3,75.4 121.3,70.4 121.5,60.6 C121.7,51.1 119.3,46.2 114.1,46.2 Z M185.9,58.6 C182.7,62.1 175.3,62.6 175.3,69 C175.3,72.2 177.3,74 179.9,74 C184.3,74 185.9,70.2 185.9,66 L185.9,66 Z"></path>
            </svg>
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <div className="home">
          <NavLink to="/" onClick={activeHomePage} ref={userContext.homePage}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: activeHome ? "block" : "none" }}
            >
              <path
                d="M22.02 11.46L12.63 2.45999C12.34 2.17999 11.89 2.17999 11.6 2.44999L1.99 11.45C1.77 11.66 1.69 11.99 1.8 12.27C1.91 12.56 2.19 12.74 2.5 12.74H5.25V20.49C5.25 20.9 5.59 21.24 6 21.24H9.62C10.03 21.24 10.37 20.9 10.37 20.49V16.36C10.37 15.43 11.09 14.67 12 14.62H12.12C13.08 14.62 13.87 15.4 13.87 16.37V20.5C13.87 20.91 14.21 21.25 14.62 21.25H18C18.41 21.25 18.75 20.91 18.75 20.5V12.75H21.5C21.81 12.75 22.08 12.56 22.2 12.28C22.32 12 22.24 11.67 22.02 11.46Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: activeHome ? "none" : "block" }}
            >
              <path
                d="M18 21.25H14.28C13.87 21.25 13.53 20.91 13.53 20.5V16.51C13.53 15.73 12.9 15.1 12.12 15.1H12.02C11.29 15.14 10.71 15.76 10.71 16.51V20.5C10.71 20.91 10.37 21.25 9.96 21.25H6C5.59 21.25 5.25 20.91 5.25 20.5V12.75H2.5C2.19 12.75 1.92 12.56 1.8 12.28C1.69 11.99 1.76 11.67 1.99 11.46L11.6 2.46C11.89 2.19 12.34 2.19 12.63 2.47L22.02 11.47C22.24 11.68 22.31 12.01 22.2 12.29C22.09 12.57 21.81 12.76 21.5 12.76H18.75V20.51C18.75 20.91 18.41 21.25 18 21.25ZM15.03 19.75H17.25V12C17.25 11.59 17.59 11.25 18 11.25H19.63L12.1 4.03L4.4 11.25H6C6.41 11.25 6.75 11.59 6.75 12V19.75H9.2V16.51C9.2 14.97 10.41 13.69 11.95 13.6H12.09C13.72 13.6 15.02 14.91 15.02 16.51V19.75H15.03Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
            </svg>
          </NavLink>
        </div>
        <div className="following">
          <NavLink to="/following" onClick={activeFollowingPage}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: activeFollowing ? "block" : "none" }}
            >
              <path
                d="M18.5 2.25H5.5C3.71 2.25 2.25 3.71 2.25 5.5V18.5C2.25 20.29 3.71 21.75 5.5 21.75H18.5C20.29 21.75 21.75 20.29 21.75 18.5V5.5C21.75 3.71 20.29 2.25 18.5 2.25ZM8.68 18C8.67 18.32 8.41 18.58 8.1 18.58H6.01C5.69 18.58 5.43 18.32 5.43 18V15.92C5.43 15.6 5.69 15.34 6.01 15.34H8.1C8.42 15.34 8.68 15.6 8.68 15.92V18ZM8.31 13.21H7.05H5.79C5.42 13.21 5.2 12.81 5.38 12.5L6.01 11.41L6.64 10.32C6.82 10 7.28 10 7.46 10.32L8.09 11.41L8.72 12.5C8.9 12.82 8.67 13.21 8.31 13.21ZM7.05 8.63C6.08 8.63 5.29 7.84 5.29 6.87C5.29 5.9 6.08 5.11 7.05 5.11C8.02 5.11 8.81 5.9 8.81 6.87C8.81 7.84 8.02 8.63 7.05 8.63ZM18.11 18.38H11.92C11.51 18.38 11.17 18.04 11.17 17.63C11.17 17.22 11.51 16.88 11.92 16.88H18.11C18.52 16.88 18.86 17.22 18.86 17.63C18.86 18.04 18.52 18.38 18.11 18.38ZM18.11 14.72H11.92C11.51 14.72 11.17 14.38 11.17 13.97C11.17 13.56 11.51 13.22 11.92 13.22H18.11C18.52 13.22 18.86 13.56 18.86 13.97C18.86 14.38 18.52 14.72 18.11 14.72ZM18.11 11.06H11.92C11.51 11.06 11.17 10.72 11.17 10.31C11.17 9.9 11.51 9.56 11.92 9.56H18.11C18.52 9.56 18.86 9.9 18.86 10.31C18.86 10.72 18.52 11.06 18.11 11.06ZM18.11 7.39H11.92C11.51 7.39 11.17 7.05 11.17 6.64C11.17 6.23 11.51 5.89 11.92 5.89H18.11C18.52 5.89 18.86 6.23 18.86 6.64C18.86 7.05 18.52 7.39 18.11 7.39Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: activeFollowing ? "none" : "block" }}
            >
              <path
                d="M7.46001 9.04001C6.26001 9.04001 5.29001 8.07001 5.29001 6.87001C5.29001 5.67001 6.26001 4.70001 7.46001 4.70001C8.66001 4.70001 9.63001 5.67001 9.63001 6.87001C9.63001 8.07001 8.65001 9.04001 7.46001 9.04001ZM7.46001 6.20001C7.09001 6.20001 6.79001 6.50001 6.79001 6.87001C6.79001 7.24001 7.09001 7.54001 7.46001 7.54001C7.83001 7.54001 8.13001 7.24001 8.13001 6.87001C8.13001 6.50001 7.83001 6.20001 7.46001 6.20001Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M18.41 7.39001H12.22C11.81 7.39001 11.47 7.05001 11.47 6.64001C11.47 6.23001 11.81 5.89001 12.22 5.89001H18.41C18.82 5.89001 19.16 6.23001 19.16 6.64001C19.16 7.05001 18.82 7.39001 18.41 7.39001Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M18.41 14.72H12.22C11.81 14.72 11.47 14.38 11.47 13.97C11.47 13.56 11.81 13.22 12.22 13.22H18.41C18.82 13.22 19.16 13.56 19.16 13.97C19.16 14.38 18.82 14.72 18.41 14.72Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M18.41 18.38H12.22C11.81 18.38 11.47 18.04 11.47 17.63C11.47 17.22 11.81 16.88 12.22 16.88H18.41C18.82 16.88 19.16 17.22 19.16 17.63C19.16 18.04 18.82 18.38 18.41 18.38Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M18.41 11.06H12.22C11.81 11.06 11.47 10.72 11.47 10.31C11.47 9.9 11.81 9.56 12.22 9.56H18.41C18.82 9.56 19.16 9.9 19.16 10.31C19.16 10.72 18.82 11.06 18.41 11.06Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M7.44999 11.23L7.81999 11.87L8.18999 12.51H7.44999H6.71999L7.08999 11.87L7.44999 11.23ZM7.44999 9.73001C6.90999 9.73001 6.41999 10.02 6.14999 10.48L5.77999 11.12L5.40999 11.76C5.13999 12.22 5.13999 12.8 5.40999 13.26C5.68999 13.72 6.17999 14 6.71999 14H7.45999H8.19999C8.73999 14 9.22999 13.71 9.49999 13.25C9.76999 12.79 9.76999 12.21 9.49999 11.75L9.12999 11.11L8.75999 10.47C8.48999 10.02 7.98999 9.73001 7.44999 9.73001Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M8.81001 19.07H6.10001C5.69001 19.07 5.35001 18.73 5.35001 18.32V15.61C5.35001 15.2 5.69001 14.86 6.10001 14.86H8.81001C9.22001 14.86 9.56001 15.2 9.56001 15.61V18.32C9.56001 18.73 9.22001 19.07 8.81001 19.07ZM6.85001 17.57H8.06001V16.36H6.85001V17.57Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M18.5 21.75H5.5C3.71 21.75 2.25 20.29 2.25 18.5V5.5C2.25 3.71 3.71 2.25 5.5 2.25H18.5C20.29 2.25 21.75 3.71 21.75 5.5V18.5C21.75 20.29 20.29 21.75 18.5 21.75ZM5.5 3.75C4.54 3.75 3.75 4.54 3.75 5.5V18.5C3.75 19.46 4.54 20.25 5.5 20.25H18.5C19.46 20.25 20.25 19.46 20.25 18.5V5.5C20.25 4.54 19.46 3.75 18.5 3.75H5.5Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
            </svg>
          </NavLink>
        </div>
        <div className="answer">
          <NavLink to="answer" id="answer" onClick={activeAnswerPage}>
            <div className="notification-count">
              <h1>1</h1>
            </div>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: activeAnswer ? "block" : "none" }}
            >
              <path
                d="M20.5 11.75C20.09 11.75 19.75 12.09 19.75 12.5V19.75H12.5C12.09 19.75 11.75 20.09 11.75 20.5C11.75 20.91 12.09 21.25 12.5 21.25H20.5C20.91 21.25 21.25 20.91 21.25 20.5V12.5C21.25 12.09 20.91 11.75 20.5 11.75Z"
                fill="#636466"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M4.25 11.5V4.25H11.5C11.91 4.25 12.25 3.91 12.25 3.5C12.25 3.09 11.91 2.75 11.5 2.75H3.5C3.09 2.75 2.75 3.09 2.75 3.5V11.5C2.75 11.91 3.09 12.25 3.5 12.25C3.91 12.25 4.25 11.91 4.25 11.5Z"
                fill="#636466"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M4.05 18.11L3.6 19.46C3.51 19.73 3.58 20.03 3.78 20.23C3.92 20.37 4.11 20.45 4.31 20.45C4.39 20.45 4.47 20.44 4.55 20.41L5.9 19.96L4.05 18.11Z"
                fill="#636466"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M19.65 4.35001C18.62 3.32001 16.83 3.32001 15.8 4.35001L5.17002 14.98C5.09002 15.06 5.03002 15.16 4.99002 15.27L4.58002 16.51L7.49002 19.42L8.74002 19C8.85002 18.96 8.95002 18.9 9.03002 18.82L19.65 8.21001C20.16 7.70002 20.45 7.01002 20.45 6.28001C20.45 5.55001 20.16 4.87001 19.65 4.35001Z"
                fill="#636466"
                className="icon_svg-fill_as_stroke"
              ></path>
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: activeAnswer ? "none" : "block" }}
            >
              <path
                d="M20.45 6.28001C20.45 5.55001 20.17 4.87001 19.65 4.35001C18.62 3.32001 16.83 3.32001 15.8 4.35001L5.17 14.98C5.09 15.06 5.03 15.16 4.99 15.27L3.6 19.46C3.51 19.73 3.58 20.03 3.78 20.23C3.92 20.37 4.11 20.45 4.31 20.45C4.39 20.45 4.47 20.44 4.55 20.41L8.74 19.01C8.85 18.97 8.95 18.91 9.03 18.83L19.65 8.21001C20.16 7.69001 20.45 7.01002 20.45 6.28001ZM18.59 7.15001L8.09 17.65L6.33 18.24L5.77 17.68L6.35 15.92L16.85 5.42001C17.31 4.96001 18.12 4.96001 18.58 5.42001C18.81 5.65001 18.94 5.96001 18.94 6.29001C18.94 6.62001 18.82 6.92001 18.59 7.15001Z"
                fill="#636466"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M20.5 11.75C20.09 11.75 19.75 12.09 19.75 12.5V19.75H12.5C12.09 19.75 11.75 20.09 11.75 20.5C11.75 20.91 12.09 21.25 12.5 21.25H20.5C20.91 21.25 21.25 20.91 21.25 20.5V12.5C21.25 12.09 20.91 11.75 20.5 11.75Z"
                fill="#636466"
                className="icon_svg-fill_as_stroke"
              ></path>
              <path
                d="M4.25 11.5V4.25H11.5C11.91 4.25 12.25 3.91 12.25 3.5C12.25 3.09 11.91 2.75 11.5 2.75H3.5C3.09 2.75 2.75 3.09 2.75 3.5V11.5C2.75 11.91 3.09 12.25 3.5 12.25C3.91 12.25 4.25 11.91 4.25 11.5Z"
                fill="#636466"
                className="icon_svg-fill_as_stroke"
              ></path>
            </svg>
          </NavLink>
        </div>
        <div className="spaces">
          <NavLink>
            <div className="dropdown">
              <Link
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="spaces-icon"
                >
                  <path
                    d="M17.7 9.25C16.75 9.25 15.98 9.52 15.37 9.92C15.8 10.23 16.18 10.6 16.49 11.01C16.83 10.85 17.23 10.75 17.7 10.75C19.48 10.75 20.25 12.12 20.25 12.81V20.25H17.55V21C17.55 21.26 17.5 21.51 17.41 21.75H21C21.41 21.75 21.75 21.41 21.75 21V12.81C21.75 11.32 20.34 9.25 17.7 9.25Z"
                    fill="#666666"
                    className="icon_svg-fill_as_stroke"
                  ></path>
                  <path
                    d="M17.7 2.73C16.77 2.73 15.95 3.16 15.4 3.82C15.78 4.26 16.07 4.77 16.25 5.34C16.42 4.7 17 4.23 17.69 4.23C18.52 4.23 19.19 4.9 19.19 5.73C19.19 6.56 18.52 7.23 17.69 7.23C17.19 7.23 16.75 6.98 16.48 6.61C16.48 6.65 16.49 6.69 16.49 6.74C16.49 7.3 16.38 7.83 16.19 8.32C16.63 8.58 17.14 8.74 17.69 8.74C19.34 8.74 20.69 7.39 20.69 5.74C20.69 4.09 19.35 2.73 17.7 2.73Z"
                    fill="#666666"
                    className="icon_svg-fill_as_stroke"
                  ></path>
                  <path
                    d="M7.5 6.73C7.5 6.69 7.51 6.65 7.51 6.6C7.24 6.98 6.8 7.23 6.3 7.23C5.47 7.23 4.8 6.56 4.8 5.73C4.8 4.9 5.47 4.23 6.3 4.23C6.99 4.23 7.57 4.7 7.74 5.34C7.93 4.77 8.22 4.26 8.6 3.82C8.04 3.16 7.23 2.73 6.3 2.73C4.65 2.73 3.3 4.08 3.3 5.73C3.3 7.38 4.65 8.73 6.3 8.73C6.85 8.73 7.36 8.57 7.8 8.31C7.61 7.81 7.5 7.28 7.5 6.73Z"
                    fill="#666666"
                    className="icon_svg-fill_as_stroke"
                  ></path>
                  <path
                    d="M12 3.73C10.35 3.73 9 5.08 9 6.73C9 8.38 10.35 9.73 12 9.73C13.65 9.73 15 8.38 15 6.73C15 5.08 13.65 3.73 12 3.73ZM12 8.23C11.17 8.23 10.5 7.56 10.5 6.73C10.5 5.9 11.17 5.23 12 5.23C12.83 5.23 13.5 5.9 13.5 6.73C13.5 7.56 12.83 8.23 12 8.23Z"
                    fill="#666666"
                    className="icon_svg-fill_as_stroke"
                  ></path>
                  <path
                    d="M6.45 21V20.25H3.75V12.81C3.75 12.11 4.52 10.75 6.3 10.75C6.79 10.75 7.18 10.86 7.5 11.01C7.81 10.6 8.19 10.23 8.63 9.92C7.97 9.49 7.17 9.25 6.3 9.25C3.66 9.25 2.25 11.32 2.25 12.81V21C2.25 21.41 2.59 21.75 3 21.75H6.59C6.5 21.51 6.45 21.26 6.45 21Z"
                    fill="#666666"
                    className="icon_svg-fill_as_stroke"
                  ></path>
                  <path
                    d="M7.95 21C7.95 21.41 8.29 21.75 8.7 21.75H15.3C15.71 21.75 16.05 21.41 16.05 21V13.91C16.05 12.42 14.64 10.35 12 10.35C9.36 10.35 7.95 12.42 7.95 13.91V21ZM9.45 13.91C9.45 13.21 10.22 11.85 12 11.85C13.78 11.85 14.55 13.22 14.55 13.91V20.25H9.45V13.91Z"
                    fill="#666666"
                    className="icon_svg-fill_as_stroke"
                  ></path>
                </svg>
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <div className="square"></div>
                <div className="triangle">
                  <div className="seeallspacessec" style={{ display: "flex" }}>
                    <h1>See All Spaces</h1>
                    <div className="right-arrow-icon">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m9 5 7 7-7 7.005"
                          className="icon_svg-stroke"
                          stroke="#636466"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <hr />
                  <li>
                    <Link className="dropdown-item" href="#">
                      <div className="space-image">
                        <img
                          height="32"
                          width="32"
                          src="https://qph.cf2.quoracdn.net/main-thumb-ti-3555383-100-xxxwafpoplngauaywtdkmfzugbwqqyht.jpeg"
                          alt=""
                        />
                      </div>
                      <div className="space-right-div">
                        <h1>cinema talk</h1>
                        <div className="space-admin-div">
                          <div className="admin-svg">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ marginLeft: "10px", marginRight: "0px" }}
                            >
                              <path
                                d="M12 3.5c.779 1.167 1.779 2 3 2.5s2.555.333 4-.5v9a7.856 7.856 0 0 1-2.5 3.5c-1.167.945-2.667 1.778-4.5 2.5-1.833-.722-3.333-1.555-4.5-2.5A7.856 7.856 0 0 1 5 14.5v-9c1.549.8 2.882.967 4 .5 1.118-.467 2.118-1.3 3-2.5Zm-7 9.781 14-7.525M7 17.441 18.655 11"
                                className="icon_svg-stroke icon_svg-fill"
                                stroke="#666"
                                strokeWidth="1.5"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ fill: "none" }}
                              ></path>
                            </svg>
                          </div>
                          <div className="admin">
                            <h1>Admin</h1>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link className="dropdown-item" href="#">
                      <div className="space-image">
                        <img
                          height="32"
                          width="32"
                          src="https://qph.cf2.quoracdn.net/main-thumb-ti-2061080-100-wenxdnsaxhmoqgcsffeqlwngjxjhpszf.jpeg"
                          alt=""
                        />
                      </div>
                      <div className="space-right-div">
                        <h1>Quora Creator Hub</h1>
                      </div>
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link className="dropdown-item" href="#">
                      <div className="space-image">
                        <img
                          height="32"
                          width="32"
                          src="https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_purple.png-26-6ea9822273dc841e.png"
                          alt=""
                        />
                      </div>
                      <div className="space-right-div">
                        <h1>blogging pro tips </h1>
                        <div className="space-admin-div">
                          <div className="admin-svg">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ marginLeft: "10px", marginRight: "0px" }}
                            >
                              <path
                                d="M12 3.5c.779 1.167 1.779 2 3 2.5s2.555.333 4-.5v9a7.856 7.856 0 0 1-2.5 3.5c-1.167.945-2.667 1.778-4.5 2.5-1.833-.722-3.333-1.555-4.5-2.5A7.856 7.856 0 0 1 5 14.5v-9c1.549.8 2.882.967 4 .5 1.118-.467 2.118-1.3 3-2.5Zm-7 9.781 14-7.525M7 17.441 18.655 11"
                                className="icon_svg-stroke icon_svg-fill"
                                stroke="#666"
                                strokeWidth="1.5"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ fill: "none" }}
                              ></path>
                            </svg>
                          </div>
                          <div className="admin">
                            <h1>Admin</h1>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link className="dropdown-item" href="#">
                      <div className="space-image">
                        <div className="space-notify-box"></div>
                        <img
                          height="32"
                          width="32"
                          src="https://qph.cf2.quoracdn.net/main-thumb-ti-3423-100-zlrcplhmtyjmiiucdihldvrgezpqwotn.jpeg"
                          alt=""
                        />
                      </div>
                      <div className="space-right-div">
                        <h1>Quora Product Updates</h1>
                      </div>
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link className="dropdown-item" href="#">
                      <div className="space-image">
                        <div className="space-notify-box"></div>
                        <img
                          height="32"
                          width="32"
                          src="https://qph.cf2.quoracdn.net/main-thumb-ti-809-100-nkvxwqeppcbrzbhtgyvsbcuftlxyrfwr.jpeg"
                          alt=""
                        />
                      </div>
                      <div className="space-right-div">
                        <h1>Essay for Civil Services</h1>
                      </div>
                    </Link>
                  </li>
                </div>
              </ul>
            </div>
          </NavLink>
        </div>
        <div className="notifications">
          <NavLink
            to="/notifications"
            id="notifications"
            onClick={activeNotificationsPage}
          >
            <div className="notification-count" id="notifications-count-box">
              <h1>12</h1>
            </div>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: activeNotifications ? "block" : "none" }}
            >
              <path
                d="M20.88 14.95L20.48 14.54C20.22 14.27 19.98 14 19.76 13.73C19.57 13.49 19.4 13.27 19.26 13.07C19.07 12.79 19 12.62 18.97 12.54C18.93 12.45 18.82 12.09 18.74 11.12C18.69 10.51 18.67 9.81 18.68 9.12C18.68 9.05 18.68 8.97 18.68 8.87C18.68 5.22 15.68 2.25 12 2.25C8.32 2.25 5.32 5.23 5.32 8.89V9.11C5.33 9.82 5.31 10.51 5.26 11.13C5.19 12.1 5.07 12.47 5.03 12.55C5 12.63 4.92 12.8 4.74 13.07C4.6 13.27 4.44 13.49 4.24 13.73C4.02 14 3.78 14.27 3.52 14.54L3.17 14.9C2.78 15.27 2.56 15.78 2.56 16.32V17.1C2.56 17.96 3.26 18.65 4.12 18.65H8.23C8.58 20.41 10.14 21.75 12.01 21.75C13.88 21.75 15.44 20.42 15.79 18.65H19.9C20.76 18.65 21.46 17.95 21.46 17.1V16.32C21.44 15.78 21.22 15.26 20.88 14.95ZM12 20.25C10.97 20.25 10.1 19.58 9.78 18.65H14.22C13.9 19.58 13.03 20.25 12 20.25Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: activeNotifications ? "none" : "block" }}
            >
              <path
                d="M20.86 14.93L20.48 14.54C20.22 14.27 19.98 14 19.76 13.73C19.57 13.49 19.4 13.27 19.26 13.07C19.07 12.79 18.99 12.62 18.96 12.55C18.93 12.46 18.81 12.1 18.73 11.12C18.68 10.5 18.66 9.8 18.67 9.12C18.67 9.05 18.67 8.97 18.67 8.87C18.66 5.22 15.67 2.25 11.99 2.25C8.30999 2.25 5.31999 5.23 5.31999 8.89V9.11C5.32999 9.81 5.30999 10.51 5.25999 11.12C5.17999 12.09 5.06999 12.46 5.02999 12.54C4.99999 12.62 4.91999 12.78 4.72999 13.06C4.58999 13.26 4.42999 13.48 4.22999 13.72C4.01999 14 3.77999 14.27 3.51999 14.54L3.27999 14.79C3.22999 14.84 3.17999 14.89 3.15999 14.91C2.76999 15.28 2.54999 15.79 2.54999 16.32V17.1C2.54999 17.96 3.24999 18.65 4.10999 18.65H8.21999C8.56999 20.41 10.13 21.75 12 21.75C13.87 21.75 15.43 20.42 15.78 18.65H19.89C20.75 18.65 21.45 17.95 21.45 17.1V16.32C21.44 15.78 21.22 15.26 20.86 14.93ZM12 20.25C10.97 20.25 10.1 19.58 9.77999 18.65H14.22C13.9 19.58 13.03 20.25 12 20.25ZM19.88 17.15L4.05999 17.1V16.32C4.05999 16.2 4.10999 16.08 4.22999 15.97L4.60999 15.59C4.88999 15.29 5.15999 14.99 5.39999 14.7C5.62999 14.42 5.81999 14.16 5.98999 13.92C6.18999 13.62 6.33999 13.34 6.43999 13.11C6.58999 12.72 6.69999 12.1 6.76999 11.25C6.81999 10.59 6.83999 9.85 6.82999 9.08V8.9C6.82999 6.06 9.15999 3.75 12.01 3.75C14.86 3.75 17.19 6.05 17.19 8.87V9.08C17.18 9.83 17.2 10.58 17.25 11.24C17.32 12.08 17.42 12.71 17.58 13.1C17.67 13.34 17.82 13.61 18.03 13.91C18.19 14.15 18.39 14.41 18.62 14.69C18.86 14.98 19.13 15.28 19.41 15.58L19.82 15.99C19.91 16.08 19.96 16.19 19.96 16.32L19.88 17.15Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
            </svg>
          </NavLink>
        </div>
        <div className="searchbox">
          <div className="searchicon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm10.45 2.95L16 16l4.95 4.95Z"
                className="icon_svg-stroke"
                stroke="#666"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <div className="searchinput">
            <input type="text" name="" id="" placeholder="Search Quora" />
          </div>
        </div>
        <div className="tryquoradiv">
          <div>
            <p className="navbold" style={{ color: "#636466" }}>
              Try Quora+
            </p>
          </div>
        </div>
        <div className="dropdown">
          <div
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* <img
              className='profile-picture'
              src='https://qph.cf2.quoracdn.net/main-thumb-688308262-50-wnmimpsjowztnnzhyhggtbrkmmnekrjr.jpeg'
            ></img> */}
            <img
              className="profile-picture"
              src={
                userContext.user
                  ? userContext.user.profilePicture
                  : userContext.googleUser
                  ? userContext.googleUser.profilePicture
                  : "images/user.png"
              }
              alt="profile"
            />
          </div>
          <ul className="dropdown-menu dropdown-menu-profile">
            <div className="dropdown-top">
              <div className="dropdown-profile">
                <img
                  className="dropdown-profile-picture"
                  src={
                    userContext.user
                      ? userContext.user.profilePicture
                      : userContext.googleUser
                      ? userContext.googleUser.profilePicture
                      : "images/user.png"
                  }
                  alt="profile"
                />
              </div>
              <div className="dropdown-user">
                <h6 style={{ textTransform: "capitalize" }}>
                  {userContext.user
                    ? `${userContext.user.firstName} ${userContext.user.lastName}`
                    : userContext.googleUser
                    ? `${userContext.googleUser.firstName} ${userContext.googleUser.lastName}`
                    : "User Name"}
                </h6>
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m9 5 7 7-7 7.005"
                      className="icon_svg-stroke"
                      stroke="#666"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <hr />
            <li>
              <Link
                className="dropdown-item"
                href="#"
                style={{ marginTop: "-5px" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M7 4.5h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3l-3.5 4v-4H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Zm13 8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2l-2-2h-2"
                      className="icon_svg-stroke"
                      strokeWidth="1.5"
                      stroke="#282829"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <g className="icon_svg-fill_as_stroke" fill="#666">
                      <circle cx="8" cy="10.5" r="1"></circle>
                      <circle cx="11" cy="10.5" r="1"></circle>
                      <circle cx="14" cy="10.5" r="1"></circle>
                    </g>
                  </g>
                </svg>
                Messages
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9.5 17 5v12L3 12.5v-3Zm4.853 4.56L9.5 19H7l-1.947-5.84 2.8.9ZM19.5 7.5l2-1-2 1Zm0 3.5H22h-2.5Zm0 3.5 2 1-2-1ZM8 10.4l6-1.9-6 1.9Z"
                    className="icon_svg-stroke"
                    stroke="#282829"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Create Ad
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 4v16m3.75-13H9.625C8.175 7 7 8.12 7 9.5S8.175 12 9.625 12h3.75C14.825 12 16 13.12 16 14.5S14.825 17 13.375 17H7"
                    className="icon_svg-stroke"
                    stroke="#282829"
                    strokeWidth="1.5"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Monetization
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h3v8H5v-8Zm5.5-8h3v16h-3V4ZM16 7h3v13h-3V7Z"
                    className="icon_svg-stroke icon_svg-fill"
                    strokeWidth="1.5"
                    stroke="#282829"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Your content & stats
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    className="icon_svg-stroke"
                    strokeWidth="1.5"
                    stroke="#282829"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      className="icon_svg-fill"
                      d="m10.501 16-5.499 4L5 8h11v12z"
                    ></path>
                    <path d="M8 5.923V5h11v12l-.997-.725"></path>
                  </g>
                </svg>
                Bookmarks
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.743 10.757h0a1.5 1.5 0 0 1 0 2.122l-5.728 5.727-2.756.638.635-2.76 5.727-5.727a1.5 1.5 0 0 1 2.122 0Zm-3.182 1.061 2.121 2.121M9 19H5V5h13v3M8 9h7m-7 3h5.5M8 15h2.5"
                    className="icon_svg-stroke"
                    strokeWidth="1.5"
                    stroke="#282829"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Drafts
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="icon_svg-fill_as_stroke"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 12.889h2.444a6.668 6.668 0 0 1 6.667 6.667V22h1.778v-2.444a6.668 6.668 0 0 1 6.667-6.667H22V11.11h-2.444a6.668 6.668 0 0 1-6.667-6.667V2H11.11v2.444a6.668 6.668 0 0 1-6.667 6.667H2v1.778Z"
                    fill="#282829"
                  ></path>
                </svg>
                Try quora
              </Link>
            </li>
            <hr />
            <li className="bottomli dark" style={{ marginTop: "-8px" }}>
              <Link
                className="dropdown-item"
                href="#"
                style={{ justifyContent: "space-between" }}
              >
                {userContext.darkMode ? "Light" : "Dark"} mode
                <div className="darkmode">
                  <h6>off</h6>
                </div>
              </Link>
            </li>
            <li className="bottomli">
              <Link className="dropdown-item" href="#">
                Settings
              </Link>
            </li>
            <li className="bottomli">
              <Link className="dropdown-item" href="#">
                Languages
              </Link>
            </li>
            <li className="bottomli">
              <Link className="dropdown-item" href="#">
                Help
              </Link>
            </li>
            <li className="bottomli">
              {/* <Link className="dropdown-item" onClick={handleLogout}>
                Logout
              </Link> */}
              <button className="dropdown-item" onClick={handleLogout} id="logout">
                Logout
              </button>
            </li>
            <hr />
            <footer>
              <div className="about">
                <h6>About</h6>
              </div>
              <div className="careers">
                <h6>Careers</h6>
              </div>
              <div className="terms">
                <h6>Terms</h6>
              </div>
              <div className="privacy">
                <h6>Privacy</h6>
              </div>
              <div className="acceptable">
                <h6>Acceptble Use</h6>
              </div>
              <div className="business">
                <h6>Business</h6>
              </div>
              <div className="press">
                <h6>Press</h6>
              </div>
              <div className="yourad">
                <h6>Your Ad Choices</h6>
              </div>
              <div className="grievance">
                <h6>Grievance</h6>
              </div>
              <div className="officer">
                <h6>Officer</h6>
              </div>
            </footer>
          </ul>
        </div>
        <div className="globe">
          <Link to="/" id="globe" onClick={activeHomePage}>
            <div className="notification-count">
              <h1>2</h1>
            </div>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.25C6.62 2.25 2.25 6.62 2.25 12C2.25 17.38 6.62 21.75 12 21.75C17.38 21.75 21.75 17.38 21.75 12C21.75 6.62 17.38 2.25 12 2.25ZM19.34 8.25H15.82C15.31 6.17 14.43 4.78 13.69 3.92C16.16 4.44 18.22 6.07 19.34 8.25ZM14.75 12C14.75 12.83 14.69 13.57 14.59 14.25H9.41C9.31 13.57 9.25 12.83 9.25 12C9.25 11.17 9.31 10.43 9.41 9.75H14.59C14.69 10.43 14.75 11.17 14.75 12ZM12 19.66C11.42 19.17 10.34 17.99 9.72 15.75H14.28C13.66 17.99 12.58 19.16 12 19.66ZM3.75 12C3.75 11.22 3.87 10.47 4.07 9.75H7.9C7.81 10.44 7.75 11.18 7.75 12C7.75 12.82 7.81 13.56 7.9 14.25H4.07C3.87 13.53 3.75 12.78 3.75 12ZM9.72 8.25C10.34 6.01 11.43 4.84 12 4.34C12.58 4.83 13.66 6.01 14.28 8.25H9.72ZM10.31 3.92C9.57 4.78 8.69 6.17 8.18 8.25H4.66C5.78 6.07 7.84 4.44 10.31 3.92ZM4.66 15.75H8.18C8.69 17.83 9.57 19.22 10.31 20.08C7.84 19.56 5.78 17.93 4.66 15.75ZM13.69 20.08C14.43 19.22 15.31 17.83 15.82 15.75H19.34C18.22 17.93 16.16 19.56 13.69 20.08ZM19.93 14.25H16.1C16.19 13.56 16.25 12.82 16.25 12C16.25 11.18 16.19 10.44 16.1 9.75H19.93C20.13 10.47 20.25 11.22 20.25 12C20.25 12.78 20.13 13.53 19.93 14.25Z"
                fill="#666666"
                className="icon_svg-fill_as_stroke"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="addquestiondiv">
          <div
            className="addquestion"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={createPostHandler}
          >
            <p className="navbold">Add question</p>
          </div>
          <div
            className="downarrow"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m5 8.5 7 7 7.005-7"
                className="icon_svg-stroke"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
