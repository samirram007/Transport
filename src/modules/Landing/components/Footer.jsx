import { useLocation } from "react-router";

const Footer = () => {
  let location = useLocation();
  // console.log(location);
  return <div>Current URL is {location.pathname}</div>;
  return (
    <footer className="sticky bg-slate-900 text-whiten py-3">
      <div className="container mx-auto text-center grid grid-cols-1 md:grid-cols-2">
        <p className="text-right md:text-left">&copy; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}. All rights reserved.</p>
        <p className="text-right md:text-right">Contact us at contact@hotelmanagement.com</p>
      </div>
    </footer>
  );
};

export default Footer;
