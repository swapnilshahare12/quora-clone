import React, { useEffect, useRef, useState, useContext } from "react";
import "../pagescss/Home.css";
import { Link } from "react-router-dom";
import Spaces from "../components/Spaces";
import Adbox from "../components/Adbox";
import Modal from "../components/Modal";
import UserContext from "../context/usercontext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const userContext = useContext(UserContext);
  const [addQuestion, setAddQuestion] = useState(true);
  const [createPost, setCreatePost] = useState(false);
  const [demo, setDemo] = useState(true);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const likeAudio = useRef();
  const [upVoteCounts, setUpVotesCounts] = useState([
    {
      votes: 374,
      upvoted: false,
      downvoted: false,
    },
    {
      votes: 679,
      upvoted: false,
      downvoted: false,
    },
    {
      votes: 312,
      upvoted: false,
      downvoted: false,
    },
  ]);

  const handleClick = (buttonNumber) => {
    if (upVoteCounts[buttonNumber].upvoted) {
      setUpVotesCounts((prevCounts) => {
        return prevCounts.map((count, index) => {
          if (index === buttonNumber) {
            if (upVoteCounts[buttonNumber].downvoted) {
              return {
                ...count,
                votes: count.votes - 1,
                downvoted: false,
                upvoted: false,
              };
            } else {
              return {
                ...count,
                votes: count.votes - 1,
                downvoted: false,
                upvoted: false,
              };
            }
          }
          return count;
        });
      });
    } else {
      setUpVotesCounts((prevCounts) => {
        return prevCounts.map((count, index) => {
          if (index === buttonNumber) {
            if (upVoteCounts[buttonNumber].downvoted) {
              likeAudio.current.currentTime = 0;
              likeAudio.current.play();
              return {
                ...count,
                votes: count.votes + 1,
                downvoted: false,
                upvoted: true,
              };
            } else {
              likeAudio.current.currentTime = 0;
              likeAudio.current.play();
              return {
                ...count,
                votes: count.votes + 1,
                downvoted: false,
                upvoted: true,
              };
            }
          }
          return count;
        });
      });
    }
  };

  const handleDownvote = (buttonNumber) => {
    if (upVoteCounts[buttonNumber].downvoted) {
      setUpVotesCounts((prevCounts) => {
        return prevCounts.map((count, index) => {
          if (index === buttonNumber) {
            return {
              ...count,

              upvoted: false,
              downvoted: false,
            };
          }
          return count;
        });
      });
    } else {
      setUpVotesCounts((prevCounts) => {
        return prevCounts.map((count, index) => {
          if (index === buttonNumber) {
            if (upVoteCounts[buttonNumber].upvoted) {
              return {
                ...count,
                votes: count.votes - 1,
                upvoted: false,
                downvoted: true,
              };
            } else {
              return {
                ...count,
                upvoted: false,
                downvoted: true,
              };
            }
          }
          return count;
        });
      });
    }
  };

  useEffect(() => {
    axios
      .get("/fetch-posts")
      .then((res) => {
        userContext.setPost(res.data.posts.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
    if (window.innerWidth < 1111) {
      const mobilenavbar = document.querySelector(".mobile-navbar");
      mobilenavbar.style.display = "flex";
    }
    const navbar = document.querySelector(".navbar");
    navbar.style.display = "flex";
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
              userContext.setGoogleUser({
                firstName: res.data.userDetails.firstName,
                lastName: res.data.userDetails.lastName,
                email: res.data.userDetails.email,
                profilePicture: res.data.userDetails.profilePicture,
                profession: res.data.userDetails.profession,
              });
            } else {
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

  const addQuestionHandler = () => {
    setAddQuestion(true);
    setCreatePost(false);
    setIsHovered(false);
    setDemo(!true);
  };

  const createPostHandler = () => {
    setCreatePost(true);
    setAddQuestion(false);
    setIsHovered(false);
    setDemo(!true);
  };

  const addQuestionStyle = {
    borderBottom: addQuestion ? "3px solid #2E69FF" : "none",
    backgroundColor:
      isHovered && createPost ? "rgba(0,0,0,0.05)" : "transparent",
  };

  const createPostStyle = {
    borderBottom: createPost ? "3px solid #2E69FF" : "none",
    backgroundColor:
      isHovered && addQuestion ? "rgba(0,0,0,0.05)" : "transparent",
  };

  const modalFooterStyle = {
    zIndex: "999",
    padding: "0.3rem 0.75rem",
    marginTop: "150px",
    display: "flex",
    justifyContent: createPost ? "spaceBetween !important" : "end !important",
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const dbUpVote = (userEmail, postId, liked) => {
    userContext.setPreventUser(true);
    axios
      .post(
        "/handle-upvote",
        {
          userEmail,
          postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (!liked) {
          likeAudio.current.currentTime = 0;
          likeAudio.current.play();
        }
        userContext.setPost(res.data.sendPost.reverse());
        userContext.setPreventUser(false);
      })
      .catch((err) => {
        userContext.setPreventUser(false);
        console.log(err);
      });
  };
  const dbDownVote = (userEmail, postId) => {
    userContext.setPreventUser(true);
    axios
      .post(
        "/handle-downvote",
        {
          userEmail,
          postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        userContext.setPost(res.data.sendPost.reverse());
        userContext.setPreventUser(false);
      })
      .catch((err) => {
        userContext.setPreventUser(false);
        console.log(err);
      });
  };

  const dbDeletePost = (userEmail, postId, postOwner) => {
    if (userEmail === postOwner) {
      axios
        .post(
          "/handle-delete-post",
          {
            userEmail,
            postId,
            postOwner,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          userContext.setPost(res.data.sendPost.reverse());
          setTimeout(() => {
            toast("Post deleted successfully", {
              type: "success",
              theme: "light",
              position: "bottom-center",
            });
          }, 0.001);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div id="home">
      <ToastContainer
        position="bottom-center"
        transition={Bounce}
        limit={5}
        theme="light"
      />
      <Spaces />
      <div className="home-center">
        <audio
          src={"https://res.cloudinary.com/dgm9yxyho/video/upload/v1690989041/like_yb6wla.mp4" || "../../public/audios/like.m4a"}
          ref={likeAudio}
        ></audio>
        <div className="user-ask">
          <div className="user-ask-top">
            <div className="profile">
              <img
                className="profile-picture"
                style={{ height: "35px", width: "35px" }}
                src={
                  userContext.user
                    ? userContext.user.profilePicture
                    : userContext.googleUser
                    ? userContext.googleUser.profilePicture
                    : "images/user.png"
                }
                alt=""
              />
            </div>
            <div className="ask-box">
              <input
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                type="text"
                id="ask-input"
                placeholder="What do you want to ask or share?"
                disabled
              />
            </div>
          </div>
          <div className="user-ask-bottom">
            <div
              className="ask-container"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  className="icon_svg-stroke"
                  stroke="#666"
                  strokeWidth="1.5"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g transform="translate(9 7)">
                    <path
                      d="M3 6v-.5A2.5 2.5 0 1 0 .5 3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <circle
                      className="icon_svg-fill_as_stroke"
                      fill="#666"
                      cx="3"
                      cy="8.5"
                      r="1"
                      stroke="none"
                      onClick={addQuestionHandler}
                    ></circle>
                  </g>
                  <path
                    d="M7.5 4h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3L9 22v-3H7.5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <h1>Ask</h1>
            </div>
            <Link className="answer-container" to={"/answer"}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g strokeWidth="1.5" fill="none" fillRule="evenodd">
                  <path
                    d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z"
                    className="icon_svg-stroke"
                    stroke="#666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    className="icon_svg-fill_as_stroke"
                    fill="#666"
                    d="m4.429 19.571 2.652-.884-1.768-1.768z"
                  ></path>
                  <path
                    d="M14.5 19.5h5v-5m-10-10h-5v5"
                    className="icon_svg-stroke"
                    stroke="#666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <h1>Answer</h1>
            </Link>
            <div
              className="post-container"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={createPostHandler}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z"
                    className="icon_svg-stroke"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    className="icon_svg-fill_as_stroke"
                    fill="#666"
                    d="m4.429 19.571 2.652-.884-1.768-1.768z"
                  ></path>
                </g>
              </svg>
              <h1>Post</h1>
            </div>
          </div>
        </div>
        {/* <h1 style={{ textAlign: "center" }}>loading data...</h1> */}
        {userContext.post ? (
          userContext.post.map((item, index) => {
            return item.contentType === "question" ? (
              <div className="user-que" key={index}>
                <div className="user-que-top">
                  <div className="user-que-top-left">
                    <div className="user-details">
                      <div className="user-profile-picture">
                        <img
                          height="36"
                          width="36"
                          src={item.ownerProfilePicture}
                          alt="profile"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="user-name">
                        <h1
                          className="user-name-text"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.ownerFirstName} {item.ownerLastName}{" "}
                          <span className="dot"> • </span>{" "}
                          <span className="follow">Follow</span>
                        </h1>
                        <h1
                          className="user-details-text"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.profession} <span className="dot"> • </span>
                        </h1>
                      </div>
                    </div>
                    <div
                      className="close-box"
                      onClick={() => {
                        dbDeletePost(
                          userContext.user
                            ? userContext.user.email
                            : userContext.googleUser
                            ? userContext.googleUser.email
                            : "temp@gmail.com",
                          item._id,
                          item.owner
                        );
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m16.243 7.757-8.486 8.486m8.486 0L7.757 7.757"
                          className="icon_svg-stroke"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                          stroke="#666"
                          strokeWidth="1.5"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="user-que-top-right"></div>
                </div>
                <div className="user-que-center">
                  <div className="user-que-asked-text">
                    <h1
                      dangerouslySetInnerHTML={{ __html: item.question }}
                      style={{
                        fontWeight: "400",
                        fontSize: "15px",
                        lineHeight: "21px",
                      }}
                    ></h1>
                  </div>
                </div>
                <div className="user-que-bottom">
                  <div className="user-que-bottom-left">
                    <div className="upvote-button">
                      <button
                        onClick={() =>
                          userContext.preventUser
                            ? ""
                            : dbUpVote(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com",
                                item._id,
                                item.upvoted.includes(
                                  userContext.user
                                    ? userContext.user.email
                                    : userContext.googleUser
                                    ? userContext.googleUser.email
                                    : "temp@gmail.com"
                                )
                                  ? true
                                  : false
                              )
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4 3 15h6v5h6v-5h6z"
                            className="icon_svg-stroke icon_svg-fill"
                            strokeWidth="1.8"
                            stroke="#2E69FF"
                            fill={
                              item.upvoted.includes(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com"
                              )
                                ? "#2E69FF"
                                : "none"
                            }
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <span className="upvote-text">Upvote</span>
                        <span className="dot"> • </span>
                        <span
                          className="upvote-count"
                          style={{
                            display: item.votes === 0 ? "none" : "block",
                          }}
                        >
                          {item.votes}
                        </span>
                      </button>
                    </div>
                    <div className="downvote-button">
                      <button
                        onClick={() =>
                          userContext.preventUser
                            ? ""
                            : dbDownVote(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com",
                                item._id
                              )
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m12 20 9-11h-6V4H9v5H3z"
                            className="icon_svg-stroke icon_svg-fill"
                            stroke={
                              item.downvoted.includes(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com"
                              )
                                ? "#B92B27"
                                : "#666"
                            }
                            fill={
                              item.downvoted.includes(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com"
                              )
                                ? "#B92B27"
                                : "none"
                            }
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      className="comment-icon"
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z"
                          className="icon_svg-stroke icon_svg-fill"
                          stroke="#666"
                          strokeWidth="1.5"
                          fill="none"
                        ></path>
                      </svg>
                    </div>
                    <div
                      className="share-icon"
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          className="icon_svg-stroke"
                          stroke="#666"
                          strokeWidth="1.5"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                        >
                          <path d="M19.748 10a8.003 8.003 0 0 0-15.496.002m.001 4.003a8.003 8.003 0 0 0 15.494 0"></path>
                          <path d="m2.5 7.697 1.197 3.289 3.289-1.197m14.5 6.5L20.289 13 17 14.197"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="user-que-bottom-right">
                    <div className="threedot-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.25 11.25a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm-7 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm14 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Z"
                          className="icon_svg-stroke"
                          fill="#666"
                          stroke="#666"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="user-que" key={index}>
                <div className="user-que-top">
                  <div className="user-que-top-left">
                    <div className="user-details">
                      <div className="user-profile-picture">
                        <img
                          height="36"
                          width="36"
                          src={item.ownerProfilePicture}
                          alt="profile"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="user-name">
                        <h1
                          className="user-name-text"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.ownerFirstName} {item.ownerLastName}{" "}
                          <span className="dot"> • </span>{" "}
                          <span className="follow">Follow</span>
                        </h1>
                        <h1
                          className="user-details-text"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.profession} <span className="dot"> • </span>
                        </h1>
                      </div>
                    </div>
                    <div
                      className="close-box"
                      onClick={() => {
                        dbDeletePost(
                          userContext.user
                            ? userContext.user.email
                            : userContext.googleUser
                            ? userContext.googleUser.email
                            : "temp@gmail.com",
                          item._id,
                          item.owner
                        );
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m16.243 7.757-8.486 8.486m8.486 0L7.757 7.757"
                          className="icon_svg-stroke"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                          stroke="#666"
                          strokeWidth="1.5"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="user-que-top-right"></div>
                </div>
                <div className="user-que-center">
                  <div className="user-que-asked-text">
                    <h1
                      dangerouslySetInnerHTML={{ __html: item.content }}
                      style={{
                        fontWeight: "400",
                        fontSize: "15px",
                        lineHeight: "21px",
                      }}
                    ></h1>
                  </div>
                </div>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt="post-image"
                    style={{ width: "100%" }}
                  />
                ) : (
                  ""
                )}

                <div className="user-que-bottom">
                  <div className="user-que-bottom-left">
                    <div className="upvote-button">
                      <button
                        onClick={() =>
                          userContext.preventUser
                            ? ""
                            : dbUpVote(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com",
                                item._id,
                                item.upvoted.includes(
                                  userContext.user
                                    ? userContext.user.email
                                    : userContext.googleUser
                                    ? userContext.googleUser.email
                                    : "temp@gmail.com"
                                )
                                  ? true
                                  : false
                              )
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4 3 15h6v5h6v-5h6z"
                            className="icon_svg-stroke icon_svg-fill"
                            strokeWidth="1.8"
                            stroke="#2E69FF"
                            fill={
                              item.upvoted.includes(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com"
                              )
                                ? "#2E69FF"
                                : "none"
                            }
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <span className="upvote-text">Upvote</span>
                        <span className="dot"> • </span>
                        <span
                          className="upvote-count"
                          style={{
                            display: item.votes === 0 ? "none" : "block",
                          }}
                        >
                          {item.votes}
                        </span>
                      </button>
                    </div>
                    <div className="downvote-button">
                      <button
                        onClick={() =>
                          userContext.preventUser
                            ? ""
                            : dbDownVote(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com",
                                item._id
                              )
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m12 20 9-11h-6V4H9v5H3z"
                            className="icon_svg-stroke icon_svg-fill"
                            stroke={
                              item.downvoted.includes(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com"
                              )
                                ? "#B92B27"
                                : "#666"
                            }
                            fill={
                              item.downvoted.includes(
                                userContext.user
                                  ? userContext.user.email
                                  : userContext.googleUser
                                  ? userContext.googleUser.email
                                  : "temp@gmail.com"
                              )
                                ? "#B92B27"
                                : "none"
                            }
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      className="comment-icon"
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z"
                          className="icon_svg-stroke icon_svg-fill"
                          stroke="#666"
                          strokeWidth="1.5"
                          fill="none"
                        ></path>
                      </svg>
                    </div>
                    <div
                      className="share-icon"
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          className="icon_svg-stroke"
                          stroke="#666"
                          strokeWidth="1.5"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                        >
                          <path d="M19.748 10a8.003 8.003 0 0 0-15.496.002m.001 4.003a8.003 8.003 0 0 0 15.494 0"></path>
                          <path d="m2.5 7.697 1.197 3.289 3.289-1.197m14.5 6.5L20.289 13 17 14.197"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="user-que-bottom-right">
                    <div className="threedot-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.25 11.25a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm-7 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm14 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Z"
                          className="icon_svg-stroke"
                          fill="#666"
                          stroke="#666"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <div className="spinner"></div>
          </div>
        )}
        {/* break */}
        {
          userContext.post?<><div className="user-que">
          <div className="user-que-top">
            <div className="user-que-top-left">
              <div className="user-details">
                <div className="user-profile-picture">
                  <img
                    height="36"
                    width="36"
                    src="https://qph.cf2.quoracdn.net/main-thumb-1593449950-50-kdaushotjzigpnleadiukvzddvodpewn.jpeg"
                    alt=""
                  />
                </div>
                <div className="user-name">
                  <h1 className="user-name-text">
                    Pavnesh kumar singh <span className="dot"> • </span>
                    <span className="follow">Follow</span>
                  </h1>
                  <h1 className="user-details-text">
                    Marketing (2019-present)<span className="dot"> • </span>
                    <span className="">Fri</span>
                  </h1>
                </div>
              </div>
              <div className="close-box">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m16.243 7.757-8.486 8.486m8.486 0L7.757 7.757"
                    className="icon_svg-stroke"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    stroke="#666"
                    strokeWidth="1.5"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="user-que-top-right"></div>
          </div>
          <div className="user-que-center">
            <div className="user-que-asked-text">
              <h1>Enumerate the differences between Java and JavaScript?</h1>
            </div>
            <div className="user-que-answer-text">
              <h1>
                Java is a complete programming language. In contrast, JavaScript
                is a coded program that can be introduced to HTML pages. These
                two languages are not at all inter-dependent and are designed
                for different intent. Java is an object-oriented programming
                (OOPS) or structured programming languages like C++ or C,
                whereas JavaScript is a client-side scripting language.
              </h1>
            </div>
          </div>
          <div className="user-que-bottom">
            <div className="user-que-bottom-left">
              <div className="upvote-button">
                <button onClick={() => handleClick(0)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4 3 15h6v5h6v-5h6z"
                      className="icon_svg-stroke icon_svg-fill"
                      strokeWidth="1.8"
                      stroke="#2E69FF"
                      fill={upVoteCounts[0].upvoted ? "#2E69FF" : "none"}
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="upvote-text">Upvote</span>
                  <span className="dot"> • </span>
                  <span className="upvote-count">{upVoteCounts[0].votes}</span>
                </button>
              </div>
              <div className="downvote-button">
                <button onClick={() => handleDownvote(0)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12 20 9-11h-6V4H9v5H3z"
                      className="icon_svg-stroke icon_svg-fill"
                      stroke={upVoteCounts[0].downvoted ? "#B92B27" : "#666"}
                      fill={upVoteCounts[0].downvoted ? "#B92B27" : "none"}
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                className="comment-icon"
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z"
                    className="icon_svg-stroke icon_svg-fill"
                    stroke="#666"
                    strokeWidth="1.5"
                    fill="none"
                  ></path>
                </svg>
              </div>
              <div
                className="share-icon"
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    className="icon_svg-stroke"
                    stroke="#666"
                    strokeWidth="1.5"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                  >
                    <path d="M19.748 10a8.003 8.003 0 0 0-15.496.002m.001 4.003a8.003 8.003 0 0 0 15.494 0"></path>
                    <path d="m2.5 7.697 1.197 3.289 3.289-1.197m14.5 6.5L20.289 13 17 14.197"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="user-que-bottom-right">
              <div className="threedot-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 11.25a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm-7 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm14 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Z"
                    className="icon_svg-stroke"
                    fill="#666"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="user-que">
          <div className="user-que-top">
            <div className="user-que-top-left">
              <div className="user-details">
                <div className="user-profile-picture">
                  <img
                    height="36"
                    width="36"
                    src="https://qph.cf2.quoracdn.net/main-qimg-1ee87e4294d1cd8560db4d0a7f1f0d18"
                    alt=""
                  />
                </div>
                <div className="user-name">
                  <h1 className="user-name-text">Amazon Web Services (AWS)</h1>
                  <h1 className="user-details-text">Sponsored</h1>
                </div>
              </div>
              <div className="close-box">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m16.243 7.757-8.486 8.486m8.486 0L7.757 7.757"
                    className="icon_svg-stroke"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    stroke="#666"
                    strokeWidth="1.5"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="user-que-top-right"></div>
          </div>
          <div className="user-que-center">
            <div className="user-que-asked-text">
              <h1>Amazon is how.</h1>
            </div>
            <div className="user-que-answer-text">
              <h1>
                AWS removes the complexity of building, training, and deploying
                machine learning models at any scale.
              </h1>
            </div>
          </div>
          <div className="sponsored-post">
            <img src="images/sponsoredpost.png" alt="" />
          </div>
          <div className="amazon-sign-up">
            <p className="invisible">Sign up</p>
            <p className="amazon-sign-up-text">Sign up</p>
            <div className="amazon-click-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9"
                  className="icon_svg-stroke"
                  stroke="#666"
                  strokeWidth="1.5"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <div className="user-que-bottom">
            <div className="user-que-bottom-left">
              <div className="upvote-button">
                <button onClick={() => handleClick(1)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4 3 15h6v5h6v-5h6z"
                      className="icon_svg-stroke icon_svg-fill"
                      strokeWidth="1.8"
                      stroke="#2E69FF"
                      fill={upVoteCounts[1].upvoted ? "#2E69FF" : "none"}
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="upvote-text">Upvote</span>
                  <span className="dot"> • </span>
                  <span className="upvote-count">{upVoteCounts[1].votes}</span>
                </button>
              </div>
              <div className="downvote-button">
                <button onClick={() => handleDownvote(1)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12 20 9-11h-6V4H9v5H3z"
                      className="icon_svg-stroke icon_svg-fill"
                      stroke={upVoteCounts[1].downvoted ? "#B92B27" : "#666"}
                      fill={upVoteCounts[1].downvoted ? "#B92B27" : "none"}
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="user-que-bottom-right">
              <div className="threedot-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 11.25a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm-7 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm14 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Z"
                    className="icon_svg-stroke"
                    fill="#666"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="user-que">
          <div className="user-que-top">
            <div className="user-que-top-left">
              <div className="user-details">
                <div className="user-profile-picture">
                  <img
                    height="36"
                    width="36"
                    src="https://qph.cf2.quoracdn.net/main-thumb-54600830-50-dmmbxbqepzavdcpiubyjwsnzgvyhfoen.jpeg"
                    alt=""
                  />
                </div>
                <div className="user-name">
                  <h1 className="user-name-text">
                    Shyam Sundar Mishra<span className="dot"> • </span>
                    <span className="follow">Follow</span>
                  </h1>
                  <h1 className="user-details-text">
                    Studied at Indian Institute of Technology, Kharagpur (IIT
                    KGP) (Graduated 1998)<span className="dot"> • </span>
                    <span className="">Fri</span>
                  </h1>
                </div>
              </div>
              <div className="close-box">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m16.243 7.757-8.486 8.486m8.486 0L7.757 7.757"
                    className="icon_svg-stroke"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    stroke="#666"
                    strokeWidth="1.5"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="user-que-top-right"></div>
          </div>
          <div className="user-que-center">
            <div className="user-que-asked-text">
              <h1>Is JavaScript a case-sensitive language?</h1>
            </div>
            <div className="user-que-answer-text">
              <h1>
                Yes, JavaScript is a case sensitive language. The language
                keywords, variables, function names, and any other identifiers
                must always be typed with a consistent capitalization of
                letters.
              </h1>
            </div>
          </div>
          <div className="user-que-bottom">
            <div className="user-que-bottom-left">
              <div className="upvote-button">
                <button onClick={() => handleClick(2)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4 3 15h6v5h6v-5h6z"
                      className="icon_svg-stroke icon_svg-fill"
                      strokeWidth="1.8"
                      stroke="#2E69FF"
                      fill={upVoteCounts[2].upvoted ? "#2E69FF" : "none"}
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="upvote-text">Upvote</span>
                  <span className="dot"> • </span>
                  <span className="upvote-count">{upVoteCounts[2].votes}</span>
                </button>
              </div>
              <div className="downvote-button">
                <button onClick={() => handleDownvote(2)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12 20 9-11h-6V4H9v5H3z"
                      className="icon_svg-stroke icon_svg-fill"
                      stroke={upVoteCounts[2].downvoted ? "#B92B27" : "#666"}
                      fill={upVoteCounts[2].downvoted ? "#B92B27" : "none"}
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                className="comment-icon"
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.071 18.86c4.103 0 7.429-3.102 7.429-6.93C19.5 8.103 16.174 5 12.071 5s-7.429 3.103-7.429 6.93c0 1.291.379 2.5 1.037 3.534.32.501-1.551 3.058-1.112 3.467.46.429 3.236-1.295 3.803-.99 1.09.585 2.354.92 3.701.92Z"
                    className="icon_svg-stroke icon_svg-fill"
                    stroke="#666"
                    strokeWidth="1.5"
                    fill="none"
                  ></path>
                </svg>
              </div>
              <div
                className="share-icon"
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    className="icon_svg-stroke"
                    stroke="#666"
                    strokeWidth="1.5"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                  >
                    <path d="M19.748 10a8.003 8.003 0 0 0-15.496.002m.001 4.003a8.003 8.003 0 0 0 15.494 0"></path>
                    <path d="m2.5 7.697 1.197 3.289 3.289-1.197m14.5 6.5L20.289 13 17 14.197"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="user-que-bottom-right">
              <div className="threedot-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 11.25a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm-7 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Zm14 0a1.06 1.06 0 1 0 1.5 1.5 1.06 1.06 0 0 0-1.5-1.5Z"
                    className="icon_svg-stroke"
                    fill="#666"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div></>:""
        }
      </div>
      <Adbox />
      <Modal />
    </div>
  );
};

export default Home;
