export interface FilterItemProps {
  label: string;
  count: number;
}

export interface FilterSectionProps {
  title: string;
  items: FilterItemProps[];
}

// export interface PaginationProps {
//   currentPage: number;
//   totalItems: number;
//   itemsPerPage: number;
//   onPrevious: () => void;
//   onNext: () => void;
// }

export interface InfoRowProps {
  label: string;
  company: string;
  phone: string;
  email: string;
}

export interface TagProps {
  text: string;
}

export interface BusinessCardProps {
  uuid:string;
  image: string;
  name:string;
  furigana:string;
  personInfo: {
    name: string;
    name_furigana: string;
    department: string;
    mobile_phone: string;
    personal_email: string;
  };
  tags: string[];
  date: string;
  fileType: string;
  title: string; // 作品の説明文（複数行も可能）
  work:string;
  company:string;
  inquiry_email:string;
  inquiry_phone:string;

  latest_product_id?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  startItem?: number;
  endItem?: number;
  onPrevious: () => void;
  onNext: () => void;
}