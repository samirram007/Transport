import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { addMonths, format, subMonths } from 'date-fns';
import { useEffect, useState } from "react";

const months = [
    { id: 1, name: "January", days: 31 },
    { id: 2, name: "February", days: 28 },
    { id: 3, name: "March", days: 31 },
    { id: 4, name: "April", days: 30 },
    { id: 5, name: "May", days: 31 },
    { id: 6, name: "June", days: 30 },
    { id: 7, name: "July", days: 31 },
    { id: 8, name: "August", days: 31 },
    { id: 9, name: "September", days: 30 },
    { id: 10, name: "October", days: 31 },
    { id: 11, name: "November", days: 30 },
    { id: 12, name: "December", days: 31 },
]
const daysOfWeek = [
    { id: 1, name: "Sunday", shortName: "Sun" },
    { id: 2, name: "Monday", shortName: "Mon" },
    { id: 3, name: "Tuesday", shortName: "Tue" },
    { id: 4, name: "Wednesday", shortName: "Wed" },
    { id: 5, name: "Thursday", shortName: "Thu" },
    { id: 6, name: "Friday", shortName: "Fri" },
    { id: 7, name: "Saturday", shortName: "Sat" },
]
const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
    const [firstDayofCurrentMonth, setFirstDayofCurrentMonth] = useState(new Date().toISOString().slice(0, 10));
    const [currentMonthGrid, setCurrentMonthGrid] = useState([]);
    // const [currentYear, setCurrentYear] = useState(new Date().toISOString().slice(0, 4));
    const handlePrevMonth = () => {
        const currentDate = new Date(currentMonth + '-01'); // Convert currentMonth to a full date
        const prevMonth = subMonths(currentDate, 1); // Subtract one month

        setCurrentMonth(prev => format(prevMonth, 'yyyy-MM')); // Update state with the new month in 'yyyy-MM' format

    };

    const handleNextMonth = () => {
        const currentDate = new Date(currentMonth + '-01'); // Convert currentMonth to a full date
        const nextMonth = addMonths(currentDate, 1); // Add one month
        setCurrentMonth(prev => format(nextMonth, 'yyyy-MM')); // Update state with the new month in 'yyyy-MM' format

    };

    const handleMonthChange = (e) => {
        setCurrentMonth(prev => e.target.value);

    };
    const populateDateGrid = () => {
        const currentDate = new Date(currentMonth + '-01'); // Convert currentMonth to a full date
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Get the first day of the current month
        const firstDayOfMonth = firstDay.getDay(); // Get the day of the week of the first day

        setFirstDayofCurrentMonth(prev => firstDayOfMonth);

        currentMonthGrid.length = 0;
        for (let i = 0; i < firstDayOfMonth; i++) {
            currentMonthGrid.push(null);
        }
        for (let i = 1; i <= months[currentDate.getMonth()].days; i++) {
            currentMonthGrid.push(i);
        }
        for (let i = currentMonthGrid.length; i < 42; i++) {
            currentMonthGrid.push(null);
        }
        setCurrentMonthGrid(prev => currentMonthGrid);


    };
    useEffect(() => {
        populateDateGrid()
    }, [currentMonth])


    return (
        <div>
            <div className="w-full max-w-full flex flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between">


                    <div className={` text-3xl font-bold flex justify-end items-center gap-2 p-4`}>
                        Booking Calender
                    </div>
                    <div className={` flex justify-end items-center gap-2 p-4`}>
                        {/* <BookingButton /> */}
                        <Button type="button"
                            onClick={handlePrevMonth}
                            className="max-h-[70px] max-w-[70px] gap-2   w-100 rounded-md
                             bg-primary text-white font-bold text-md">
                            Prev
                        </Button>

                        <Input type="month" value={currentMonth}
                            className={`bg-white  text-black placeholder:text-black 
                            dark:bg-white/10 dark:text-white dark:placeholder:text-white
                            border-2 border-primary rounded-md    text-2xl font-bold
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                            p-4`}
                            onChange={handleMonthChange}
                        />
                        <Button type="button"
                            onClick={handleNextMonth}
                            className="max-h-[70px] max-w-[70px] gap-2   
                            w-100 rounded-md bg-primary text-white font-bold text-md">
                            Next
                        </Button>

                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
                            {
                                daysOfWeek.map((day) => (
                                    <th key={day.id} className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                                        <span className="hidden lg:block">{day.name}</span>
                                        <span className="block lg:hidden">{day.shortName}</span>
                                    </th>
                                ))
                            }

                        </tr>
                    </thead>
                    <tbody>

                        <Rows currentMonthGrid={currentMonthGrid} />


                    </tbody>
                </table>
            </div >
        </div >
    )
}

export default Calender
const Rows = ({ currentMonthGrid }) => {

    return (
        <tr className="grid grid-cols-7">
            {currentMonthGrid.map((day, index) => (
                <td key={index} className="flex border-2 border-solid border-stroke 
                dark:border-blue-800/20 dark:bg-white/0
                dark:bg-boxdark text-black dark:text-white rounded-sm
                 h-25 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                    {day}
                </td>
            ))}
        </tr>
    )
}