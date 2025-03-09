import FormikEmptyModal from "@/components/form-components/FormikEmptyModal"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Booking from "./Booking"

const BookingButton = () => {
    const [isModalOpen, setModalOpen] = useState(false)
    const handleBooking = () => {
        setModalOpen(!isModalOpen)
    }
    return (
        <>
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600  rounded-md">

                <Button type="button"
                    onClick={handleBooking}
                    className="max-h-[2.5rem] max-w-[6rem] gap-2   w-100 px-2
            rounded-md bg-light text-white font-bold text-md
            elevation-2
            ">
                    Booking
                </Button>
            </div>

            {isModalOpen &&
                <FormikEmptyModal isModalOpen={isModalOpen} variant={"full"} >
                    <Booking isModalOpen={isModalOpen} setModalOpen={setModalOpen} />

                </FormikEmptyModal>}
        </>
    )
}

export default BookingButton