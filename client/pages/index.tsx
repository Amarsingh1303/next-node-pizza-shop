import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import AddButton from "../components/AddButton";
import AddPizzaModal from "../components/AddPizzaModal";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import { Pizza } from "../types";

type HomePage = {
  pizzaList: Pizza[];
};

const Home = ({ pizzaList }: HomePage) => {
  const [close, setClose] = useState(true);
  return (
    <div>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <AddButton setClose={setClose} />
      <PizzaList pizzaList={pizzaList} />
      {!close && <AddPizzaModal setClose={setClose} />}
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
