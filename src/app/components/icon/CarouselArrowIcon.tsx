import React from "react";

type CarouselArrowIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const CarouselArrowIcon = ({
    size = 62,
    color = "currentColor",
    ...props
}: CarouselArrowIconProps) => {
    return (
        <svg {...props} width={size - 40} height={size} viewBox="0 0 22 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 60.8555L1 30.8555L21 0.855469" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default CarouselArrowIcon;