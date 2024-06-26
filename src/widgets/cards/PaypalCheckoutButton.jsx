import React, {useState} from 'react';
import PropTypes from "prop-types";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import emailJs from "@emailjs/browser";

export function PaypalCheckoutButton({name,email,amount,phone,message}){

    const [amtt, setAmtt] = useState(amount);
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // console.log(amount);
    // console.log(amtt);
    // console.log(`${name} ${email} ${amount}`);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    if(paidFor){
        alert("Thank You for Contributing");
        handleSubmit();
    }

    if(error){
        alert(error);
    }

    // const [dataEmail,setDataEmail] = useState({
    //     VITE_EMAIL_SERVICE_ID:"service_xjryc0h",
    //             VITE_EMAIL_TEMPLATE_ID:"template_vucqnzi",
    //             VITE_EMAIL_TO_NAME:`${data.name}`,
    //             VITE_EMAIL:`${data.email}`
    //   });

    const handleSubmit = () => {
    
        const serviceID = 'default_service';
        const templateID = 'template_vucqnzi';
            setLoading(true);
            emailJs.send(
                serviceID, templateID,
                {
                    from_name: `Hamisha Initiative ${name}`,
                    to_name: `Hamisha Admin ${name}`,
                    from_email: email,
                    reply_to: email,
                    message: `I have donated ${amount} ${phone} ${message}`
                },
                "_4BHSbWDKWJGljZ0e" 
            ).then(() => {
                setLoading(false);
                alert("Thank you. I will get back to you as soon as possible.")
            }, (e) => {
                alert("Something went wrong.")
            });
      };

  return (
    <>
    
    <PayPalScriptProvider 
            options={{
                "client-id":  "AVeo5yGBOwQgmw3lBv6Fg0hIgVnejLRGWhgxVIhlBo1CGeoYyNy4UJXXshLMTtNSHONpNKrzLwrQ9tNf",
                components: "buttons",
                currency: "USD",
                // "disable-funding": "credit,card,p24", // to disable any other payment methods which collaborates with paypal
            }}>
        <PayPalButtons onClick={(data, actions) => {
                const hasAlreadyBoughtCourse = false;
                if(hasAlreadyBoughtCourse){
                    setError("Already Done");
                    return actions.reject();
                }else{
                    return actions.resolve();
                }
            }}
            createOrder = {(data, actions) => {
                console.log(amount);
                return actions.order.create({
                    purchase_units: [
                        {
                            description: `${name} ${email} ${amount}` ,
                            amount: {
                                value: "0.01"
                              }
                        },
                    ],
                });
            }}
            onApprove = { async (data, action) => {
                // const order = await action.order.capture();
                // console.log("order", order);
                // handleApprove(data.orderID);
                handleSubmit();
            }}
            onCancel={() => {}}
            onError={(err) => {
                setError(err);
                console.log("PayPal Checkout onError", err);
            }}
        />
    </PayPalScriptProvider>
    
    </>
  )
}

PaypalCheckoutButton.displayName = "/src/widgets/layout/PaypalCheckoutButton.jsx";

PaypalCheckoutButton.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  };

  export default PaypalCheckoutButton;