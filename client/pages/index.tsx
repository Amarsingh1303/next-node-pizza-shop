import type { NextPage } from "next";
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList />
    </div>
  );
};

export default Home;
