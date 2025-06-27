import React from "react";

type ArrowBackIosIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const ArrowBackIosIcon = ({
    size = 28,
    color = "currentColor",
    ...props
}: ArrowBackIosIconProps) => {
    return (
        <svg width={size - 13} height={size} viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15 26.2508L13.2581 28L0.479529 15.1694C0.171986 14.856 0 14.4366 0 14C0 13.5634 0.171986 13.144 0.479529 12.8306L13.2581 0L15 1.75082L2.80154 14L15 26.2508Z" fill={color}/>
        </svg>
    )
}

export default ArrowBackIosIcon;