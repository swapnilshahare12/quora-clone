import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "../pagescss/Answer.css";
import Questionforyou from "../components/Questionforyou";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import UserContext from "../context/usercontext";
import axios from "axios";

const Answer = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
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
                profession:res.data.userDetails.profession
              });
            } else {
              userContext.setUser({
                firstName: res.data.userDetails.firstName,
                lastName: res.data.userDetails.lastName,
                email: res.data.userDetails.email,
                profilePicture: res.data.userDetails.profilePicture,
                profession:res.data.userDetails.profession
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
  return (
    <div id="ans">
      <ToastContainer
        position="bottom-center"
        transition={Bounce}
        limit={5}
        theme="light"
      />
      <div className="answer-left">
        <div className="questions">
          <h1>Questions</h1>
        </div>
        <hr />
        <div className="questions-for-you">
          <h1>Questions for you</h1>
        </div>
        <div className="answer-requests">
          <h1>Answer requests</h1>
        </div>
        <div className="drafts">
          <h1>
            Drafts
            <div className="drafts-count">
              <h1>1</h1>
            </div>
          </h1>
        </div>
      </div>
      <div className="answer-center">
        <div className="answer-center-top">
          <div className="star-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12 16.618-4.944 2.599L8 13.71 4 9.812l5.528-.803L12 4l2.472 5.01L20 9.811l-4 3.9.944 5.505z"
                name="icon_svg-stroke icon_svg-fill"
                stroke="white"
                strokeWidth="1.5"
                fill="white"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <div className="ans-center-questions-for-you">
            <h1>Questions for you</h1>
          </div>
        </div>
        <hr />
        <Questionforyou
          question="What is 50×6+10=?"
          anscount="No answer yet"
          followedtime="Last followed 21m"
        />
        <hr />
        <Questionforyou
          question="What is (20-10) 680×0+2 (11-2) =?"
          anscount="No answer yet"
          followedtime="Last followed 37m"
        />
        <hr />
        <Questionforyou
          question="What is the answer 12÷12+12÷12=?"
          anscount="2 answers"
          followedtime="Last followed 28m"
        />
        <hr />
        <div className="more">
          <h1>
            More
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m5 8.5 7 7 7.005-7"
                className="icon_svg-stroke"
                stroke="#666"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              ></path>
            </svg>
          </h1>
        </div>
        <hr />
        <div className="answer-bottom-last">
          <div className="answer-bottom-last-left">
            <h1>Add 5 topics you know about</h1>
            <p>You’ll get better questions if you add more specific topics.</p>
            <div className="add-topics">
              <h1>Add topics</h1>
            </div>
          </div>
          <div className="answer-bottom-last-right">
            <img
              src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.static_about_page.light_mode.GatherAroundAQuestion_LM.png-26-a377318c55ce1d10.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="answer-right">
        <div className="answer-right-top">
          <h1>Topics you know about</h1>
          <div className="pencil-icon">
            <svg
              width="24"
              height="24"
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
          </div>
        </div>
        <hr />
        <div className="answer-right-bottom">
          <div className="chatgpt">
            <div className="chatgpt-image">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-3549702-50-vuaptewjbzrdbhpegzqqyfiokbxhghfd.jpeg"
                alt=""
              />
            </div>
            <h1>ChatGPT Community</h1>
          </div>
          <div className="chatgpt">
            <div className="chatgpt-image">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1575849-50-lmjyhriprhrelnehcpyipknfuzbchwlz.jpeg"
                alt=""
              />
            </div>
            <h1>SEO Tips & Trends</h1>
          </div>
          <div className="chatgpt">
            <div className="chatgpt-image">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1580340-50-pdqokbcikqwzrsfjfxsysororggefmnp.jpeg"
                alt=""
              />
            </div>
            <h1>Digital Marketing Hub</h1>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Answer;
