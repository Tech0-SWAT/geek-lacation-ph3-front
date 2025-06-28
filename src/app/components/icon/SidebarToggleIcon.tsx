import React from 'react';

interface SidebarToggleIconProps {
  className?: string;
  size?: number;
}

export const SidebarToggleIcon: React.FC<SidebarToggleIconProps> = ({ 
  className = "", 
  size = 20 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 6H15M3 12H21M3 18H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SidebarToggleIcon;