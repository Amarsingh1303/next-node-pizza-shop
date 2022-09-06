import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import { ExtraOptions, Pizza } from "../../types";

export type ProductProps = {
  pizza: Pizza;
};

const Product = ({ pizza }: ProductProps) => {
  const [size, setSize] = useState(0);
  const [extraOptions, setExtraOptions] = useState<Array<any>>([]);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  // const [extras, setExtras] = useState([{}]);
  // const pizza = {
  //   id: 1,
  //   img: "/img/pizza.png",
  //   name: "CAMPAGNOLA",
  //   price: [19.9, 23.9, 27.9],
  //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  // };
  // console.log("pizzaProduct", pizzaProduct);
  // console.log("pizza", pizza);

  // const { extraOptions } = pizza;

  const handlePrice = (value: number) => {
    setPrice(price + value);
  };

  const handleSize = (pizzaSize: number) => {
    // setSize(pizzaSize);
    // handlePrice(pizza.prices[pizzaSize]);
    // setPrice(pizzaSize)
    const differencePrice = pizza.prices[pizzaSize] - pizza.prices[size];
    setSize(pizzaSize);
    handlePrice(differencePrice);
  };

  const handleExtraOptions = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: ExtraOptions
  ) => {
    if (e.target.checked) {
      setExtraOptions([...extraOptions, option]);
      // setExtras((prev) => [...prev, option]);
      handlePrice(option.price);
    } else {
      // setExtraOptions(0);
      // const newExtraOptions = extraOptions.filter(
      //   (item) => item._id !== option._id
      // );
      // console.log("newExtraOption", newExtraOptions);
      setExtraOptions(extraOptions.filter((item) => item._id !== option._id));
      handlePrice(-option.price);
      // setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...pizza, extraOptions, quantity, price }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => {
                  handleExtraOptions(e, option);
                  // console.log(e.target.checked);
                }}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}

          {/* <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="cheese"
              name="cheese"
            />
            <label htmlFor="cheese">Extra Cheese</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="spicy"
              name="spicy"
            />
            <label htmlFor="spicy">Spicy Sauce</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="garlic"
              name="garlic"
            />
            <label htmlFor="garlic">Garlic Sauce</label>
          </div> */}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            className={styles.quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button className={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // console.log("context", context);
  const { params } = context;
  const res = await axios.get(
    `http://localhost:5000/api/product/${params?.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
}
