import React, {useState} from 'react';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

export function PaypalCheckoutButton(props){

    const {product} = props;

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    if(paidFor){
        alert("Thank You for purchasing from Eazy2Code");
    }

    if(error){
        alert(error);
    }

  return (
    <PayPalScriptProvider 
    options={{
        "client-id":"ARUZvMP1Vqt1C7igVbVW8Sg3-Su9hwZuGKwcQ9i9XX3a7e-5dBE--NQV8KijMzgtNii5ubKz-zJnqmxX",//"AU6NvD3qayuR4mSVmyf-WNJhFsx1xVft27UuctC3oxzSXdTAfS5cliB7MEP4Jevt81p70nyxBhFxn9B2",// "ARUZvMP1Vqt1C7igVbVW8Sg3-Su9hwZuGKwcQ9i9XX3a7e-5dBE--NQV8KijMzgtNii5ubKz-zJnqmxX",
        components: "buttons",
        currency: "USD",
        // "disable-funding": "credit,card,p24", // to disable any other payment methods which collaborates with paypal
      }}>
        <PayPalButtons 
            onClick={(data, actions) => {
                const hasAlreadyBoughtCourse = false;
                if(hasAlreadyBoughtCourse){
                    setError("You Already bought this course");
                    return actions.reject();
                }else{
                    return actions.resolve();
                }
            }}
            createOrder = {(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: product.message,
                            amount: {
                                value: product.amount,
                            },
                        },
                    ],
                });
            }}
            onApprove = { async (data, action) => {
                // const order = await action.order.capture();
                // console.log("order", order);
                handleApprove(data.orderID);
            }}
            onCancel={() => {}}
            onError={(err) => {
                setError(err);
                console.log("PayPal Checkout onError", err);
            }}
        />
    </PayPalScriptProvider>
  )
}

