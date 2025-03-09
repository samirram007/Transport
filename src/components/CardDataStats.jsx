import { capitalizeAllWords, upperCase } from "@/lib/removeEmptyStrings";
import { useState } from "react";
import { useNavigate } from "react-router";

const CardDataStats = ({ title, link, comment, total, rate, levelUp, levelDown, children }) => {
    const navigate = useNavigate();
    const [showTitle, setShowTitle] = useState(false);
     const handleOnClick = () => {  
        navigate(link)
     }
     const handleMouseOver = () => {  
        setShowTitle(true)
     }
     const handleMouseLeave = () => {  
        setShowTitle(false)
     }
    return (
        <div 
        onMouseOver={handleMouseOver} 
        onMouseLeave={handleMouseLeave} 
        className="grid grid-cols-[auto_1fr] gap-4 justify-start items-start   
        relative
        rounded-sm border border-stroke 
         overflow-clip
         odd:bg-white even:bg-zinc-200 py-4 px-4 shadow-default
          dark:border-strokedark dark:odd:bg-boxdark dark:even:bg-slate-600">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">            
                {children}
            </div>

            <div className="  flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white"
                        dangerouslySetInnerHTML={{ __html: total }}>
                    </h4>
                    <span onClick={handleOnClick}  className="cursor-pointer text-sm font-medium
                     text-yellow-900 dark:text-secondary ">{capitalizeAllWords(comment)}</span>
                </div>

                <span
                    className={`flex items-center gap-1 text-sm font-medium ${levelUp && "text-meta-3"
                        } ${levelDown && "text-meta-5"} `}
                >
                    {rate}

                    {levelUp && (
                        <svg
                            className="fill-meta-3"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                                fill=""
                            />
                        </svg>
                    )}
                    {levelDown && (
                        <svg
                            className="fill-meta-5"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                                fill=""
                            />
                        </svg>
                    )}
                </span>
            </div>
            {showTitle && 
            <div onClick={handleOnClick}  
            className="absolute cursor-pointer 
      hover:text-blue-500 
      hover:font-bolder
      active:text-violet-500
      active:text-sm
      select-none
      animate-[slideInFromRight_0.5s_ease-out]
     
      pr-2 right-0 top-0   ">{upperCase(title)}</div>
            }
         
        </div>
    );
};

export default CardDataStats;
