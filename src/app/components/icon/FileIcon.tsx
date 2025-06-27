import React from "react";

type FileIconProps = {
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

const FileIcon = ({
  size = 30,
  color = "currentColor",
  ...props
}: FileIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <g transform="scale(0.8) translate(3, 3)">
        <path d="M13 2H6.5a1.5 1.5 0 0 0-1.5 1.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V8z" />
        <polyline points="12 2 12 8 18 8" />
        <line x1="9.5" y1="13" x2="14.5" y2="13" />
        <line x1="9.5" y1="17" x2="14.5" y2="17" />
      </g>
    </svg>
  );
};

export default FileIcon;
