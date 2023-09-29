import React, { useContext, useEffect } from "react";
import Adbox from "../components/Adbox";
import "../pagescss/Notifications.css";
import Notification from "../components/Notification";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/usercontext";
import axios from "axios";
axios
const Notifications = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(()=>{
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
  },[])
  return (
    <div id="notificationsbox">
      <ToastContainer
        position="bottom-center"
        transition={Bounce}
        limit={5}
        theme="light"
      />
      <div className="notifications-left">
        <div className="filters">
          <h1>Filters</h1>
        </div>
        <hr />
        <div className="all-notifications">
          <h1>All Notifications</h1>
        </div>
        <div className="stories">
          <h1>Stories</h1>
        </div>
        <div className="questions-notify">
          <h1 className="questions">
            Questions
            <div className="questions-notify-count">
              <h1>2</h1>
            </div>
          </h1>
        </div>
        <div className="spaces-notify">
          <h1 className="spaces">
            Spaces
            <div className="spaces-notify-count">
              <h1>1</h1>
            </div>
          </h1>
        </div>
        <div className="people-updates">
          <h1>People updates</h1>
        </div>
        <div className="comments-and-mentions">
          <h1>Comments and mentions</h1>
        </div>
        <div className="upvotes">
          <h1>Upvotes</h1>
        </div>
        <div className="yourcontent">
          <h1>Your content</h1>
        </div>
        <div className="yourprofile">
          <h1>Your profile</h1>
        </div>
        <div className="announcements">
          <h1>Announcements</h1>
        </div>
        <div className="earnings">
          <h1>Earnings</h1>
        </div>
        <div className="subscriptions">
          <h1>Subscriptions</h1>
        </div>
      </div>
      <div className="notifications-center">
        <div className="notifications-center-top">
          <div className="notifications-center-top-left">
            <h1>Notifications</h1>
          </div>
          <div className="notifications-center-top-right">
            <p>
              <span className="markbox">Mark All As Read</span>
              <span className="dot">•</span>
              <span className="settings">Settings</span>
            </p>
          </div>
        </div>
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-ti-3529749-100-ysvxpqfaeenoawnhmaxtdxmvdkboyurm.jpeg"
          spacename="Indian's Online Friend's Space"
          posttime="12h ago"
          useraskedquestion="What are the cheapest online shopping sites?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-377658453-50-zxpowlpyeucdukytnfltiwqwdnqahdkb.jpeg"
          spacename="Indian Train Space"
          posttime="17h ago"
          useraskedquestion="If the Orissa train accident was a sabotage, wouldn't someone have taken responsibility for it by now?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-1249729566-50-hgikdkqbalyzlyrqifvnreonmahxwrru.jpeg"
          spacename="Javasript Mastery Space"
          posttime="11h ago"
          useraskedquestion="How has programming instruction been embedded to understand and execute?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-340973179-50-krpyfosvfbecdtxcqlnvrhgbovdegyvo.jpeg"
          spacename="Mathematics Questions Space"
          posttime="14h ago"
          useraskedquestion="What are the zeroes of the quadratic polynomial 3x^2-75?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-2013803224-50-euldfllgythsvcbashwgvryujgwforme.jpeg"
          spacename="Indian TCS Friend's Space"
          posttime="20h ago"
          useraskedquestion="My joining is on the 7th of July in TCS. Will I get a salary of a full month at the end of the month?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-25905650-50-ztgvheptwhqqzkthkgsykpxwabfflulu.jpeg"
          spacename="Make Money Online Space"
          posttime="18h ago"
          useraskedquestion="How can I earn 500-1,000 rupees daily online?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-93851532-50-grkpxnuivvdvijistxqyrlnibvzhodvv.jpeg"
          spacename="Indian Coders Space"
          posttime="18h ago"
          useraskedquestion="Why am I getting the error of “cannot set property of undefined” in JavaScript?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-63922819-50-wofphzmkbknegrvwckyzuiwxpuvgaucn.jpeg"
          spacename="Travelling Help Space"
          posttime="15h ago"
          useraskedquestion="Is a visa interview required for obtaining a visa?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-269923749-50-cnqufqezhtstbeorpgosczzzkvykrbul.jpeg"
          spacename="Backend Node JS Space"
          posttime="12h ago"
          useraskedquestion="What is the best Node.js game server framework (ex: Colyseus)?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-2142305331-50-zhefskixgvtqvvhqszehksnnwfajusnb.jpeg"
          spacename="Javascript Mastery Space"
          posttime="20h ago"
          useraskedquestion="How do you convert a JavaScript Object Notation (JSON) array to a table?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-93307513-50-ypfeoshehtzzjcljolqtpsxbxuyntejk.jpeg"
          spacename="Banglore Tech Support Space"
          posttime="14h ago"
          useraskedquestion="Is a 16 LPA salary too low for a software engineer with 6 years of experience in Banglore?"
        />
        <hr />
        <Notification
          userprofilepic="https://qph.cf2.quoracdn.net/main-thumb-143074757-50-lofjplbirumperghpkjtzjwbunljiqiu.jpeg"
          spacename="Edureka Space"
          posttime="15h ago"
          useraskedquestion="What is your review of Edureka (company)?"
        />
      </div>
      <Adbox />
      <Modal />
    </div>
  );
};

export default Notifications;
