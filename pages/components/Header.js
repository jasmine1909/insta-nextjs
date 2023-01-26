import React from "react";
import Image from "next/image";
import Logo from "../.././public/logo.webp";
import {
  AiOutlineSearch,
  AiFillHome,
  AiOutlinePlusCircle,
  AiOutlineBell,
} from "react-icons/ai";
import { RxPaperPlane } from "react-icons/rx";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  console.log(session);

  const router = useRouter();

  //recoil modal
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-sm border-b bg-white sticky ">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto py-3">
        {/* LEft */}
        <div>
          <Image
            src={Logo}
            width={50}
            height={50}
            onClick={() => router.push("/")}
          />
        </div>

        {/* middle */}
        <div className="relative mt-1 rounded-md">
          <div className="absolute pl-3  mt-3 flex items-center pointer-events-none">
            <AiOutlineSearch />
          </div>
          <input
            type="text"
            className="bg-gray-200 w-full pl-8 py-2 rounded-md border-gray-300 focus:ring-black focus:border-black"
            placeholder="Search"
          />
        </div>

        {/* right */}
        {session ? (
          <div className="flex items-center justify-end space-x-4">
            <AiFillHome
              size={25}
              className="navBtn"
              onClick={() => router.push("/")}
            />
            <RxPaperPlane size={25} className="navBtn" />
            <AiOutlinePlusCircle
              size={25}
              className="navBtn"
              onClick={() => setOpen(true)}
            />
            <div className="navBtn relative">
              <AiOutlineBell size={25} />
              <div className="absolute -top-1 -right-2 text-xs w-5 h-5 rounded-full bg-red-600 flex justify-center items-center text-white">
                9
              </div>
            </div>
            {/* <img
               src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png "
               className="h-8 rounded-full cursor-pointer"
             /> */}
            <img
              onClick={signOut}
              src={session?.user?.image}
              className="h-8 rounded-full cursor-pointer"
            />
          </div>
        ) : (
          <button onClick={signIn}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Header;
