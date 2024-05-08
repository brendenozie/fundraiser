import React, {useState} from 'react';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import emailJs from "@emailjs/browser";

export function PaypalCheckoutButton(props){

    const {product} = props;

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    if(paidFor){
        alert("Thank You for purchasing");
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
                    from_name: `Hamisha Initiative ${product.name}`,
                    to_name: `Hamisha Admin ${product.name}`,
                    from_email: product.email,
                    reply_to: product.email,
                    message: `I have donated ${product.amount} ${product.phone}. ${product.message}`
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
    <PayPalScriptProvider 
    options={{
        "client-id":  "AVeo5yGBOwQgmw3lBv6Fg0hIgVnejLRGWhgxVIhlBo1CGeoYyNy4UJXXshLMTtNSHONpNKrzLwrQ9tNf",
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

