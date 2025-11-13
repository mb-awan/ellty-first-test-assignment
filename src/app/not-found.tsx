'use client';
import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  function handler() {
    router.back();
  }
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="image flex justify-center">
          <Image
            alt={'not found'}
            className="h-auto w-full max-w-sm sm:max-w-md md:max-w-lg"
            height={237}
            src="/assets/images/not found.svg"
            width={640}
          />
        </div>
        <div className="title mx-auto mt-6 w-full max-w-md text-center sm:mt-8">
          <h2 className="text-2xl font-semibold tracking-normal sm:text-3xl md:text-4xl">Page Not Found</h2>
          <p className="mt-2 text-sm font-medium tracking-normal text-[#606060] sm:text-base md:text-lg">
            The link you clicked may be broken or the page may have been removed or renamed.
          </p>
          <div className="btn mt-6 flex justify-center sm:mt-8">
            <button
              className="flex cursor-pointer items-center gap-2 rounded-md border bg-red-500 px-4 py-3 text-white transition-colors duration-150 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:px-6 sm:py-3"
              onClick={handler}
            >
              <span>
                <Image alt="arrow" className="sm:size-6" height={20} src="/assets/images/arrow_forward.svg" width={20} />
              </span>
              <span className="text-sm font-medium sm:text-base">Go Back</span>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-[#f7e4e4] to-transparent sm:h-20"></div>
    </div>
  );
};

export default NotFound;
