import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/usercontext";

const Modal = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const cancleBtn = useRef();
  const userContext = useContext(UserContext);
  useEffect(() => {
    const editor = new Quill(
      editorRef.current,
      {
        theme: "bubble",
        placeholder: "Say something...",
      },
      []
    );

    quillRef.current = editor; // Save the quill instance to quillRef

    // Add 'bold' toolbar button
    const toolbar = editor.getModule("toolbar");
    toolbar.addHandler("bold", handleBoldClick);

    // Handle content change
    editor.on("text-change", handleContentChange);

  }, []);




  const handleBoldClick = () => {
    const quill = quillRef.current;
    if (quill) {
      const selection = quill.getSelection();
      if (selection) {
        const selectedText = quill.getText(selection.index, selection.length);
        const isBold = quill.getFormat(selection).bold;
        quill.format("bold", !isBold);
      }
    }
  };

  const handleContentChange = () => {
    const quill = quillRef.current;
    if (quill) {
      const content = quill.root.innerHTML;
      // You can use the 'content' variable to store or process the editor content.
      setContent(content); // Set the content to show in the output div
      // setPostBtnDisabled(true)
      const modifiedString = content.substring(3, content.length - 4);
      if (modifiedString.trim() === "") {
        setPostBtnDisabled(true);
      } else {
        setPostBtnDisabled(false);
      }
    }
  };


  const [content, setContent] = useState("<p><br></p>");

  const [addQuestion, setAddQuestion] = useState(true);
  const [question, setQuestion] = useState("");
  const [createPost, setCreatePost] = useState(false);
  const [demo, setDemo] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [file, setfile] = useState(undefined);
  const [spinner, setSpinner] = useState(false);
  const [postBtnDisabled, setPostBtnDisabled] = useState(true);

  const filehandler = (e) => {
    const userFile = e.target.files[0];
    setfile(userFile);
  };

  const addQuestionHandler = () => {
    quillRef.current.root.innerHTML = "";
    setfile(undefined);
    setContent("<p><br></p>");
    setAddQuestion(true);
    setCreatePost(false);
    setIsHovered(false);
    setDemo(!true);
  };

  const createPostHandler = () => {
    setQuestion("");
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
    display: "flex",
    justifyContent: createPost ? "spaceBetween !important" : "end !important",
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleData = () => {
    setSpinner(true);
    userContext.setPreventUser(true);
    axios
      .post(
        "/register-post",
        {
          content,
          question,
          file,
          owner: userContext.user
            ? userContext.user.email
            : userContext.googleUser.email,
          ownerFirstName: userContext.user
            ? userContext.user.firstName
            : userContext.googleUser.firstName,
          ownerLastName: userContext.user
            ? userContext.user.lastName
            : userContext.googleUser.lastName,
          ownerProfilePicture: userContext.user
            ? userContext.user.profilePicture
            : userContext.googleUser.profilePicture,
          profession: userContext.user
            ? userContext.user.profession
            : userContext.googleUser.profession,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.data.success) { 
          setQuestion("");
          setfile(undefined);
          quillRef.current.root.innerHTML = "";
          userContext.setPost(res.data.sendPost.reverse());
          userContext.setPreventUser(false);
          navigate("/");
          cancleBtn.current.click();
          userContext.homePage.current.click();
          setTimeout(() => {
            toast("post is created successfully", {
              type: "success",
              theme: "light",
              position: "bottom-center",
            });
          }, 0.001);
          setSpinner(false);
        }
      })
      .catch((err) => {
        userContext.setPreventUser(false);
        cancleBtn.current.click();
        navigate("/");
        userContext.homePage.current.click();
        setTimeout(() => {
          toast("Internal Server Error", {
            type: "error",
            theme: "light",
            position: "bottom-center",
          });
        }, 0.001);
        setSpinner(false);
      });
  };
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        transition={Bounce}
        limit={5}
        theme="light"
      />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" id="modal-dialog">
          <div className="modal-content" id="modal-content">
            <div className="modal-header d-block" id="modal-header">
              <div className="first-header">
                <div className="close-btn">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div
                  className="everyone"
                  style={{ display: createPost ? "flex" : "none" }}
                >
                  <div className="everyone-globe-i">
                    <svg
                      width="20"
                      height="20"
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
                  </div>
                  <div className="everyone-heading">
                    <h6>Everyone</h6>
                  </div>
                  <div className="everyonedownarrow">
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
                  </div>
                </div>
                <div
                  className="everyone"
                  style={{ visibility: "hidden" }}
                ></div>
              </div>

              <div className="top-second-box">
                <div
                  className="addquestionbox"
                  onClick={addQuestionHandler}
                  style={addQuestionStyle}
                  onMouseEnter={!addQuestion ? handleMouseEnter : null}
                  onMouseLeave={handleMouseLeave}
                >
                  <h6 className="add-question">Add Question</h6>
                </div>
                <div
                  className="createpostbox"
                  onClick={createPostHandler}
                  style={createPostStyle}
                  onMouseEnter={!createPost ? handleMouseEnter : null}
                  onMouseLeave={handleMouseLeave}
                >
                  <h6 className="create-post">Create Post</h6>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="top-center-box">
                <div
                  className="top-center-first-inner-box"
                  style={{ display: addQuestion ? "flex" : "none" }}
                >
                  <div className="imagediv">
                    {/* <img
                      src="https://qph.cf2.quoracdn.net/main-thumb-688308262-200-wnmimpsjowztnnzhyhggtbrkmmnekrjr.jpeg"
                      alt=""
                      height="18"
                      width="18"
                    /> */}
                    <img
                      src={
                        userContext.user
                          ? userContext.user.profilePicture
                          : userContext.googleUser
                          ? userContext.googleUser.profilePicture
                          : "images/user.png"
                      }
                      alt="profile"
                      height="18"
                      width="18"
                    />
                  </div>
                  <div className="pause-icon-div">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m18.5 12-11 7V5z"
                        className="icon_svg-stroke icon_svg-fill"
                        strokeWidth="1.5"
                        stroke="#666"
                        fill="#636466"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div className="audience-div">
                    <div className="audience-icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          className="icon_svg-stroke"
                          transform="translate(4 4)"
                          stroke="#666"
                          strokeWidth="1.5"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <path d="M10 15.5a5 5 0 0 0-10 0m17 0a5 5 0 0 0-7.032-4.57"></path>
                          <circle cx="5" cy="4" r="4"></circle>
                          <path d="M9.678 7.258A4 4 0 1 0 9.791.665"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="audience-text">
                      <h6>Public</h6>
                    </div>
                    <div className="downarrowbtnicon">
                      <svg
                        width="18"
                        height="18"
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
                    </div>
                  </div>
                </div>
                <div
                  className="top-center-second-inner-box"
                  style={{ display: addQuestion ? "flex" : "none" }}
                >
                  <textarea
                    name=""
                    id=""
                    placeholder='Start your question with "What", "How", "Why", etc.'
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="top-center-first-post-inner-box">
                  <div
                    className="user-profile"
                    style={{ display: createPost ? "flex" : "none" }}
                  >
                    <img
                      src={
                        userContext.user
                          ? userContext.user.profilePicture
                          : userContext.googleUser
                          ? userContext.googleUser.profilePicture
                          : "images/user.png"
                      }
                      alt="profile"
                      height="40"
                      width="40"
                    />
                    <div
                      className="user-details"
                      style={{ display: createPost ? "block" : "none" }}
                    >
                      <h6
                        className="user-name"
                        style={{ textTransform: "capitalize" }}
                      >
                        {userContext.user
                          ? `${userContext.user.firstName} ${userContext.user.lastName}`
                          : userContext.googleUser
                          ? `${userContext.googleUser.firstName} ${userContext.googleUser.lastName}`
                          : "User Name"}
                      </h6>
                      <div className="credential">
                        <h6>Choose credential</h6>
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
                              stroke="#666"
                              strokeWidth="1.5"
                              fill="none"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    name=""
                    ref={editorRef}
                    id="post-textarea"
                    placeholder="Say something..."
                    style={{ display: createPost ? "flex" : "none" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="filenameshow"
              style={{ display: createPost ? "flex" : "none" }}
            >
              <h1 className="filenameshowtext">{file ? file.name : ""}</h1>
            </div>
            <div className="modal-footer" style={modalFooterStyle}>
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                ref={cancleBtn}
                style={{
                  display: addQuestion ? "flex" : "none",
                  fontWeight: "600",
                  color: "#636466",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-pill"
                style={{
                  display: addQuestion ? "flex" : "none",
                  fontWeight: "600",
                }}
                disabled={question !== "" && question.trim() ? false : true}
                onClick={userContext.preventUser?"":handleData}
              >
                <div
                  className="spinner"
                  style={{ display: spinner ? "block" : "none" }}
                ></div>
                <span style={{ display: spinner ? "none" : "block" }}>
                  Add question
                </span>
              </button>
              <div
                className="modal-footer-left"
                style={{ display: createPost ? "flex" : "none" }}
              >
                <button
                  className="font-bold-icon"
                  title="Bold"
                  onClick={handleBoldClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="icon_svg-fill_as_stroke"
                      d="m10.526 17.352-1.002-3.031H5.162l-1.018 3.031H2L6.205 5.5h2.382l4.214 11.852h-2.275zM7.281 7.759l-1.626 4.887h3.376l-1.61-4.887h-.14zm10.415 8.14c1.232 0 2.152-.797 2.152-1.84v-.715l-2.029.131c-1.142.074-1.676.485-1.676 1.216 0 .756.649 1.207 1.552 1.207zm-.6 1.602c-1.733 0-2.973-1.051-2.973-2.694 0-1.626 1.224-2.563 3.409-2.694l2.316-.14v-.756c0-.879-.591-1.372-1.692-1.372-.936 0-1.577.329-1.766.936h-1.922c.164-1.585 1.651-2.595 3.786-2.595 2.308 0 3.606 1.125 3.606 3.031v6.136h-1.963V16.12h-.14c-.501.871-1.487 1.38-2.661 1.38z"
                      fill="#666"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="upload-image-icon">
                  <button className="upload-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <defs>
                        <path d="M5 4.5v14H2V.5h16.5v4H5z" id="a"></path>
                      </defs>
                      <g
                        fill="#666"
                        fillRule="evenodd"
                        className="icon_svg-fill_as_stroke"
                      >
                        <g fillRule="nonzero">
                          <path d="M8 7a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-12A.5.5 0 0 0 20 7H8zm0-1.25h12a1.75 1.75 0 0 1 1.75 1.75v12A1.75 1.75 0 0 1 20 21.25H8a1.75 1.75 0 0 1-1.75-1.75v-12A1.75 1.75 0 0 1 8 5.75zM17.5 9a1 1 0 1 0 0 2 1 1 0 1 0 0-2zm0-1.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 1 1 0-4.5z"></path>
                          <path d="M7.511 16.316V20h13v-3.682c-1.73-.926-2.81-1.389-3.241-1.389-.647 0-2.606 1.388-3.257 1.389s-2.609-2.299-3.252-2.299c-.429 0-1.512.766-3.25 2.298zm6.674-1.353.867-.443c1.296-.69 1.629-.842 2.217-.842.732 0 1.874.489 3.831 1.537a1.25 1.25 0 0 1 .66 1.102V20a1.25 1.25 0 0 1-1.25 1.25h-13A1.25 1.25 0 0 1 6.261 20v-3.684a1.25 1.25 0 0 1 .423-.938c2.065-1.82 3.183-2.61 4.077-2.61.523 0 .911.21 1.443.613.271.205.489.392 1.007.849l.866.732.041.031.067-.03z"></path>
                        </g>
                        <mask id="b" fill="#fff">
                          <use xlinkHref="#a"></use>
                        </mask>
                        <path
                          d="M4.5 3.5A.5.5 0 0 0 4 4v12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5h-12zm0-1.25h12A1.75 1.75 0 0 1 18.25 4v12a1.75 1.75 0 0 1-1.75 1.75h-12A1.75 1.75 0 0 1 2.75 16V4A1.75 1.75 0 0 1 4.5 2.25z"
                          fillRule="nonzero"
                          mask="url(#b)"
                        ></path>
                      </g>
                    </svg>
                  </button>
                  <input
                    type="file"
                    name="myfile"
                    accept=".jpeg,.jpg,.png"
                    title="Post Image"
                    onChange={filehandler}
                  />
                </div>
              </div>
              <div
                className="modal-footer-right"
                style={{ display: createPost ? "flex" : "none" }}
              >
                <button
                  type="button"
                  className="btn btn-primary rounded-pill"
                  disabled={
                    file !== undefined
                      ? false
                      : content !== "<p><br></p>"
                      ? postBtnDisabled
                      : true
                  }
                  onClick={userContext.preventUser?"":handleData}
                >
                  <div
                    className="spinner"
                    style={{ display: spinner ? "block" : "none" }}
                  ></div>
                  <span
                    style={{
                      display: spinner ? "none" : "block",
                      fontWeight: 500,
                    }}
                    id="post"
                  >
                    Post
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
