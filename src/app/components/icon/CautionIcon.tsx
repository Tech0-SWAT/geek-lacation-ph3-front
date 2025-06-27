import React from "react";

type CautionIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const CautionIcon = ({
    size = 20,
    color = "currentColor",
    ...props
}: CautionIconProps) => {
    return (
        <svg {...props} width={size} height={size - 1} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_998_9636" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="19">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.014 1L1.17578 17.8409H18.8523L10.014 1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M10.0137 14.296V14.7392M10.0137 7.20508L10.0172 11.6369" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </mask>
            <g mask="url(#mask0_998_9636)">
                <path d="M0.373047 -1.2168H19.6565V20.0559H0.373047V-1.2168Z" fill={color}/>
            </g>
        </svg>
    );
}

export default CautionIcon;