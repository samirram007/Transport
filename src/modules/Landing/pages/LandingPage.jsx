import Carousal from '../components/Carousal';
import Features from '../components/Features';
import Identity from '../components/Identity';
import Launch from '../components/Launch';
import Resources from '../components/Resources';
import Rooms from '../components/Rooms';
import Testimonials from '../components/Testimonials';
import UseCases from '../components/UseCases';


const LandingPage = () => {
  return (
    <div>
      <Carousal />
      <Features />
      <Rooms />

      <Launch />
      <Identity />
      <UseCases />
      <Resources />
      <Testimonials />

    </div>
  );
};

export default LandingPage;
