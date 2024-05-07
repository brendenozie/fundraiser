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



export function Fundr() {
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
            <Button variant="gradient" fullWidth>
              Donate
            </Button>
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
