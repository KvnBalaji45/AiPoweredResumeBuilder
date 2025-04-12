import { forwardRef, useEffect, useState } from "react";

const ResumePageTemplate2 = forwardRef(function ResumePageTemplate2({ resumeInfo, selectedColor }, ref) {
    const [color, setColor] = useState(selectedColor);

    useEffect(() => {
        setColor(selectedColor);
        localStorage.setItem("resumeColor", selectedColor);
    }, [selectedColor]);

    // Personal Details Section (as in the original)
    const PersonalDetailsSection = (
        <div className="min-w-[300px] text-center mt-3" style={{ color }}>
            <h1 className="text-[2em] font-semibold">
                {resumeInfo.personal_details.detail.firstName} {resumeInfo.personal_details.detail.lastName}
            </h1>
            <div className="mt-2">
                <p className="text-[1em]">
                    {resumeInfo.personal_details.detail.city}, {resumeInfo.personal_details.detail.state} | {resumeInfo.personal_details.detail.email} | {resumeInfo.personal_details.detail.phone}
                </p>
            </div>
            <div className="flex justify-center items-center gap-3">
                {resumeInfo.personal_details.links?.map((item) => (
                    <a href={item.linkUrl} key={item.id} style={{ color }}>
                        {"| " + item.title + " |"}
                    </a>
                ))}
            </div>
        </div>
    );

    // Education Section
    const EducationSection = (
        <section className="h-fit mt-3 min-w-full" key={"education"}>
            <div className="text-xl font-bold" style={{ color }}>
                {resumeInfo.education.title}
                {resumeInfo.education.title && <div className="h-[1.5px] bg-black min-w-full mt-2"></div>}
            </div>
            {resumeInfo.education.detail?.map((item) => (
                <div className="w-full my-2 p-1 text-sm" key={item.id}>
                    <div className="flex items-center">
                        <p className="max-w-[80%] min-w-[80%] font-semibold inline-block">
                            {item.school_name || "PCTE Institute of Engineering and Technology"}
                        </p>
                        <p className="inline-block min-w-fit mx-2 text-[12px] font-medium" style={{ color }}>
                            {item.start_year}-{item.end_year}
                        </p>
                    </div>
                    <p className="my-1">{item.degree} in {item.branch}</p>
                    <p>{item.score}</p>
                </div>
            ))}
        </section>
    );

    // Additional sections (Projects, Skills, Work Experience, etc.)
    const SkillsSection = (
        <section className="h-fit m-2 min-w-full" key={"skills"}>
            <div className="text-xl font-bold" style={{ color }}>
                {resumeInfo.skills.title}
                {resumeInfo.skills.title && <div className="h-[1.5px] bg-black min-w-full mt-2"></div>}
            </div>
            <ul style={{ listStyleType: "disc" }} className="p-3">
                {resumeInfo.skills.detail?.map((item) => (
                    <li key={item.id}>{item}</li>
                ))}
            </ul>
        </section>
    );

    const WorkExperienceSection = (
        <section className="h-fit mt-2 min-w-full" key={"work_experience"}>
            <div className="text-xl font-bold" style={{ color }}>
                {resumeInfo.work_experience.title}
                {resumeInfo.work_experience.title && <div className="h-[1.5px] bg-black min-w-full mt-2"></div>}
            </div>
            {resumeInfo.work_experience.detail?.map((item) => (
                <div className="w-full h-fit my-1 p-1" key={item.id}>
                    <p className="inline-block font-semibold text-base">
                        <span className="text-sm" style={{ color }}>
                            {item.start_year}-{item.end_year}
                        </span>{" "}
                        | {item.position_title} | {item.company_name}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: item.work_summary }} />
                </div>
            ))}
        </section>
    );

    // Layout for two columns, like the original layout
    const column = [
        [EducationSection, SkillsSection],
        [WorkExperienceSection],
    ];

    return (
        <div ref={ref} className="h-full bg-white p-5 overflow-x-scroll no-scrollbar" style={{ scrollbarWidth: "none" }}>
            {PersonalDetailsSection}
            <div className="h-[0.5px] bg-black ml-5 mt-4 w-full"></div>
            <div className="flex justify-between py-2 px-3 gap-5">
                <div className="col-1 flex-col flex items-start justify-start min-w-[50%] p-3 pl-0 text-sm">
                    {column[0]}
                </div>
                <div className="col-2 flex-col flex items-start justify-start min-w-[50%] p-3 text-sm">
                    {column[1]}
                </div>
            </div>
        </div>
    );
});

export default ResumePageTemplate2;
