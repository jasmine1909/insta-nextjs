import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "./components/Header"
import Feed from "./components/Feed"
import Modal from "./components/Modal"
const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <Modal />
      <Feed />







    </div>
  )
}

export default Home
