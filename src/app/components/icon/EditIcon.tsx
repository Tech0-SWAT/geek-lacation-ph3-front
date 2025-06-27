import React from "react";

type EditIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const EditIcon = ({
    size = 23,
    color = "currentColor",
    ...props
}: EditIconProps) => {
    return (
        <svg {...props} width={size} height={size} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 2.875H4.79167C4.28334 2.875 3.79582 3.07693 3.43638 3.43638C3.07693 3.79582 2.875 4.28334 2.875 4.79167V18.2083C2.875 18.7167 3.07693 19.2042 3.43638 19.5636C3.79582 19.9231 4.28334 20.125 4.79167 20.125H18.2083C18.7167 20.125 19.2042 19.9231 19.5636 19.5636C19.9231 19.2042 20.125 18.7167 20.125 18.2083V11.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.6087 2.5156C17.9899 2.13435 18.507 1.92017 19.0462 1.92017C19.5853 1.92017 20.1024 2.13435 20.4837 2.5156C20.8649 2.89685 21.0791 3.41393 21.0791 3.9531C21.0791 4.49227 20.8649 5.00935 20.4837 5.3906L11.8462 14.029C11.6186 14.2564 11.3375 14.4228 11.0287 14.513L8.27544 15.318C8.19298 15.342 8.10557 15.3435 8.02236 15.3221C7.93914 15.3008 7.86319 15.2575 7.80245 15.1968C7.74171 15.1361 7.69842 15.0601 7.6771 14.9769C7.65578 14.8937 7.65722 14.8063 7.68128 14.7238L8.48628 11.9705C8.57686 11.662 8.74362 11.3812 8.97119 11.154L17.6087 2.5156Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default EditIcon;