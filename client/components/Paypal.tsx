import React, { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

type PayPalButtonWrapperProps = {
  currency: string;
  showSpinner: boolean;
  amount: number;
  createOrder: (val: any) => void;
};

export const PayPalButtonWrapper = ({
  currency,
  showSpinner,
  amount,
  createOrder,
}: PayPalButtonWrapperProps) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const style = { layout: "vertical" };
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
    // eslint-disable-next-line
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: String(amount),
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order!.capture().then(function (details) {
            const shipping = details.purchase_units[0].shipping;
            createOrder({
              customer: shipping!.name!.full_name,
              address: shipping!.address!.address_line_1,
              total: amount,
              method: 1,
            });
          });
        }}
      />
    </>
  );
};
