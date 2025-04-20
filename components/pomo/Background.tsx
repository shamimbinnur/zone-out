import { FC, ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

const Background: FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="bg-midnight-moss">
      <div className="min-h-screen">{children}</div>
    </div>
  );
};

export default Background;
