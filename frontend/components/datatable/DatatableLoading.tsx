import React from "react";

const DatatableLoading = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse p-2">
              <div className="h-7 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default DatatableLoading;
