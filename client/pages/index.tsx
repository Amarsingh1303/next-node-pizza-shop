import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";

const Home: NextPage = ({ pizzaList }) => {
  return (
    <div>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:5000/api/product");
  return {
    props: {
      pizzaList: res.data,
    },
  };
}
