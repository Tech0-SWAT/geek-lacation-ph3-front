import React from "react";

type TagBadgeButtonProps = {
  label: string;
  className?: string;
  select?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export const TagBadgeButton = ({
  label,
  className = "",
  select = false,
  ...props
}: TagBadgeButtonProps) => {
  const baseClass =
    "rounded-full py-1.5 justify-center flex items-center border";

  const selectedClass = select
    ? "bg-accent text-white border-none"
    : "bg-white text-accent border-accent";

  return (
    <button className={`${baseClass} ${selectedClass} ${className}`} {...props}>
      {label}
    </button>
  );
};
