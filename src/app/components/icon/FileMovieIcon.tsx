import React from "react";

type FileMovieIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const FileMovieIcon = ({
  size = 32,
  color = "currentColor",
  ...props
}: FileMovieIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5} // ← 線を細く変更
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="3" x2="12" y2="4" />
      <rect x="4.5" y="5" width="15" height="10" rx="1" />
      <polygon points="11,8 14,10 11,12" fill={color} stroke="none" />
      <line x1="12" y1="16" x2="8.5" y2="19" />
      <line x1="12" y1="16" x2="15.5" y2="19" />
    </svg>
  );
};

export default FileMovieIcon;
