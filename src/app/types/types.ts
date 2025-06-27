// types.ts
export type Occupation = {
  occupation_id: string | number;
  occupation_name: string;
};

export type Address = {
  address_id: string | number | null;
  postal_code: string | null;
  address_country: string | null;
  state: string | null;
  city: string | null;
  address_line: string | null;
};

export type Company = {
  company_name: string | null;
  com_address: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_fax: string | null;
  com_postal_code: string | null;
  website: string | null;
};

export type InquiryContact = {
  inquiry_phone: string | null;
  inquiry_email: string | null;
} | null;

export type PersonalContact = {
  home_phone: string | null;
  mobile_phone: string | null;
  personal_email: string | null;
  fax_number: string | null;
};

export type Creator = {
  creator_id: string;
  name: string | null;
  name_furigana: string | null;
  bio: string | null;
  job_title: string | null;
  company_id: string | null;
  portfolio_site: string | null;
  instagram: string | null;
  file_name: string | null;
  gender: string | null;
  caution: boolean;
  caution_reason: string;
  sns_link: string[];
  occupations: Occupation[];
  avg_transaction_amount: number | null;
  min_transaction_amount: number | null;
  max_transaction_amount: number | null;
  median_transaction_amount: number | null;
  file_path: string;
  company: Company;
  inquiry_contact: InquiryContact;
  personal_contact: PersonalContact;
  addresses: Address[];
};

export type Comment = {
  creator_id: string;
  employee_id: string;
  comment: string;
  created_at: Date;
};

export type AssociatedEmployee = {
  employee_id: string | number;
  employee_name: string;
} | null;

export type RelatedWork = {
  product_id: string | number;
  title: string | null;
  product_number: string | null;
  updated_at: Date;
  thumbnail_url: string | null;
  internal_matter: boolean | null;
  transaction_amount: number;
  associated_employees: {
    PM: AssociatedEmployee[];
    Producer: AssociatedEmployee[];
  };
};

export type RelatedStaff = {
  creator_id: string;
  name: string | null;
  occupations: Occupation[];
  file_name: string | null;
};

export type CreatorData = {
  creator: Creator;
  comments: Comment[];
  relatedworks: RelatedWork[];
  relatedstaff: RelatedStaff[];
};
