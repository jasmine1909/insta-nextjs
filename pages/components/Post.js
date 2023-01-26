import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineSmile,
} from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BsBookmarkDash } from "react-icons/bs";
import { useSession } from "next-auth/react";
import {
  serverTimestamp,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  //likess
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      //make sure one user has one like
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  //send comment

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  console.log(comments);

  return (
    <div className="mt-10">
      {/* header */}
      <div className="flex items-center py-5">
        <img
          src={userImg}
          className="rounded-full h-10 w-10 object-contain border p-1 mr-2"
        />
        <p>{username}</p>
      </div>

      <img src={img} className="object-cover" />
      {session && (
        <div className="flex justify-between my-3">
          <div className="flex space-x-4">
            {hasLiked ? (
              <AiFillHeart
                onClick={likePost}
                color="red"
                className="btn"
                size={22}
              />
            ) : (
              <AiOutlineHeart onClick={likePost} className="btn" size={22} />
            )}

            <AiOutlineComment className="btn" size={22} />
            <HiOutlinePaperAirplane className="btn" size={22} />
          </div>
          <BsBookmarkDash className="btn" size={22} />
        </div>
      )}
      {/* caption */}
      <div>
        <p className="truncate ">
          {likes.length > 0 && (
            <p className="font-bold ">{likes.length} likes</p>
          )}
          <span className="font-bold mr-1">{username}</span>
          {caption}
        </p>
      </div>
      {/* comment */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-5 my-3">
              <img
                className="h-6 rounded-full"
                src={comment.data().userImage}
              />
              <p className="flex-1 text-sm">
                <span className="font-bold ">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>

              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* bottom input */}
      {session && (
        <form className="flex items-center">
          <AiOutlineSmile size={20} />
          <input
            type="text"
            className="border-none flex-1 focus:ring-0"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={!comment}
            onClick={sendComment}
            className="font-semibold text-blue-500"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
