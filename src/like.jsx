import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

const fontStyles = { color: "black", fontSize: "24px" };
const likeStyle = { color: "red", fontSize: "24px" };

const LikeButton = ({ postId, onLikeUpdated }) => {


  const [postData, setPostData] = useState(null);
  useEffect(() => {
    // geting data from local storage
    const savedPostsData = JSON.parse(localStorage.getItem("newpost"));
    if (savedPostsData) {
      setPostData(savedPostsData.find((item) => item.id === postId));
    }
  }, [postId]);

  

  const handleLikeToggle = () => {
    if (postData) {
      const updatedData = {
        ...postData,
        likes: postData.isLiked
          ? parseInt(postData.likes) - 1
          : parseInt(postData.likes) + 1,
        isLiked: !postData.isLiked,
      };
      setPostData(updatedData);


       // Call the callback with the updated data
      onLikeUpdated(updatedData); 
    }
  };

  if (!postData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button onClick={handleLikeToggle} className="border-0 bg-white  " id="like">
        {postData.isLiked ? (
          <AiFillHeart style={likeStyle} />
        ) : (
          <FaRegHeart style={fontStyles} />
        )}
      </button>
    </div>
  );
};

export default LikeButton;
