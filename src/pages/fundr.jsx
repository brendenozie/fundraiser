import React from "react";
import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer ,SimpleFooter } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";//PaypalCheckoutButton
import { featuresData, teamData, contactData } from "@/data";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import emailJs from "@emailjs/browser";



export function Fundr() {

  const [dataa,setData] = useState({ });
  const currency = "USD";

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);


  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const createOrder = async (data) => {
    try {
      const res = await axios.post("/api/fundraiser", data);
      // res.status === 201 && router.push("/fundraiser/" + res.data._id);
      // dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

 

  // const product = {
  //                     description: "Learn how to build a website with React JS",
  //                     price: 29,
  //                 };

  // Paypal: This values are the props in the UI
  // const amount = "2";
  // const amount = cart.total;
    // console.log(amount);
    // console.log(amtt);
    // console.log(`${name} ${email} ${amount}`);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    if(paidFor){
        alert("Thank You for Contributing");
        //handleSubmit();
    }

    if(error){
        alert(error);
    }

  // // Custom component to wrap the PayPalButtons and handle currency changes
    // // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = () => { //{ currency, showSpinner }
      // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
      // This is the main reason to wrap the PayPalButtons in a new component
      // const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  
      // useEffect(() => {
        // dispatch({
        //   type: "resetOptions",
        //   value: {
        //     ...options,
        //     currency: currency,
        //   },
        // });
      // }, [currency, showSpinner]);
  
      return (
        <>
          {/* {showSpinner && isPending && <div className="spinner" />} */}
          <PayPalButtons  className="mt-8" 
            style={{ layout: "vertical" }}
            disabled={false}
            forceReRender={[dataa.amount, "USD", { layout: "vertical" }]}
            fundingSource={undefined}
            onClick={(data, actions) => {
                const hasAlreadyBoughtCourse = false;
                if(hasAlreadyBoughtCourse){
                    setError("Already Done");
                    return actions.reject();
                }else{
                    return actions.resolve();
                }
            }}
            createOrder={async (data, actions) => {
              const orderId = await actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: dataa.amount,
                      },
                    },
                  ],
                });
              return orderId;
            }}
            onApprove={async function (data, actions) {
              const details = await actions.order.capture();
              console.log(details); // After the order has been approved by Paypal
              // const shipping = details.purchase_units[0].shipping;
              // createOrder({
              //   customer: shipping.name.full_name,
              //   address: shipping.address.address_line_1,
              //   total: cart.total,
              //   method: 1, // cash method:0, PayPal method: 1
              // });
              // handleSubmit();
              setData({amount: ""} )
              alert("Thank you. Your contribution has been received.")
            }}
          />
        </>
      );
    };
  
    const handleSubmit = () => {
      
      const serviceID = 'default_service';
      const templateID = 'template_vucqnzi';
          setLoading(true);
          emailJs.send(
              serviceID, templateID,
              {
                  from_name: `Hamisha Initiative ${dataa.name}`,
                  to_name: `Hamisha Admin ${dataa.name}`,
                  from_email: dataa.email,
                  reply_to: dataa.email,
                  message: `I have donated ${dataa.amount} ${dataa.phone} ${dataa.message}`
              },
              "_4BHSbWDKWJGljZ0e" 
          ).then(() => {
              setLoading(false);
              setData({});
              alert("Thank you. I will get back to you as soon as possible.")
          }, (e) => {
              alert("Something went wrong.")
          });
    };

  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Donate
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {/* <Input variant="standard" label="Name" size="lg"  name="name" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
            <Input variant="standard" type="email" label="Email" size="lg"  name="email" onChange={(e) => { setData({...data, email: e.target.value}) }}/>
            <Input variant="standard" type="phonenumber" label="Enter Phone Number" size="lg"  name="phone" onChange={(e) => { setData({...data, phone: e.target.value}) }}/> */}
            <Input variant="standard" type="amount" label="Amount" size="lg" value={dataa.value}  name="amount" onChange={(e) => { setData({...dataa, amount: e.target.value}) }}/>
            {/* <Input variant="standard" type="text" label="Message" size="lg"   name="message" onChange={(e) => { setData({...data, message: e.target.value}) }}/> */}
            <div className="-ml-2.5">
              {/* <Checkbox label="I agree the Terms and Conditions" /> */}
            </div>
          </CardBody>
          <CardFooter className="pt-0">
          <PayPalScriptProvider 
                  options={{
                    "client-id":"AVeo5yGBOwQgmw3lBv6Fg0hIgVnejLRGWhgxVIhlBo1CGeoYyNy4UJXXshLMTtNSHONpNKrzLwrQ9tNf",// "ARUZvMP1Vqt1C7igVbVW8Sg3-Su9hwZuGKwcQ9i9XX3a7e-5dBE--NQV8KijMzgtNii5ubKz-zJnqmxX",
                    components: "buttons",
                    currency: "USD",
                   // "disable-funding": "credit,card,p24", // to disable any other payment methods which collaborates with paypal
                  }}
                >
                  <ButtonWrapper></ButtonWrapper>
                  {/* //currency={currency} showSpinner={false} /> */}
                </PayPalScriptProvider>
          {/* <PaypalCheckoutButton product={data} /> */}
          {/* <PayPalScriptProvider
                  options={{
                    "client-id":
                      "ARUZvMP1Vqt1C7igVbVW8Sg3-Su9hwZuGKwcQ9i9XX3a7e-5dBE--NQV8KijMzgtNii5ubKz-zJnqmxX",
                    components: "buttons",
                    currency: "KES",
                    "disable-funding": "credit,card,p24", // to disable any other payment methods which collaborates with paypal
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider> */}
            {/* <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography> */}
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default Fundr;
