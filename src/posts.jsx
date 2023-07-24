import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
import { FaRegPaperPlane } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import CommentModel from "./comment";
import LikeButton from "./like";
import Navbars from "./navbar";
import "./post.css";

const fontStyles = { color: "black", fontSize: "19px" };
const fontStyle = { color: "gray", fontSize: "43px" };

const NewPosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFromLocal = JSON.parse(localStorage.getItem("newpost"));

    setData(dataFromLocal);
  }, []);

  // call back function to update the form details
  const updateForm = (newData) => {
    setData(newData);
    localStorage.setItem("newpost", JSON.stringify(data));
  };

  //  callback function to update the like unlike
  const updatelike = (updatedData) => {
    setData((prevData) =>
      prevData.map((post) => (post.id === updatedData.id ? updatedData : post))
    );
    localStorage.setItem("newpost", JSON.stringify(data));
  };

  return (
    <>
      <Navbars/>
      <div className="container my-5  main">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 mt-5 shadow bg-white px-md-5 ">
            <div className=" text-end mb-2">
              <AddForm onPostAdded={updateForm} />
            </div>
            {data.map((item, index) => (
              <div key={index}>
                <section className="postContent  p-3  mb-3 shadow border bg-white ">
                  {/* user name */}
                  <div className="row">
                    <div className="col col-md-9 ">
                      <h5>
                        <span>
                          <CgProfile style={fontStyle} />
                        </span>{" "}
                        <strong> {item.userName}</strong>
                      </h5>
                    </div>
                    <div className=" col col-md-3 ">
                      <i className="fa fa-ellipsis-h  mt-1 float-end"></i>
                    </div>
                  </div>

                  {/* post content */}
                  <div>
                    <p>{item.postContent}</p>
                  </div>

                  {/* icons row*/}
                  <div className="d-flex align-items-center">
                    <div className="like">
                      <LikeButton postId={item.id} onLikeUpdated={updatelike} />
                    </div>

                    <CommentModel user={item.userName} />
                    <FaRegPaperPlane style={fontStyles} id="like" />
                  </div>

                  {/* likes */}
                  <div>
                    <p>{item.likes} likes</p>
                  </div>

                  <div>
                    <p>
                      <strong>{item.userName}</strong> {item.comments}{" "}
                    </p>
                  </div>
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPosts;
