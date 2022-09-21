import { useState } from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ExtraOptions, Order, Pizza } from "../types";
import { RootState } from "../redux/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetailModal from "../components/OrderDetailModal";
import { PayPalButtonWrapper } from "../components/Paypal";

type Product = {
  quantity: number;
  price: number;
} & Pizza;

const Cart = () => {
  const { products, total } = useSelector((state: RootState) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const currency = "USD";
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data: Order) => {
    try {
      const res = await axios.post("http://localhost:5000/api/order", data);
      console.log("res", res);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {products.map((product: Product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extraOptions.map((extra: ExtraOptions) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.quantity * product.price}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`,
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <PayPalButtonWrapper
                  currency={currency}
                  showSpinner={false}
                  amount={total}
                  createOrder={createOrder}
                />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
          {cash && <OrderDetailModal total={total} createOrder={createOrder} />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
