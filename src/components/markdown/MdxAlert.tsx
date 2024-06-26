"use client"
import { ReactNode } from "react";

type Props = {
  type?: "warning" | "error" | "info";
  children?: ReactNode;
};

export default function MdxAlert(props: Readonly<Props>) {
  const { children, type = "info" } = props;

  const alertTypeClasses = {
    info: "border-teal-600 text-teal-800",
    warning: "border-orange-600 text-orange-700",
    error: "border-red-600 text-red-700",
  };

  const svgColorClass = {
    info: "text-teal-600",
    warning: "text-orange-600",
    error: "text-red-600",
  };

  return (
    <div
      className={`my-4 flex items-center border-t-4 rounded-b px-4 py-4 shadow-md ${alertTypeClasses[type]}`}

    >
      <svg
        className={`fill-current h-6 w-6 mr-4 ${svgColorClass[type]}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
      </svg>
      <p>{children}</p>
    </div>
  );
}
