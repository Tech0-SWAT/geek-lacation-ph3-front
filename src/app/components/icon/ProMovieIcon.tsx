import React from "react";

type ProMovieIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const ProMovieIcon = ({
    size = 26,
    color = "currentColor",
    ...props
}: ProMovieIconProps) => {
    return (
        <svg {...props} width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.58268 5.41667V20.5833M18.416 5.41667V20.5833M2.97852 10.2917H7.58268M2.97852 15.7083H7.58268M18.416 10.2917H23.0202M18.416 15.7083H23.0202M2.97852 8.125C2.97852 7.26305 3.32093 6.4364 3.93042 5.8269C4.53991 5.21741 5.36656 4.875 6.22852 4.875H19.7702C20.6321 4.875 21.4588 5.21741 22.0683 5.8269C22.6778 6.4364 23.0202 7.26305 23.0202 8.125V17.875C23.0202 18.737 22.6778 19.5636 22.0683 20.1731C21.4588 20.7826 20.6321 21.125 19.7702 21.125H6.22852C5.36656 21.125 4.53991 20.7826 3.93042 20.1731C3.32093 19.5636 2.97852 18.737 2.97852 17.875V8.125Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default ProMovieIcon;