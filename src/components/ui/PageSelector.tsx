"use client";

import React, { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";

const PageSelector = () => {
  const [pages, setPages] = useState([
    { name: "Page 1", checked: false },
    { name: "Page 2", checked: true },
    { name: "Page 3", checked: true },
    { name: "Page 4", checked: true },
  ]);

  const allChecked = pages.every((p) => p.checked);

  const toggleAll = () => {
    setPages(pages.map((p) => ({ ...p, checked: !allChecked })));
  };

  const togglePage = (index: number) => {
    setPages(
      pages.map((p, i) => (i === index ? { ...p, checked: !p.checked } : p))
    );
  };

  const handleDone = () => {
    alert("Selected Pages: " + pages.filter((p) => p.checked).map((p) => p.name).join(", "));
  };

  return (
    <div className="bg-[#FFFFFF] w-[578px] min-h-[794px] mx-auto mt-4 rounded-xl p-5">
      <div className="bg-[#FFFFFF] w-[370px] min-h-[326px] mx-auto mt-[85px] shadow-[0_6px_20px_rgba(0,0,0,0.12)] rounded-[6px] py-2.5">
        {/* All Pages */}
        <div className="flex justify-between items-center h=[42px] py-3 px-[22px]">
          <span className="text-[#1F2128] font-[14px] leading-[130%] tracking-0">All pages</span>
          <Checkbox checked={allChecked} onChange={toggleAll} />
        </div>

        <hr className="my-2 w-[340px] mx-auto border-[#CDCDCD]" />

        {/* Page list */}
        <div className="">
          {pages.map((page, index) => (
            <div
              key={page.name}
              className="flex justify-between items-center h=[42px] px-[22px] py-2.5"
            >
              <span className="text-[#1F2128] font-[14px] leading-[130%] tracking-0">{page.name}</span>
              <Checkbox
                checked={page.checked}
                onChange={() => togglePage(index)}
              />
            </div>
          ))}
        </div>

        <hr className="my-2 w-[340px] mx-auto border-[#CDCDCD]" />

        <Button label="Done" onClick={handleDone} />
      </div>
    </div>
  );
};

export default PageSelector;
