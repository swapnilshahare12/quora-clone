import React, { useState, useEffect, useContext } from "react";
import "../pagescss/Login.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/usercontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, facebookAuthProvider, googleAuthProvider } from "../Config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";

const Login = () => {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const mobileNavbar = document.querySelector(".mobile-navbar");
    mobileNavbar.style.display = "none";
    navbar.style.display = "none";
    document.title = "Quora";
    const token = Cookies.get("jwt");
    if (token) {
      axios
        .post(
          "/user-auth",
          {
            token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.userDetails.profession === "Google User") {
              navigate("/");
              userContext.homePage.current.click();
              userContext.setGoogleUser({
                firstName: res.data.userDetails.firstName,
                lastName: res.data.userDetails.lastName,
                email: res.data.userDetails.email,
                profilePicture: res.data.userDetails.profilePicture,
                profession: res.data.userDetails.profession,
              });
            } else {
              navigate("/");
              userContext.homePage.current.click();
              userContext.setUser({
                firstName: res.data.userDetails.firstName,
                lastName: res.data.userDetails.lastName,
                email: res.data.userDetails.email,
                profilePicture: res.data.userDetails.profilePicture,
                profession: res.data.userDetails.profession,
              });
            }
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);
  const [show, setShow] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [spinner, setSpinner] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const signUpHandleShow = () => {
    setShow(true);
    setLogIn(false);
  };
  const loginHandleShow = () => {
    setShow(true);
    setLogIn(true);
  };

  const handleGoogleClick = () => {
    userContext.setPreventUser(true);
    signInWithPopup(auth, googleAuthProvider)
      .then((data) => {
        axios
          .post(
            "/register-google-user",
            {
              firstName: data._tokenResponse.firstName,
              lastName: data._tokenResponse.lastName,
              email: data._tokenResponse.email,
              profilePicture: data._tokenResponse.photoUrl,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              userContext.setPreventUser(false);
              Cookies.set("jwt", res.data.token, {
                expires: 7,
                secure: true,
                sameSite: "strict",
              });
              navigate("/");
              userContext.homePage.current.click();
              setTimeout(() => {
                toast(
                  `${data._tokenResponse.firstName} You have successfully logged in your account`,
                  {
                    type: "success",
                    theme: "light",
                    position: "bottom-center",
                  }
                );
              }, 0.001);
            } else {
              userContext.setPreventUser(false);
              navigate("/login");
              setTimeout(() => {
                toast(
                  `dear user this feature is currently not available`,
                  {
                    type: "error",
                    theme: "light",
                    position: "bottom-center",
                  }
                );
              }, 0.001);
            }
          })
          .catch((err) => {
            userContext.setPreventUser(false);
            navigate("/login");
            setTimeout(() => {
              toast(
                `dear user this feature is currently not available`,
                {
                  type: "error",
                  theme: "light",
                  position: "bottom-center",
                }
              );
            }, 0.001);
          });
      })
      .catch((err) => {
        userContext.setPreventUser(false);
        navigate("/login");
      });
  };
  const handleFacebookClick = () => {
    navigate("/login");
    setTimeout(() => {
      toast("Currently this feature is not available try Google login", {
        type: "error",
        theme: "light",
        position: "bottom-center",
      });
    }, 0.001);
    // signInWithPopup(auth, facebookAuthProvider)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const isProfessionValid = (profession) => {
    const pattern = /^[^0-9].*/; // Regular expression pattern
    return pattern.test(profession);
  };
  const registerUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      navigate("/login");
      handleClose();
      setTimeout(() => {
        toast("Password does not match", {
          type: "error",
          theme: "light",
          position: "bottom-center",
        });
      }, 0.001);
    } else if (isProfessionValid(profession) !== true) {
      navigate("/login");
      handleClose();
      setTimeout(() => {
        toast("Profession should not start with number", {
          type: "error",
          theme: "light",
          position: "bottom-center",
        });
      }, 0.001);
    } else {
      setSpinner(true);
      axios
        .post(
          "/register-user",
          {
            firstName,
            lastName,
            email,
            profession,
            password,
            confirmPassword,
            profilePicture,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            navigate("/login");
            handleClose();
            setTimeout(() => {
              toast("user created successfully", {
                type: "success",
                theme: "light",
                position: "bottom-center",
              });
            }, 0.001);
            setSpinner(false);
          } else if (res.data.userExist) {
            handleClose();
            navigate("/login");
            setTimeout(() => {
              toast("this email is already been used", {
                type: "error",
                theme: "light",
                position: "bottom-center",
              });
            }, 0.001);
            setSpinner(false);
          } else {
            handleClose();
            navigate("/login");
            setTimeout(() => {
              toast("Internal Server Error", {
                type: "error",
                theme: "light",
                position: "bottom-center",
              });
            }, 0.001);
            setSpinner(false);
          }
        })
        .catch((err) => {
          console.log(err);
          handleClose();
          navigate("/login");
          setTimeout(() => {
            toast("Internal Server Error", {
              type: "error",
              theme: "light",
              position: "bottom-center",
            });
          }, 0.001);
          setSpinner(false);
        });
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    setSpinner(true);
    axios
      .post(
        "/login-user",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          Cookies.set("jwt", res.data.token, {
            expires: 7,
            secure: true,
            sameSite: "strict",
          });
          navigate("/");
          handleClose();
          userContext.homePage.current.click();
          setTimeout(() => {
            toast(
              `${res.data.firstName} You have successfully logged in your account`,
              {
                type: "success",
                theme: "light",
                position: "bottom-center",
              }
            );
          }, 0.001);
          setSpinner(false);
        } else {
          handleClose();
          navigate("/login");
          setTimeout(() => {
            toast("invalid credentials", {
              type: "error",
              theme: "light",
              position: "bottom-center",
            });
          }, 0.001);
          setSpinner(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="login">
      <ToastContainer
        position="bottom-center"
        transition={Bounce}
        limit={5}
        theme="light"
      />
      <div className="login-box">
        <div className="login-box-top">
          <div className="bg-top">
            <img src="images/bg-top.png" alt="" />
          </div>
          <div className="quora-logo">
            <svg width="202px" height="115px" viewBox="0 0 202 115">
              <g
                stroke="none"
                fill="none"
                fillRule="evenodd"
                className="logo_fill"
              >
                <path d="M24.4,31.9 C37.1,31.9 49.1,41.8 49.1,56.2 C49.1,64.3 45.3,70.9 39.9,75.3 C41.5,77.9 43.5,79.7 45.9,79.7 C48.7,79.7 49.9,77.5 50.1,75.7 L50.1,75.7 L53.7,75.7 C53.9,78.1 52.7,87.3 42.7,87.3 C36.5,87.3 33.3,83.7 30.9,79.7 C28.9,80.1 26.7,80.5 24.5,80.5 C12.2,80.5 0,70.6 0,56.2 C0,41.8 12.2,31.9 24.4,31.9 Z M114.1,42.8 C124.3,42.8 132.5,50 132.6,60.7 C132.6,72 124.3,79.4 114.1,79.4 C104.2,79.4 95.6,71.9 95.6,60.7 C95.6,49.8 104.1,42.8 114.1,42.8 Z M181.4,42.8 C190.4,42.8 196,45.2 196,54.2 L196,54.2 L196,69.6 C196,72 196.8,73.2 198.8,73.2 C199.8,73.2 200.6,72.8 201,72.6 L201,72.6 L201.9,74.4 C201.1,75.8 198.5,78.4 193.7,78.4 C189.5,78.4 186.9,76.4 186.5,73.2 L186.5,73.2 L186.3,73.2 C184.3,76.8 180.7,79.2 175.5,79.2 C169.3,79.2 165.5,76 165.5,70.2 C165.5,58.8 181.4,62 186,54.4 L186,54.4 L186,52.6 C186,47.2 183.8,46 181.4,46 C174.2,46 177.4,54.4 171,54.4 C167.8,54.4 166.6,52.6 166.6,50.4 C166.6,46.2 171.8,42.8 181.4,42.8 Z M67.6,43.6 L67.6,67 C67.6,71.4 69.8,73.4 73,73.4 C75.6,73.4 78.4,72.2 79.8,69.4 L79.8,50 C79.8,48 79.2,47.2 77,47.2 L74.6,47.2 L74.6,43.6 L89.8,43.6 L89.8,69.3 C89.8,71.7 90.6,72.9 93.4,72.9 L93.8,72.9 L93.8,76.7 L80.2,78.9 L80.2,73.8 L80,73.8 C77.4,77.1 73.6,79.1 68.6,79.1 C62.4,79.1 57.8,75.9 57.8,67.3 L57.8,50 C57.8,48 57,47.2 54.8,47.2 L52.6,47.2 L52.6,43.6 L67.6,43.6 Z M157.9,43 C161.1,43 163.7,44.8 163.7,48.4 C163.7,51 162.5,53.6 158.9,53.6 C155.9,53.6 155.3,50.8 152.7,50.8 C150.5,50.8 148.7,53 148.7,56.2 L148.7,70.4 C148.7,73.6 149.5,74.6 153.1,74.6 L155.1,74.6 L155.1,78.4 L133.5,78.4 L133.5,74.7 L134.9,74.7 C138.5,74.7 138.9,73.7 138.9,70.5 L138.9,50 C138.9,48 137.9,47.2 135.7,47.2 L133.7,47.2 L133.7,43.6 L147.5,43.6 L148.1,50.8 L148.5,50.8 C149.9,45.6 154.1,43 157.9,43 Z M24.5,35.8 C15.3,35.8 11.3,42.7 11.3,56.1 C11.3,69.5 15.3,76.4 24.5,76.4 C26.2,76.4 27.7,76 28.9,75.6 C27.1,71.4 24.7,67.4 20.1,67.4 C19.3,67.4 18.5,67.6 17.7,68 L17.7,68 L16.3,65.2 C18.3,63.5 21,62.2 24.7,62.2 C30.5,62.2 33.5,65 35.9,68.6 C37.3,65.6 37.9,61.4 37.9,56.1 C37.9,42.7 33.9,35.8 24.5,35.8 Z M114.1,46.2 C109.3,46.2 106.5,51 106.5,60.6 C106.5,70.4 109.3,75.4 114.1,75.4 C119.3,75.4 121.3,70.4 121.5,60.6 C121.7,51.1 119.3,46.2 114.1,46.2 Z M185.9,58.6 C182.7,62.1 175.3,62.6 175.3,69 C175.3,72.2 177.3,74 179.9,74 C184.3,74 185.9,70.2 185.9,66 L185.9,66 Z"></path>
              </g>
            </svg>
          </div>
          <div className="head-line">
            <h1>A place to share knowledge and better understand the world</h1>
          </div>
        </div>
        <div className="login-box-center">
          <div className="login-box-center-left">
            <div className="terms-of-service">
              <p>
                By continuing you indicate that you agree to Quora’s{" "}
                <Link to="https://www.quora.com/about/tos">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="https://www.quora.com/about/privacy">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div
              className="google"
              onClick={userContext.preventUser ? "" : handleGoogleClick}
            >
              <div className="google-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fillRule="evenodd"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="icon_svg-fill_as_stroke"
                    d="M20.16 12.193c0-.603-.054-1.182-.155-1.739H12v3.288h4.575a3.91 3.91 0 0 1-1.696 2.565v2.133h2.747c1.607-1.48 2.535-3.659 2.535-6.248z"
                    fill="#4285f4"
                  ></path>
                  <path
                    className="icon_svg-fill_as_stroke"
                    d="M12 20.5c2.295 0 4.219-.761 5.625-2.059l-2.747-2.133c-.761.51-1.735.811-2.878.811-2.214 0-4.088-1.495-4.756-3.504h-2.84v2.202A8.497 8.497 0 0 0 12 20.5z"
                    fill="#34a853"
                  ></path>
                  <path
                    className="icon_svg-fill_as_stroke"
                    d="M7.244 13.615A5.11 5.11 0 0 1 6.977 12a5.11 5.11 0 0 1 .267-1.615V8.183h-2.84C3.828 9.33 3.5 10.628 3.5 12s.328 2.67.904 3.817l2.84-2.202z"
                    fill="#fbbc05"
                  ></path>
                  <path
                    className="icon_svg-fill_as_stroke"
                    d="M12 6.881c1.248 0 2.368.429 3.249 1.271l2.438-2.438C16.215 4.342 14.291 3.5 12 3.5a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202C7.912 8.376 9.786 6.881 12 6.881z"
                    fill="#ea4335"
                  ></path>
                </svg>
              </div>
              <h1>Continue with Google</h1>
            </div>
            <div className="facebook" onClick={handleFacebookClick}>
              <div className="facebook-logo">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="icon_svg-fill_as_stroke"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 12a8.5 8.5 0 1 0-9.83 8.397v-5.94H8.513v-2.458h2.159v-1.872c0-2.13 1.269-3.307 3.21-3.307.93 0 1.903.166 1.903.166v2.091h-1.072c-1.056 0-1.385.656-1.385 1.328V12h2.358l-.377 2.457h-1.98v5.94A8.503 8.503 0 0 0 20.5 12Z"
                    fill="#1877F2"
                  ></path>
                </svg>
              </div>
              <h1>Continue with Facebook</h1>
            </div>
            <div className="sign-up-and-login">
              <p className="login " onClick={loginHandleShow}>
                Login
              </p>
              <p className="signup" onClick={signUpHandleShow}>
                Sign up with email
              </p>
            </div>
          </div>
          <div className="login-box-center-right">
            <form autoComplete="off" onSubmit={loginUser}>
              <h1 className="login-text">Login</h1>
              <hr />
              <h1>Email</h1>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <h1>Password</h1>
              <input
                type="password"
                id="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="login-box-center-right-bottom">
                <div className="forgotpass">
                  <p>Forgot password?</p>
                </div>
                <div className="login">
                  {/* <input type="submit" value="Login" /> */}
                  <button className="loginBtn">
                    <div
                      className="spinner"
                      style={{ display: spinner ? "block" : "none" }}
                    ></div>
                    <span style={{ display: spinner ? "none" : "block" }}>
                      Login
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <div className="languages">
          <div className="hindi">
            <h1>हिन्दी</h1>
            <svg
              width="18"
              height="18"
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
          <div className="marathi">
            <h1>मराठी</h1>
            <svg
              width="18"
              height="18"
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
        <hr id="third-hr" />
        <div className="footer">
          <p>
            About<span className="dot">•</span>
          </p>
          <p>
            Careers<span className="dot">•</span>
          </p>
          <p className="privacy">
            Privacy<span className="dot">•</span>
          </p>
          <p className="terms">
            Terms<span className="dot">•</span>
          </p>
          <p className="contact">
            Contact<span className="dot">•</span>
          </p>
          <p>
            Languages<span className="dot">•</span>
          </p>
          <p className="your-ad">
            Your Ad Choices<span className="dot">•</span>
          </p>
          <p className="press">
            Press<span className="dot">•</span>
          </p>
          <p className="span" style={{ marginRight: "3px" }}>
            © Quora,
          </p>
          <p className="span" style={{ marginRight: "3px" }}>
            Inc.
          </p>
          <p className="span">2023</p>
        </div>
        <div className="bg-bottom">
          <img src="images/bg-bottom.png" alt="" />
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{logIn ? "Login" : "Sign up"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            autoComplete="off"
            onSubmit={logIn ? loginUser : registerUser}
            noValidate={logIn ? true : false}
          >
            <div className="name" style={{ display: logIn ? "none" : "flex" }}>
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div
              className="surname"
              style={{ display: logIn ? "none" : "flex" }}
            >
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="email">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div
              className="profession"
              style={{ display: logIn ? "none" : "flex" }}
            >
              <input
                type="text"
                placeholder="Profession"
                onChange={(e) => setProfession(e.target.value)}
                required
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div
              className="confirmpassword"
              style={{ display: logIn ? "none" : "flex" }}
            >
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div
              className="profile-picture-of-user"
              style={{ display: logIn ? "none" : "flex" }}
            >
              <input
                type="file"
                id="file-upload-button"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                accept=".jpeg,.jpg,.png"
                required
              />
            </div>
            <Modal.Footer className="sign-up-footer">
              <Button
                variant="primary"
                type="submit"
                className="sign-up-btn"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="spinner"
                  style={{ display: spinner ? "block" : "none" }}
                ></div>
                <span style={{ display: spinner ? "none" : "block" }}>
                  {logIn ? "LOGIN" : "SIGN-UP"}
                </span>
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
