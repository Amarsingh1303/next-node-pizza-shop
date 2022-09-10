import React from "react";
import styles from "../styles/AddPizzaModal.module.css";

type AddButtonProps = {
  setClose: (value: boolean) => void;
};

const AddButton = ({ setClose }: AddButtonProps) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Add New Pizza
    </div>
  );
};

export default AddButton;
