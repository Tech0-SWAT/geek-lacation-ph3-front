import React from "react";

type TrainIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const TrainIcon = ({
    size = 24,
    color = "currentColor",
    ...props
}: TrainIconProps) => {
    return (
        <svg {...props} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2006_13606)">
                <path d="M22.5 4V16C22.5 18.4288 19.6114 20.5 16.4052 20.5L19.3574 22.8307C19.6362 23.0508 19.4795 23.5 19.125 23.5H4.875C4.51978 23.5 4.36444 23.0503 4.64264 22.8307L7.59478 20.5C4.39781 20.5 1.5 18.4353 1.5 16V4C1.5 1.51473 4.5 -0.5 7.5 -0.5H16.5C19.5469 -0.5 22.5 1.51473 22.5 4ZM20.25 10.375V5.125C20.25 4.50367 19.7463 4 19.125 4H4.875C4.25367 4 3.75 4.50367 3.75 5.125V10.375C3.75 10.9963 4.25367 11.5 4.875 11.5H19.125C19.7463 11.5 20.25 10.9963 20.25 10.375ZM12 13.375C10.5503 13.375 9.375 14.5503 9.375 16C9.375 17.4498 10.5503 18.625 12 18.625C13.4497 18.625 14.625 17.4498 14.625 16C14.625 14.5503 13.4497 13.375 12 13.375Z" fill={color}/>
            </g>
            <defs>
                <clipPath id="clip0_2006_13606">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}

export default TrainIcon;