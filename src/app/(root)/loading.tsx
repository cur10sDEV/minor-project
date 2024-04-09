"use client";

import { useTheme } from "next-themes";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center h-full">
      <InfinitySpin width="350" color={theme === "light" ? "black" : "white"} />
    </div>
  );
};
export default Loading;
