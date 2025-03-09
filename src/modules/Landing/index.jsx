import { lazy } from 'react';
const AboutUs = lazy(() => import('./pages/AboutUs'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const HotelBooking = lazy(() => import('./pages/HotelBooking'))
const Landing = lazy(() => import('./pages/LandingPage'))
const Navbar = lazy(() => import('./components/Navbar'))
const Footer = lazy(() => import('./components/Footer'))

export { AboutUs, ContactUs, Footer, HotelBooking, Landing, Navbar };

