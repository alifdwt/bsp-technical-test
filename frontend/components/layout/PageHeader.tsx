import React from "react";

const PageHeader = ({
  title,
  description,
}: {
  title: string | JSX.Element;
  description: string | JSX.Element;
}) => {
  return (
    <div className="rounded-xl border bg-white p-4 shadow">
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default PageHeader;
