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
                    from_name: `Hamisha Initiative ${data.name}`,
                    to_name: `Hamisha Admin ${data.name}`,
                    from_email: data.email,
                    reply_to: data.email,
                    message: `I have donated ${data.amount}. ${data.message}`
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
        "client-id": "AU6NvD3qayuR4mSVmyf-WNJhFsx1xVft27UuctC3oxzSXdTAfS5cliB7MEP4Jevt81p70nyxBhFxn9B2",// "ARUZvMP1Vqt1C7igVbVW8Sg3-Su9hwZuGKwcQ9i9XX3a7e-5dBE--NQV8KijMzgtNii5ubKz-zJnqmxX",
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
