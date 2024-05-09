import { Home, Profile,SignUp,Contact,SignIn,Fundr } from "@/pages";
import {
  HomeIcon,
  DocumentTextIcon,
  PhoneIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon
} from "@heroicons/react/24/solid";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home/> ,
  },
  {
    icon: DocumentTextIcon,
    name: "donate",
    path: "/fundr",
    element: <Fundr /> ,
  },
  {
    icon: DocumentTextIcon,
    name: "contact",
    path: "/contact",
    element: <Contact /> ,
  },
  // {
  //   icon: PhoneIcon,
  //   name: "about",
  //   path: "/about",
  //   element: <Contact /> ,
  // },
  // {
  //   icon: UserCircleIcon,
  //   name: "profile",
  //   path: "/profile",
  //   element: <Profile />,
  // },
  // {
  //   icon: ArrowRightOnRectangleIcon,
  //   name: "Sign In",
  //   path: "/sign-in",
  //   element: <SignIn />,
  // },
  // {
  //   icon: UserPlusIcon,
  //   name: "Sign Up",
  //   path: "/sign-up",
  //   element: <SignUp />,
  // },
  // {
  //   icon: DocumentTextIcon,
  //   name: "Docs",
  //   href: "https://www.material-tailwind.com/docs/react/installation",
  //   target: "_blank",
  //   element: "",
  // },
];

export default routes;
