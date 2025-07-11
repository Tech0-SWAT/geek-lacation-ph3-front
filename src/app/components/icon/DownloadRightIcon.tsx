import React from "react";

type DownloadRightIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const DownloadRightIcon = ({
    size = 18,
    color = "currentColor",
    ...props
}: DownloadRightIconProps) => {
    return (
        <svg {...props} width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.3333 1H17V5.66667M16 2L11 7M9 2.33333H3C2.46957 2.33333 1.96086 2.54405 1.58579 2.91912C1.21071 3.29419 1 3.8029 1 4.33333V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H13.6667C14.1971 17 14.7058 16.7893 15.0809 16.4142C15.456 16.0391 15.6667 15.5304 15.6667 15V9" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default DownloadRightIcon;