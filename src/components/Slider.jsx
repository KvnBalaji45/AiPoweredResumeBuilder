import { useNavigate } from "react-router-dom"; // Using useNavigate hook for React Router v6
import ResumeTemp from "./resumeTemplates/ResumeTemp";
import SliderButton from "./subComponents/SliderButton";

const Slider = (props) => {
    const navigate = useNavigate(); // Hook to programmatically navigate to different routes

    // Array of resume template ids or types (you could adjust based on your actual templates)
    const arr = [1, 2, 3]; // Assuming 1, 2, and 3 correspond to the Classic, Minimal, and Creative templates

    const handleTemplateClick = (templateId) => {
        // Navigates to the correct resume template route based on the templateId
        navigate(`/resume-template/${templateId}`);
    };

    return (
        <div className="p-3 my-5 overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-5 items-center justify-evenly">
                <SliderButton
                    text={"<"}
                    className="absolute z-30 w-10 h-10 rounded-lg bg-orange-600 text-white text-center left-10 text-3xl font-bold"
                />

                {arr.map((item, index) => (
                    <div key={index} className="relative max-w-fit max-h-fit">
                        <ResumeTemp />
                        <div className="absolute inset-0 bg-transparent hover:backdrop-blur-sm cursor-pointer">
                            <button
                                type="button"
                                onClick={() => handleTemplateClick(item)} // Clicking will navigate to the corresponding template
                                className="z-30 max-w-fit max-h-fit px-5 py-3
            bg-orange-500 hover:bg-orange-400
             text-white font-bold shadow-md"
                            >
                                Coming Soon
                            </button>
                        </div>
                    </div>
                ))}

                <SliderButton
                    text={">"}
                    className="absolute w-10 h-10 rounded-lg bg-orange-600 text-white text-center right-10 text-3xl font-bold"
                />
            </div>
        </div>
    );
};

export default Slider;
