import React from "react";
import { Link } from "react-router-dom";
import "../componentscss/Spaces.css";

const Spaces = () => {
  return (
    <div className="home-left">
      <div className="spaces-div">
        <div className="create-space">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              borderRadius: "50%",
              backgroundColor: "#e3e3e3",
              fontWeight: "600",
              opacity: "1",
            }}
          >
            <path
              d="M4.5 12h15M12 4.5v15"
              className="icon_svg-stroke"
              stroke="#636466"
              strokeWidth="2.6"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              style={{
                fontWeight: "800",
              }}
            ></path>
          </svg>
          <Link to="#" className="spaces-links">
            Create Space
          </Link>
        </div>
        <div className="cinema-talk">
          <img
            src="https://qph.cf2.quoracdn.net/main-thumb-ti-3555383-50-xxxwafpoplngauaywtdkmfzugbwqqyht.jpeg"
            alt=""
            height="20"
            width="20"
            className="spaces-images"
          />
          <Link to="#" className="spaces-links">
            Cinema talk
          </Link>
        </div>
        <div className="cinema-talk">
          <img
            src="https://qph.cf2.quoracdn.net/main-thumb-ti-1578964-50-wluqlsrxuhiiyyehaqquhlcysqgzbbez.jpeg"
            alt=""
            height="20"
            width="20"
            className="spaces-images"
          />
          <Link to="#" className="spaces-links">
            Youtube
          </Link>
        </div>
        <div className="cinema-talk">
          <div className="notifyspaces"></div>
          <img
            src="https://qph.cf2.quoracdn.net/main-thumb-ti-347990-50-yhoxfgfgbpzprorwzumdngxcdqrdmkay.jpeg"
            alt=""
            height="20"
            width="20"
            className="spaces-images"
          />
          <Link to="#" className="spaces-links">
            Travel Guide
          </Link>
        </div>
        <div className="cinema-talk">
          <div className="notifyspaces"></div>
          <img
            src="https://qph.cf2.quoracdn.net/main-thumb-ti-1575805-50-uvrobwdwkyudfvbeozkfeezxfdopsduy.jpeg"
            alt=""
            height="20"
            width="20"
            className="spaces-images"
          />
          <Link to="#" className="spaces-links">
            SEO
          </Link>
        </div>
        <div className="cinema-talk">
          <img
            src="https://qph.cf2.quoracdn.net/main-thumb-ti-2061080-100-wenxdnsaxhmoqgcsffeqlwngjxjhpszf.jpeg"
            alt=""
            height="20"
            width="20"
            className="spaces-images"
          />
          <Link to="#" className="spaces-links">
            Quora creators
          </Link>
        </div>
        <div className="cinema-talk">
          <img
            src="https://qsf.cf2.quoracdn.net/-4-ans_frontend_assets.images.tribes.defaults.space_icon_purple.png-26-6ea9822273dc841e.png"
            alt=""
            height="20"
            width="20"
            className="spaces-images"
          />
          <Link to="#" className="spaces-links">
            Blogging pro tips
          </Link>
        </div>
        <div className="cinema-talk">
          <div className="notifyspaces"></div>
          <img
            src="https://qph.cf2.quoracdn.net/main-thumb-ti-3423-100-zlrcplhmtyjmiiucdihldvrgezpqwotn.jpeg"
            alt=""
            height="20"
            width="20"
            className="spaces-images"
          />
          <Link to="#" className="spaces-links">
            Quora product
          </Link>
        </div>
        <div className="cinema-talk">
          <div className="notifyspaces"></div>
          <img
            src="https://qph.cf2.quoracdn.net/main-thumb-ti-809-100-nkvxwqeppcbrzbhtgyvsbcuftlxyrfwr.jpeg"
            alt=""
            height="20"
            width="20"
            className="spaces-images"
          />
          <Link to="#" className="spaces-links">
            Essay
          </Link>
        </div>
      </div>
      <hr style={{ color: "gray", width: "80%" }} />
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
    </div>
  );
};

export default Spaces;
