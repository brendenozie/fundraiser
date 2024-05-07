import { Link } from "react-router-dom";
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
import { SimpleFooter } from "@/widgets/layout";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { FeatureCard, TeamCard, PaypalCheckoutButton } from "@/widgets/cards";
import { useState, useEffect } from "react";



export function Fundr() {

  const [data,setData] = useState({
                                    name:'',
                                    email:'',
                                    phone:'',
                                    amount:'',
                                    message:'',
                                    provider:'web'
                                  });

// To fix hydration UI mismatch issues, we need to wait until the component has mounted.
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
if (!mounted) return null;

// const createOrder = async (data) => {
//   try {
//     const res = await axios.post("/api/fundraiser", data);
//     // res.status === 201 && router.push("/fundraiser/" + res.data._id);
//     // dispatch(reset());
//   } catch (err) {
//     console.log(err);
//   }
// };

// const product = {
//                     description: "Learn how to build a website with React JS",
//                     price: 29,
//                 };

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
            <Input variant="standard" label="Name" size="lg"  name="name" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
            <Input variant="standard" type="email" label="Email" size="lg"  name="email" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
            <Input variant="standard" type="phonenumber" label="Enter Phone Number" size="lg"  name="phone" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
            <Input variant="standard" type="amount" label="Amount" size="lg"   name="amount" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
            <Input variant="standard" type="text" label="Message" size="lg"   name="message" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
            <div className="-ml-2.5">
              {/* <Checkbox label="I agree the Terms and Conditions" /> */}
            </div>
          </CardBody>
          <CardFooter className="pt-0">
          <PaypalCheckoutButton product={data} />
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
