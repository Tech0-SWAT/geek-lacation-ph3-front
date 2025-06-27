import * as React from "react";
import { InfoRowProps } from "@/types/businesscard";

export const InfoRow: React.FC<InfoRowProps> = ({ 
  label, 
  company, 
  phone, 
  email 
}) => {
  return (
    <div className="w-full">
      <div className="text-black text-sm font-bold mb-1">
        {label}
      </div>
      <div className="flex flex-col gap-1 text-black text-xs">
        <div className="flex items-center gap-1">
          <span>💼</span>
          <span>{company}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📞</span>
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>✉️</span>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoRow;
