import React from "react";

type TagBadgeProps = {
  label: string;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export const TagBadge = ({ label, className = "", ...props }: TagBadgeProps) => {
  const baseClass =
    "border border-accent bg-white text-accent rounded-full py-1.5 justify-center flex items-center";

  return (
    <span className={`${baseClass} ${className}`} {...props}>
      {label}
    </span>
  );
};

