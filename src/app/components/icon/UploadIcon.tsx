import React from "react";

type UploadIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const UploadIcon = ({
    size = 29,
    color = "currentColor",
    ...props
}: UploadIconProps) => {
    return (
        <svg {...props} width={size} height={size} viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.2913 19.334V9.48607L10.1497 12.6277L8.45801 10.8757L14.4997 4.83398L20.5413 10.8757L18.8497 12.6277L15.708 9.48607V19.334H13.2913ZM7.24967 24.1673C6.58509 24.1673 6.01637 23.9309 5.54351 23.458C5.07065 22.9852 4.83381 22.416 4.83301 21.7507V18.1257H7.24967V21.7507H21.7497V18.1257H24.1663V21.7507C24.1663 22.4152 23.9299 22.9844 23.4571 23.458C22.9842 23.9317 22.4151 24.1681 21.7497 24.1673H7.24967Z" fill={color}/>
        </svg>
    )
}

export default UploadIcon;