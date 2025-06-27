import React from 'react';

type DownloadIconProps = {
    size?: number;
    color?: string;
} & React.SVGProps<SVGSVGElement>;

const DownloadIcon = ({
    size = 24,
    color = "currentColor",
    ...props
}: DownloadIconProps) => {
    return (
        <svg {...props} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5013 18.8223L10.225 14.5472L11.0805 13.6772L13.8971 16.4938V6.04175H15.1055V16.4938L17.9209 13.6784L18.7776 14.5472L14.5013 18.8223ZM7.99564 22.9584C7.439 22.9584 6.97459 22.7723 6.60243 22.4002C6.23026 22.028 6.04377 21.5632 6.04297 21.0057V18.078H7.2513V21.0057C7.2513 21.1918 7.32864 21.3626 7.4833 21.5181C7.63797 21.6736 7.80834 21.7509 7.99443 21.7501H21.0082C21.1935 21.7501 21.3638 21.6727 21.5193 21.5181C21.6748 21.3634 21.7521 21.1926 21.7513 21.0057V18.078H22.9596V21.0057C22.9596 21.5624 22.7736 22.0268 22.4014 22.399C22.0292 22.7711 21.5644 22.9576 21.007 22.9584H7.99564Z" fill={color}/>
        </svg>
    )
}

export default DownloadIcon;