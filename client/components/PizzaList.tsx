import styles from "../styles/PizzaList.module.css";
import { Pizza } from "../types";
import PizzaCard from "./PizzaCard";

type PizzaListProps = {
  pizzaList: Array<Pizza>;
};

const PizzaList = ({ pizzaList }: PizzaListProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza: Pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
        {/* <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard /> */}
      </div>
    </div>
  );
};

export default PizzaList;
