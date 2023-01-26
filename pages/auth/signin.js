import { getProviders, signIn } from "next-auth/react";
import Header from "./../components/Header";

export default function SignIn({ providers }) {
  return (
    //configuration pages https://next-auth.js.org/configuration/pages
    <>
      <Header />
      <div className="flex flex-col items-center justify-center py-40 ">
        <h2>Sign up to see photos and videos from your friends.</h2>
        <div className="mt-10">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-md text-white"
                // onClick={() => signIn(provider.id)}
                //add call back to direct to home page
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

//authorized in google cloud : edit OAuth 2.0 Client IDs

//update Authorized JavaScript origins
//update redirect uri errors
