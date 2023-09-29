import React, { useContext, useEffect } from "react";
import Spaces from "../components/Spaces";
import Adbox from "../components/Adbox";
import "../pagescss/Following.css";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/usercontext";
import axios from "axios";

const Following = () => {
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
    <div id="following">
      <ToastContainer
        position="bottom-center"
        transition={Bounce}
        limit={5}
        theme="light"
      />
      <Spaces />
      <div className="following-center">
        <div className="following-center-top">
          <div className="image">
            <img
              src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.all_caught_up_feed_lightmode.png-26-1b95f406729630f5.png"
              alt=""
            />
          </div>
          <div className="following-headline">
            <h6>You're all caught up</h6>
          </div>
          <div className="following-description">
            <h6>
              Follow more Spaces to discover new stories in your feed. You can
              also visit <Link to="/">Home</Link>
            </h6>
          </div>
        </div>
        <div className="following-bottom">
          <div className="following-bottom-headline">
            <h6>Discover Spaces</h6>
          </div>
          <h6 className="spaces-might-like">Spaces you might like</h6>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1586937-50-eacomyyoiwvapnorsknliswmngvehjly.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>The Intelligent Investor</h6>
              </div>
              <div className="space-followers">
                <h6>183.3K followers</h6>
              </div>
              <div className="space-description">
                <h6>Everything About Stock Market & Finance.</h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-3549702-50-vuaptewjbzrdbhpegzqqyfiokbxhghfd.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>ChatGPT Community</h6>
              </div>
              <div className="space-followers">
                <h6>35.7K followers</h6>
              </div>
              <div className="space-description">
                <h6>
                  The space is focused on discussing & sharing knowledge about
                  ChatGPT OpenAI.
                </h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1578964-50-wluqlsrxuhiiyyehaqquhlcysqgzbbez.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>Youtube</h6>
              </div>
              <div className="space-followers">
                <h6>54.7K followers</h6>
              </div>
              <div className="space-description">
                <h6>
                  All about YouTube. Share anything interesting & entertaining
                  realted to YouTube.
                </h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1575849-50-lmjyhriprhrelnehcpyipknfuzbchwlz.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>SEO Tips & Trends</h6>
              </div>
              <div className="space-followers">
                <h6>85.3K followers</h6>
              </div>
              <div className="space-description">
                <h6>
                  A Space for SEO (Search Engine Optimization) and
                  DigitalMarketing.
                </h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1594866-50-ftqnzqxqqkwiykmkpwfxitviaevwqluk.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>IT Jobs & Careers</h6>
              </div>
              <div className="space-followers">
                <h6>120.7K followers</h6>
              </div>
              <div className="space-description">
                <h6>
                  All About IT Jobs & Careers : for freshers & experienced
                </h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1592794-50-wzjlwuwwavcojxcfuuqwjsljrlrelicp.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>Blogging Tips & Tricks</h6>
              </div>
              <div className="space-followers">
                <h6>1.5K followers</h6>
              </div>
              <div className="space-description">
                <h6>
                  A centralised space for Blogging Tips For Newbie Bloggers.
                </h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1589834-50-dmnkslyfxzfpyaozgajcrvgjmymnsvmk.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>Business & Marketing</h6>
              </div>
              <div className="space-followers">
                <h6>320.2K followers</h6>
              </div>
              <div className="space-description">
                <h6>
                  1)Business Ideas 2)Small Business Start-ups 3) Invest and Earn
                  4) Buy and sell
                </h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1580340-50-pdqokbcikqwzrsfjfxsysororggefmnp.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>Digital Marketing Hub</h6>
              </div>
              <div className="space-followers">
                <h6>105.3K followers</h6>
              </div>
              <div className="space-description">
                <h6>Share Your Digital Marketing Related stuff Here..</h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-347990-50-yhoxfgfgbpzprorwzumdngxcdqrdmkay.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>Travel Guide</h6>
              </div>
              <div className="space-followers">
                <h6>195.7K followers</h6>
              </div>
              <div className="space-description">
                <h6>
                  Discover travel Destination With Magical Holiday Rich Culture
                  Nature & Wildlife
                </h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1727348-50-ebrwoyvlkxmuamkzioflbfpsiefqshsk.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>Cars & Bikes - (Automobiles)</h6>
              </div>
              <div className="space-followers">
                <h6>4.4K followers</h6>
              </div>
              <div className="space-description">
                <h6>Everything bout Cars/Bikes/Any other Automobiles</h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1575805-50-uvrobwdwkyudfvbeozkfeezxfdopsduy.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>SEO</h6>
              </div>
              <div className="space-followers">
                <h6>208K followers</h6>
              </div>
              <div className="space-description">
                <h6>All about Search engine optimisation.</h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-862-50-wpftnbhmeklorazswextfhvxnjxiellm.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>Daily Dose Of Vocabulary</h6>
              </div>
              <div className="space-followers">
                <h6>383.8K followers</h6>
              </div>
              <div className="space-description">
                <h6>All about words.</h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-2242951-50-lbtvofmfvxoofpqkkwdxqjnhyjqaqtsx.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>YouTube Free Booster</h6>
              </div>
              <div className="space-followers">
                <h6>428K followers</h6>
              </div>
              <div className="space-description">
                <h6>Promote Your YouTube channel and Videos Freely</h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-1578897-50-tnvanirvjvniwmnsfnoadmnrlmaegxlo.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>Earn Money Online</h6>
              </div>
              <div className="space-followers">
                <h6>103K followers</h6>
              </div>
              <div className="space-description">
                <h6>earn money while you sleep</h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="discover-spaces-box">
            <div className="discover-image left">
              <img
                src="https://qph.cf2.quoracdn.net/main-thumb-ti-2256-50-letkpfgwqvevkiucpspnxpsmiwmdwcca.jpeg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="discover-space-name">
                <h6>HISTORY OF INDIA</h6>
              </div>
              <div className="space-followers">
                <h6>454.7K followers</h6>
              </div>
              <div className="space-description">
                <h6>
                  Indian history is distorted. Here people can write about real
                  Indian history
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Adbox />
      <Modal />
    </div>
  );
};

export default Following;
