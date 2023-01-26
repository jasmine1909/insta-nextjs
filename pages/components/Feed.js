import React from "react";

import Posts from "./Posts";
import SideBar from "./Sidebar";
import { useSession, signIn, signOut } from "next-auth/react";
const Feed = () => {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto px-5 ${
        session && "grid-cols-1 max-w-3xl"
      }`}
    >
      <section className="col-span-2">
        {/* posts */}
        {session && <Posts />}
      </section>
      <section className="hidden xl:inline-grid md:col-span-1">
        <SideBar />
      </section>
    </main>
  );
};

export default Feed;
