import React, { useState, useEffect, useRef } from 'react';
import ToolBar from "./ToolBar";
import PersonalDetails3 from './sections/PersonalDetails3';
import { resData } from "../data/resumeData";
import { sections } from "../data/sections";
import ResumePageTemplate3 from "./ResumePageTemplate3";
import { useReactToPrint } from "react-to-print";
import { FaCloudDownloadAlt } from "react-icons/fa";

const CreativeResume = () => {
  const colors = ["#000000", "#c33434", "#5a2e7c", "#2a678d"];

  const [selectedColor, setSelectedColor] = useState(() => {
    const storedColor = localStorage.getItem("resumeColor");
    return storedColor ? storedColor : colors[0];
  });

  const [activeSection, setActiveSection] = useState(Object.keys(sections)[0]);
  const [resumeInfo, setResumeInfo] = useState(() => {
    const storedData = localStorage.getItem("resumeData");
    return storedData ? JSON.parse(storedData) : resData;
  });

  const [currValues, setCurrValues] = useState({ ...resumeInfo[activeSection] });

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeInfo));
  }, [resumeInfo]);

  const myref = useRef(null);

  const handleSave = (e) => {
    e.preventDefault();
    setResumeInfo((prev) => {
      const currSection = activeSection;
      return {
        ...prev,
        [currSection]: {
          ...currValues,
        },
      };
    });
    localStorage.setItem("resumeData", JSON.stringify(resumeInfo));
  };

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    setCurrValues((prev) => ({ ...prev, title: titleVal }));
  };

  const tabChange = (key) => {
    setActiveSection(key);
    setCurrValues(resumeInfo[key]);
  };

  return (
    <div className="relative w-screen bg-white">
      <ToolBar colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

      <div className="w-full flex flex-wrap gap-5">
        <div className="flex flex-col w-full min-w-300px max-w-[600px]">
          <div className="flex gap-3 m-4 flex-wrap">
            {Object.keys(sections).map((key) => (
              <div
                key={key}
                onClick={() => tabChange(key)}
                className={`${
                  activeSection === key
                    ? "bg-gradient-to-r from-pink-400 to-orange-300 border-0 text-white"
                    : "bg-white-300 text-slate-700 hover:bg-slate-100"
                } p-2 px-3 select-none hover:bg-border-300 border-2 rounded-lg cursor-pointer font-semibold`}
              >
                {sections[key]}
              </div>
            ))}
          </div>

          <div>
            {activeSection === "personal_details" && (
              <PersonalDetails3
                handleSave={handleSave}
                handleTitleChange={handleTitleChange}
                setCurrValues={setCurrValues}
                currValues={currValues}
              />
            )}
          </div>
        </div>

        <div className="max-w-[850px] rounded-md shadow-md max-h-[900px] m-4">
          {/* 👇 DOWNLOAD BUTTON */}
          <div className="bg-gradient-to-r from-pink-100 to-orange-200 p-0 border-2">
            <div className="w-fit bg-gradient-to-r from-pink-700 to-blue-600 rounded-3xl p-[1.5px] m-3">
              <button
                onClick={useReactToPrint({
                  content: () => myref.current,
                })}
                className="min-w-15 min-h-fit px-10 py-2 inline-block bg-gradient-to-l from-orange-400 to-yellow-400 rounded-3xl text-white font-semibold"
              >
                Download
              </button>
              <FaCloudDownloadAlt size={30} className="animate-bounce text-white inline-block mx-2" />
            </div>
          </div>

          {/* 👇 Resume preview */}
          <ResumePageTemplate3
            resumeInfo={resumeInfo}
            selectedColor={selectedColor}
            ref={myref}
          />
        </div>
      </div>
    </div>
  );
};

export default CreativeResume;
