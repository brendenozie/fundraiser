import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

export function Home() {

  const [data,setData] = useState({name:'',
                                    email:'',
                                    phone:'',
                                    amount:'1',
                                    message:'',
                                    provider:'web'
                                  });

  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);

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

  // Paypal: This values are the props in the UI
  // const amount = "2";
  // const amount = cart.total;
  const currency = "KES";

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={{ layout: "vertical" }}
          disabled={false}
          forceReRender={[data.amount, currency, { layout: "vertical" }]}
          fundingSource={undefined}
          createOrder={async (data, actions) => {
            const orderId = await actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: data.amount,
                    },
                  },
                ],
              });
            return orderId;
          }}
          onApprove={async function (data, actions) {
            const details = await actions.order.capture();
            console.log(details); // After the order has been approved by Paypal
            const shipping = details.purchase_units[0].shipping;
            createOrder({
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
              total: cart.total,
              method: 1, // cash method:0, PayPal method: 1
            });
          }}
        />
      </>
    );
  };

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/50 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Make Donation to help flood victims.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Small changes make a big impact on peoples lives. Help provide food stuffs clothing and bedding for the flood affected. 
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                <UsersIcon className="h-6 w-6 text-blue-gray-900" />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="orange"
              >
                Fundraising for the people and causes you care about
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
              Fundraising for the people and causes you care about is a powerful way to create positive change and make a lasting impact. When you engage in fundraising, you're not just raising money—you're igniting hope, transforming lives, and building a better future.
                <br />
                <br />
                By rallying support from friends, family, and your community, you amplify the reach and impact of your cause. Every dollar raised contributes directly to supporting vital programs, providing essential resources, and making meaningful differences in the lives of individuals and families.
              </Typography>
              {/* <Button variant="outlined">read more</Button> */}
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg shadow-gray-500/10">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.jpeg"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    You Have The Power Today To Change Tomorrow
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                  Embrace the opportunity to fundraise for the people and causes close to your heart. Your commitment and dedication will help bring about meaningful change and leave a legacy of compassion and generosity for generations to come. Together, we can make a difference—one donation, one supporter, and one cause at a time.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle heading="Here are our heroes">
            We celebrate you for your desire and effort. You make the world a better place and we are greatful for the effort you've put in.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-lg fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section id="#about" className="relative bg-blue-gray-50/50 py-24 px-4">
        <div className="container mx-auto">
          <PageTitle heading="Your Donation Can Change Someone’s Life" >
          Fundraising isn't just about finances; it's about building connections, fostering empathy, and inspiring others to join in making a difference.  Your efforts demonstrate that ordinary individuals can achieve extraordinary things when they come together with passion and purpose.
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg shadow-gray-500/20 text-orange-600">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-orange",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <div id="contact"></div>
          <PageTitle heading="Want to donate?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle>
          <form className="mx-auto mt-12 max-w-3xl text-center">
            <div className="mb-8 flex gap-8">
              <Input variant="standard" size="lg" label="Full Name" name="name" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
              <Input variant="standard" size="lg" label="Email Address" name="email" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
            </div>
            <div className="mx-auto mt-12 max-w-3xl text-center">              
              <Input variant="standard" size="lg" label="Your Phone" name="phone" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
              <Input variant="standard" size="lg" label="Amount" name="amount" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
            </div>
            <Textarea variant="standard" size="lg" label="Message" name="message" rows={8} onChange={(e) => { setData({...data, name: e.target.value}) }}/>
            <PayPalScriptProvider
                  options={{
                    "client-id":
                      "ARUZvMP1Vqt1C7igVbVW8Sg3-Su9hwZuGKwcQ9i9XX3a7e-5dBE--NQV8KijMzgtNii5ubKz-zJnqmxX",
                    components: "buttons",
                    currency: "KES",
                    "disable-funding": "credit,card,p24", // to disable any other payment methods which collaborates with paypal
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>
            {/* <Button variant="gradient" size="lg" className="mt-8">
              Donate
            </Button> */}
          </form>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Home;
