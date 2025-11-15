"use client";

import React, { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";

interface PageState {
  name: string;
  checked: boolean;
  hasBeenSelectedBefore: boolean;
  isFirstTimeUnselection: boolean;
  isTransitioning: boolean;
  tempHovered: boolean;
}

const PageSelector = () => {
  const [allPageState, setAllPageState] = useState<PageState[]>([{
    name: "All pages",
    checked: false,
    hasBeenSelectedBefore: false,
    isFirstTimeUnselection: false,
    isTransitioning: false,
    tempHovered: false
  }]);

  const [pages, setPages] = useState<PageState[]>([
    {
      name: "Page 1",
      checked: false,
      hasBeenSelectedBefore: false,
      isFirstTimeUnselection: false,
      isTransitioning: false,
      tempHovered: false
    },
    {
      name: "Page 2",
      checked: false,
      hasBeenSelectedBefore: false,
      isFirstTimeUnselection: false,
      isTransitioning: false,
      tempHovered: false
    },
    {
      name: "Page 3",
      checked: false,
      hasBeenSelectedBefore: false,
      isFirstTimeUnselection: false,
      isTransitioning: false,
      tempHovered: false
    },
    {
      name: "Page 4",
      checked: false,
      hasBeenSelectedBefore: false,
      isFirstTimeUnselection: false,
      isTransitioning: false,
      tempHovered: false
    },
  ]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Separate logic function that can be used for all pages
  const handleCheckboxInteraction = (currentPage: PageState): PageState => {
    const page = { ...currentPage };

    if (!page.checked) {
      // SELECTING the page
      if (!page.hasBeenSelectedBefore) {
        // FIRST TIME SELECTION - requires double click
        if (!page.isTransitioning) {
          // First click - start transition
          page.isTransitioning = true;
        } else {
          // Second click - complete selection
          page.checked = true;
          page.hasBeenSelectedBefore = true;
          page.isFirstTimeUnselection = true;
          page.isTransitioning = false;
        }
      } else {
        // NOT FIRST TIME SELECTION - select immediately
        page.checked = true;
        page.isFirstTimeUnselection = true;
        page.isTransitioning = false;
      }
    } else {
      // UNSELECTING the page
      if (page.isFirstTimeUnselection) {
        // FIRST TIME UNSELECTION - requires double click
        page.checked = false;
        page.isFirstTimeUnselection = false;
        page.isTransitioning = true; // Blink effect
      } else {
        // NOT FIRST TIME UNSELECTION - unselect immediately
        page.checked = false;
        page.isTransitioning = true; // Blink effect
      }
    }

    return page;
  };

  const handlePageClick = (index: number) => {
    setPages(prevPages => {
      const newPages = [...prevPages];
      const currentPage = newPages[index];

      if(!currentPage) return newPages;

      const updatedPage = handleCheckboxInteraction(currentPage);
      newPages[index] = updatedPage;

      // Handle blink effect
      if (updatedPage.isTransitioning && !updatedPage.checked) {
        setTimeout(() => {
          setPages(currentPages => {
            const blinkUpdatedPages = [...currentPages];
            blinkUpdatedPages[index] = {
              ...(blinkUpdatedPages[index]!),
              isTransitioning: false
            };
            return blinkUpdatedPages;
          });
        }, 150);
      }

      return newPages;
    });
  };

  const handleAllPageClick = () => {
    setAllPageState(prevPages => {
      const newPages = [...prevPages];
      const currentPage = newPages[0];

      if (!currentPage) return newPages;

      const updatedPage = handleCheckboxInteraction(currentPage);
      newPages[0] = updatedPage;

      // Handle blink effect
      if (updatedPage.isTransitioning && !updatedPage.checked) {
        setTimeout(() => {
          setPages(currentPages => {
            const blinkUpdatedPages = [...currentPages];
            blinkUpdatedPages[0] = {
              ...(blinkUpdatedPages[0]!),
              isTransitioning: false
            };
            return blinkUpdatedPages;
          });
        }, 150);
      }

      return newPages;
    });
  };


  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getCheckboxProps = (page: PageState, index: number) => {
    const isHovered = hoveredIndex === index;

    // Determine which SVG to show based on the complex algorithm
    if (page.checked) {
      if (page.isTransitioning) {
        return { showLightBlueTick: true };
      } else if (isHovered) {
        if (page.isFirstTimeUnselection) {
          return { showLightBlueTick: true };
        } else {
          return { showBlankBox: true };
        }
      } else {
        return { showDarkBlueTick: true };
      }
    } else {
      if (isHovered) {
        if (!page.hasBeenSelectedBefore) {
          return { showGreyTick: true };
        } else if(page.isTransitioning){
          return { showLightBlueTick : true };
        } else {
          return { showBlankBoxBlackBorder: true };
        }
      } else {
        
        if (page.isTransitioning) {
          return { showBlackTick: true };
        } else if (!page.hasBeenSelectedBefore) {
          return { showBlankBox: true };
        } else {
          return { showBlankBoxBlackBorder: true };
        }
      }
    }
  };


  return (
    <div className="bg-[#FFFFFF] w-[578px] min-h-[794px] mx-auto mt-4 rounded-xl p-5">
      <div className="bg-[#FFFFFF] w-[370px] min-h-[326px] mx-auto mt-[85px] shadow-[0_6px_20px_rgba(0,0,0,0.12)] rounded-[6px] py-2.5">
        {/* All Pages */}
        <div
          className="flex justify-between items-center h-[42px] py-3 px-[22px] cursor-pointer hover:bg-blue-50 transition-colors duration-150 rounded-md"
          onClick={() => { handleAllPageClick }}
          onMouseEnter={() => handleMouseEnter(-1)}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-[#1F2128] font-[14px] leading-[130%] tracking-0">All pages</span>
          <Checkbox
            checked={allPageState[0]!.checked}
            onChange={() => {  handleAllPageClick }}
            isHovered={hoveredIndex === -1}
            hasBeenSelectedBefore={true}
            {...getCheckboxProps({
              name: allPageState[0]!.name,
              checked: allPageState[0]!.checked,
              hasBeenSelectedBefore: allPageState[0]!.hasBeenSelectedBefore,
              isFirstTimeUnselection: allPageState[0]!.isFirstTimeUnselection,
              isTransitioning: allPageState[0]!.isTransitioning,
              tempHovered: hoveredIndex === -1
            }, -1)}
          />
        </div>

        <hr className="my-2 w-[340px] mx-auto border-[#CDCDCD]" />

        {/* Page list */}
        <div className="">
          {pages.map((page, index) => (
            <div
              key={page.name}
              className="flex justify-between items-center h-[42px] px-[22px] py-2.5 cursor-pointer hover:bg-blue-50 transition-colors duration-150 rounded-md"
              onClick={() => handlePageClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-[#1F2128] font-[14px] leading-[130%] tracking-0">
                {page.name}
              </span>
              <Checkbox
                checked={page.checked}
                onChange={() => handlePageClick(index)}
                isHovered={hoveredIndex === index}
                hasBeenSelectedBefore={page.hasBeenSelectedBefore}
                isFirstTimeUnselection={page.isFirstTimeUnselection}
                isTransitioning={page.isTransitioning}
                {...getCheckboxProps(page, index)}
              />
            </div>
          ))}
        </div>

        <hr className="my-2 w-[340px] mx-auto border-[#CDCDCD]" />

        <Button label="Done" />
      </div>
    </div>
  );
};

export default PageSelector;