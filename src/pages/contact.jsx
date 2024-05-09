import React from "react";
import { PageTitle, Footer } from "@/widgets/layout";
import emailJs from "@emailjs/browser";
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
import { featuresData, teamData, contactData } from "@/data";

export function Contact() {

  const [data,setData] = useState({ });
  const [loading,setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);


    // To fix hydration UI mismatch issues, we need to wait until the component has mounted.

    useEffect(() => {
      setMounted(true);
    }, []);
    if (!mounted) return null;

  const handleSubmit = () => {
    
    const serviceID = 'default_service';
    const templateID = 'template_vucqnzi';
        setLoading(true);
        console.log(data);
        emailJs.send(
            serviceID, templateID,
            {
                from_name: `Hamisha Initiative ${data.name}`,
                to_name: `Hamisha Admin ${data.name}`,
                from_email: data.email,
                to_email: data.email,
                reply_to: data.email,
                message: `I have donated ${data.subject} ${data.phone} ${data.message}`
            },
            "_4BHSbWDKWJGljZ0e" 
        ).then(() => {
          setData({});
            setLoading(false);
            alert("Thank you. I will get back to you as soon as possible.")
        }, (e) => {
          console.log(e);
          console.log(data);
            alert("Something went wrong.")
        });
  };

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section id="#about" className="relative bg-blue-gray-50/50 py-24 px-4">
        <div className="container mx-auto">
          <PageTitle heading="Reach out to us" >
            
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
          <PageTitle heading="Contact Us">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle>
          <form className="mx-auto mt-12 max-w-3xl text-center">
            <div className="mb-8 flex gap-8">
              <Input variant="standard" size="lg" label="Full Name" value={data.name} name="name" onChange={(e) => { setData({...data, name: e.target.value}) }}/>
              <Input variant="standard" size="lg" label="Email Address" value={data.email} name="email" onChange={(e) => { setData({...data, email: e.target.value}) }}/>
            </div>
            <div className="mx-auto mt-12 max-w-3xl text-center">              
              <Input variant="standard" size="lg" label="Your Phone" value={data.phone} name="phone" onChange={(e) => { setData({...data, phone: e.target.value}) }}/>
              <Input variant="standard" size="lg" label="Subject" value={data.subject} name="Subject" onChange={(e) => { setData({...data, subject: e.target.value}) }}/>
            </div>
            <Textarea variant="standard" size="lg" label="Message" rows={8} value={data.message} name="message" onChange={(e) => { setData({...data, message: e.target.value}) }}/>
            <Button variant="gradient" size="lg" className="mt-8" onClick={handleSubmit}>
              Send Message
            </Button>
          </form>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Contact;
