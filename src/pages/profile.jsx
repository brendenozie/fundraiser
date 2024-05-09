import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  PhoneIcon
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";

export function Profile() {
  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      {/* <Avatar
                        src="/img/team-2.jpg"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  {/* <Button className="bg-blue-400">Conntect</Button> */}
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      {/* <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        22
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Friends
                      </Typography>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        10
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Photos
                      </Typography>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        89
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Comments
                      </Typography> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  Hamisha Initiative
                </Typography>
                <div className="mb-16 flex items-center justify-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    Nairobi, Kenya
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-700" /> 
                  <Typography className="font-medium text-blue-gray-700"> 
                    Sharon Akinyi - Organising Head
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <PhoneIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    +254 717 168 926
                  </Typography>
                </div>
              </div>

              <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                <div className="mt-2 flex flex-wrap justify-center">
                  <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                    <Typography className="mb-8 font-normal text-blue-gray-500 text-left">
                    In response to the devastating floods affecting our community, we are launching a crucial fundraising campaign aimed at providing immediate relief and long-term support to those impacted. 
                    <br/>Our mission is twofold: to address the urgent needs of flood victims and to implement sustainable measures to rebuild and strengthen our community's resilience.

                    <br/> Through this fundraising effort, we intend to:

                    <br/>1. **Immediate Relief Efforts**:
                    <br/>- **Emergency Supplies**: Distribute essential items such as food, water, blankets, and hygiene kits to affected families.
                    <br/>- **Temporary Shelter**: Set up temporary shelters and provide accommodation for displaced individuals and families.
                    <br/>- **Medical Assistance**: Ensure access to medical care and medicines for those injured or at risk of illness due to the floods.
                    <br/>- **Rescue Operations**: Support ongoing rescue operations to ensure the safety of those stranded or in danger.
                    <br/>
                      2. **Rehabilitation and Reconstruction**:
                      <br/>- **Infrastructure Repair**: Rebuild damaged infrastructure, including roads, bridges, and buildings, to restore accessibility and functionality.
                      <br/>- **Livelihood Restoration**: Assist in restoring livelihoods by providing resources for farmers, fishermen, and small businesses affected by the floods.
                      <br/>- **Psychosocial Support**: Offer counseling and mental health services to individuals and families experiencing trauma or loss.
                      <br/>- **Disaster Preparedness**: Invest in community education and preparedness initiatives to minimize the impact of future disasters.

                      <br/>Every donation counts and will directly contribute to making a difference in the lives of those affected by the floods. 
                      <br/>Together, we can provide immediate relief and work towards building a stronger, more resilient community for the future. Join us in this crucial effort to support our neighbors and restore hope in the wake of this disaster.
                    </Typography>
                    {/* <Button variant="text">Show more</Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
