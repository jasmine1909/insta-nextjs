import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useSession, signIn, signOut } from "next-auth/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
const posts = [
  {
    id: "123",
    username: "jaz",
    userImg:
      "https://img.freepik.com/free-photo/portrait-handsome-brunet-unshaven-adult-man-looks-with-calm-confident-expression-has-serious-look-wears-casual-jumper-poses-making-photo-against-white-background-being-hard-impress_273609-57668.jpg?w=2000",
    img: "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
    caption: "THis is the first post ",
  },
  {
    id: "12345",
    username: "jone",
    userImg:
      "https://img.freepik.com/free-photo/portrait-handsome-brunet-unshaven-adult-man-looks-with-calm-confident-expression-has-serious-look-wears-casual-jumper-poses-making-photo-against-white-background-being-hard-impress_273609-57668.jpg?w=2000",
    img: "https://mymodernmet.com/wp/wp-content/uploads/2021/04/Nature-Sounds-For-Well-Being-03.jpg",
    caption: "THis is the 2 post ",
  },
];
const Posts = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      //everytime value backend change it updated
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        //everytime value backend change it updated
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),

    [db]
  );
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <Post
          id={post.id}
          username={post.data().username}
          img={post.data().image}
          userImg={post.data().profileImg}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
