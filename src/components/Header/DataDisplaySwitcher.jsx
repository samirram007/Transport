import { useUserInitialValueContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueContext";
import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import UserInitialValueContextProvider from "@/modules/UserInitialValue/context/UserInitialValueContextProvider";
import { BsGrid3X3Gap } from "react-icons/bs";
import { TfiViewList } from "react-icons/tfi";

const DataDisplaySwitcher = () => {

    return (
        <UserInitialValueContextProvider>

            <SwitchButton />
        </UserInitialValueContextProvider>
    )
}

export default DataDisplaySwitcher

const SwitchButton = () => {
    const { setAction, setSelectedUserInitialValue, handleMutation } = useUserInitialValueContext();
    const { data } = useUserInitialValueDataContext();

    // Find the object with key === "dataDisplay"
    const dataDisplayEntry = Array.isArray(data) ? data.find(item => item.key === "dataDisplay") : data;

    // Extract value from the found entry (default to "table" if not found)
    const currentMode = dataDisplayEntry?.value ?? "table";

    // Toggle between 'table' and 'grid'
    const handleOnClick = () => {
        const newMode = currentMode === "table" ? "grid" : "table";
        setAction("create");
        setSelectedUserInitialValue({ key: "dataDisplay", value: newMode });
        handleMutation({ key: "dataDisplay", value: newMode });
    };

    return (
        <div onClick={handleOnClick} className="rounded-full p-2 cursor-pointer transition-colors text-slate-500 dark:text-white hover:text-slate-600 active:text-slate-700">
            {currentMode === "grid" ? (
                <TfiViewList className="text-2xl text-blue-500" />
            ) : (
                <BsGrid3X3Gap className="text-2xl text-blue-500" />
            )}
        </div>
    );
};


