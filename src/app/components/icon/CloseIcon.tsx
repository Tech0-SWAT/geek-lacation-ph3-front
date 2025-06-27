import React from "react";

type CloseIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const CloseIcon = ({
    size = 11,
    color = "currentColor",
    ...props
}: CloseIconProps) => {
    return (
        <svg {...props} width={size} height={size} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10L1 1M10 1L1 10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}

export default CloseIcon;