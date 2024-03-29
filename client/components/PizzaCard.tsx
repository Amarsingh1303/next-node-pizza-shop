import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PizzaCard.module.css";
import { Pizza } from "../types";

type PizzaCardProps = {
  pizza: Pizza;
};

const PizzaCard = ({ pizza }: PizzaCardProps) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`}>
        <Image src={pizza.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  );
};

export default PizzaCard;
