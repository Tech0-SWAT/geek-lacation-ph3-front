import React from "react";

type MovieIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const MovieIcon = ({
    size = 24,
    color = "currentColor",
    ...props
}: MovieIconProps) => {
    return (
        <svg {...props} width={size} height={size - 6} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 1.6596L17.3304 5.32924V0.333706H0V17.6641H17.3304V12.6685L24 16.3382V1.6596Z" fill={color}/>
        </svg>
    )
}

export default MovieIcon;