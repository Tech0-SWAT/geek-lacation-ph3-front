import React from "react";

type PlusIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const PlusIcon = ({
    size = 13,
    color = "currentColor",
    ...props
}: PlusIconProps) => {
    return (
        <svg {...props} width={size} height={size - 1} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 5.18304H7.31696V0H5.68304V5.18304H0.5V6.81696H5.68304V12H7.31696V6.81696H12.5V5.18304Z" fill={color}/>
        </svg>
    )
}

export default PlusIcon;