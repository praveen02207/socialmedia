import React, { useEffect, useState } from "react";

import { Button, Modal } from "react-bootstrap";

const AddForm = ({onPostAdded}) => {

  // model state for view
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // form onchange values
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((previousValues) => ({ ...previousValues, [name]: value }));
  };

  // adding local storage value to initial state value for newpost
  const fromLocal = () => {
    const data = localStorage.getItem("newpost");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  };
  const [userPost, setUserPost] = useState(fromLocal());

  // form submit function
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const postDetail = {
        id: userPost.length + 1 || "",
        userName: inputs.userName || "",
        postContent: inputs.postContent || "",
        likes: '0' || ""
      };

      setUserPost([...userPost, postDetail]);
      setInputs({});

      // Call the callback function from parent to update submited form data
      onPostAdded([...userPost, postDetail]); 
      
    }
  };

  
  // Adding form values into local storage
  useEffect(() => {
    localStorage.setItem("newpost", JSON.stringify(userPost));
  }, [userPost]);

  // form validation
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let valid = true;
    let error = {};

    if (!inputs.userName) {
      valid = false;
      error["userName"] = "Please enter your name!";
    } else if (!inputs.postContent) {
      valid = false;
      error["postContent"] = "Please enter your post content!";
    } 

    setErrors(error);
    return valid;
  };

  return (
    <>
      <Button variant="success" onClick={handleShow} className="mt-3" >
        Add new post +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="mx-auto">Create a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="the_rahul.."
                name="userName"
                value={inputs.userName || ""}
                onChange={handleChange}
              />

              {errors.userName && (
                <div className="text-danger"> {errors.userName}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Post Content</label>

              <textarea
                className="form-control"
                placeholder="type your content..."
                name="postContent"
                value={inputs.postContent || ""}
                onChange={handleChange}
              />

              {errors.postContent && (
                <div className="text-danger"> {errors.postContent}</div>
              )}
            </div>

            {/* <div className="mb-3">
              <label className="form-label">Likes</label>

              <input
                className="form-control"
                type="number"
                placeholder="Enter no of likes"
                name="likes"
                value={inputs.likes || ""}
                onChange={handleChange}
              />

              {errors.likes && (
                <div className="text-danger"> {errors.likes}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Comments</label>

              <input
                className="form-control"
                type="text"
                placeholder="Enter your comment"
                name="comments"
                value={inputs.comments || ""}
                onChange={handleChange}
              />

              {errors.comments && (
                <div className="text-danger"> {errors.comments}</div>
              )}
            </div> */}

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddForm;
