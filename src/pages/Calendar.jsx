import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { Calender } from '../modules/Dashboard';

const Calendar = () => {
  return (
    <>
      <Breadcrumb pageName="Calendar" parentName="Pages" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <Calender />
      {/* <!-- ====== Calendar Section End ====== --> */}
    </>
  );
};

export default Calendar;
