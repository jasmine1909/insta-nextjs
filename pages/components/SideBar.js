import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
const profiles = [
  {
    id: "123",
    username: "jaz",
    userImg:
      "https://img.freepik.com/free-photo/portrait-handsome-brunet-unshaven-adult-man-looks-with-calm-confident-expression-has-serious-look-wears-casual-jumper-poses-making-photo-against-white-background-being-hard-impress_273609-57668.jpg?w=2000",
    location: "Tampa,Florida",
  },
  {
    id: "12345",
    username: "jone",
    userImg:
      "https://img.freepik.com/free-photo/portrait-handsome-brunet-unshaven-adult-man-looks-with-calm-confident-expression-has-serious-look-wears-casual-jumper-poses-making-photo-against-white-background-being-hard-impress_273609-57668.jpg?w=2000",
    location: "Calirfornia",
  },
];
const SideBar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="ml-5">
      {/* top sidebar */}
      {session && (
        <div className="flex items-center justify-between mt-20 ">
          <img
            className="rounded-full h-10 w-10 object-contain border p-1"
            src={session?.user?.image}
          />
          <div className="flex flex-1 ml-8">
            <h2 className="font-bold text-gray-500 text-sm">
              {session?.user?.name}
            </h2>
          </div>
          <button
            onClick={signOut}
            className="text-blue-500 text-sm font-semibold"
          >
            Sign Out
          </button>
        </div>
      )}
      {/* 
      bottom sidebar */}
      <div className="mt-10">
        <div className="flex justify-between text-gray-500 font-medium">
          <h1>Suggestion for you </h1>
          <p> See All</p>
        </div>
        <div>
          {profiles.map((p) => (
            <div className="flex items-center justify-between mt-3">
              <img
                src={p.userImg}
                className="rounded-full h-10 w-10 object-contain border p-1"
              />
              <div className="flex-1 ml-4">
                <h2 className="font-semibold text-sm ">{p.username}</h2>
                <p className="text-xs text-gray-600">
                  {" "}
                  Location in {p.location}
                </p>
              </div>
              <button className="text-blue-500 font-bold text-sm bg-gray-100 rounded-md p-2">
                {" "}
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
