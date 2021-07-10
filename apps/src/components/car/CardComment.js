import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, getCars } from "../../actions/car.actions";
import { isEmpty, timeStampParser } from "../Utils";

const CardComment = ({ car, key }) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(car._id, userData._id, userData.pseudo, text))
        .then(() => dispatch(getCars()))
        .then(() => setText(""));
    }
  };
  return (
    <div className="comments-container">
      {car.comments.map((comment) => {
        return (
          <div
            key={comment.commenterId}
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
          >
            {/* {comment.commenterId}
            <br />
            {comment.commenterPseudo}
            <br />
            {comment.text}
             */}
            <div className="left-part">
              {/* {!isEmpty(usersData[0]) &&
                usersData.map((user) => {
                  if (user._id === comment.commenterId) return (
                    <>
                      <ul>
                        <li> {user.email} </li>
                        <li> {user.commenterPseudo} </li>
                        <li> {user.text} </li>
                      </ul>
                    </>
                  ); 
                })} */}
              <h3 style={{ width: "250px", fontSize: "13px" }}> Post by : </h3>
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3 style={{ marginLeft: "10px" }}>
                    {comment.commenterPseudo}{" "}
                  </h3>
                </div>
                <span> {timeStampParser(comment.timestamp)} </span>
              </div>
              <p> {comment.text} </p>
            </div>
          </div>
        );
      })}

      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Leave a comment here !"
            autoComplete="off"
          />
          <br />
          <input type="submit" value="Send" />
        </form>
      )}
    </div>
  );
};

export default CardComment;
