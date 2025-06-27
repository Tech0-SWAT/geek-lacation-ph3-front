import React from "react";

type ArrowDownRoundedIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const ArrowDownRoundedIcon = ({
    size = 24,
    color = "currentColor",
    ...props
}: ArrowDownRoundedIconProps) => {
    return (
        <svg {...props} width={size} height={size - 9} viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9375 0.672852C18.1428 0.470833 18.4613 0.445726 18.6943 0.597656L18.7881 0.673828L19.8262 1.7002C20.0287 1.9004 20.0543 2.20773 19.9023 2.43457L19.8262 2.52637L10.9258 11.3262C10.7207 11.5289 10.4024 11.5542 10.1689 11.4023L10.0742 11.3262L1.17383 2.52637C0.971392 2.32622 0.945828 2.01881 1.09766 1.79199L1.17383 1.7002L2.21191 0.673828C2.41668 0.471529 2.7344 0.445419 2.96777 0.59668L3.0625 0.672852L10.1494 7.64746L10.5 7.99219L10.8506 7.64746L17.9375 0.672852Z" fill={color}/>
        </svg>
    )
}

export default ArrowDownRoundedIcon;