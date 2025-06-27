import { CreatorData } from '@/app/types/types';

export const mockCreatorData: CreatorData = {
  creator: {
    creator_id: "c001",
    name: "山田 太郎",
    name_furigana: "やまだ たろう",
    bio: "映像作家。15年以上の経験があります。",
    job_title: "ディレクター",
    company_id: "comp001",
    portfolio_site: "https://example.com",
    instagram: "@yamada_taro",
    file_name: "profile.jpg",
    gender: "male",
    caution: true,
    caution_reason: "過去に不正請求があったため、取引を禁止しています。",
    sns_link: ["https://twitter.com/yamada", "https://instagram.com/yamada"],
    occupations: [{ occupation_id: "1", occupation_name: "映像作家" }],
    avg_transaction_amount: 100000,
    min_transaction_amount: 50000,
    max_transaction_amount: 200000,
    median_transaction_amount: 100000,
    file_path: "/uploads/profiles/c001.jpg",
    company: {
      company_name: "映像制作会社",
      com_address: "東京都渋谷区",
      contact_email: "info@company.com",
      contact_phone: "03-1234-5678",
      contact_fax: "03-1234-5679",
      com_postal_code: "150-0001",
      website: "https://company.com"
    },
    inquiry_contact: {
      inquiry_phone: "03-8765-4321",
      inquiry_email: "inquiry@example.com"
    },
    personal_contact: {
      home_phone: null,
      mobile_phone: "090-1234-5678",
      personal_email: "taro@example.com",
      fax_number: null
    },
    addresses: [
      {
        address_id: "addr001",
        postal_code: "150-0001",
        address_country: "Japan",
        state: "Tokyo",
        city: "Shibuya",
        address_line: "1-1-1"
      }
    ]
  },
  comments: [
    {
      creator_id: "c001",
      employee_id: "e001",
      comment: "コミュニケーションがスムーズでした。",
      created_at: new Date("2024-05-01T10:00:00")
    },
    {
      creator_id: "c001",
      employee_id: "e002",
      comment: "プロジェクトの進行が非常にスムーズでした。",
      created_at: new Date("2024-05-15T12:00:00")
    }
  ],
relatedworks: 
  Array.from({ length: 25 }, () => ({
    product_id: "p001",
    title: "CM制作2024",
    product_number: "CM-2024-001",
    updated_at: new Date("2024-06-01T15:00:00"),
    thumbnail_url: "/thumbs/cm2024.jpg",
    internal_matter: false,
    transaction_amount: 100000,
    associated_employees: {
      PM: [
        {
          employee_id: "e002",
          employee_name: "佐藤 花子"
        }
      ],
      Producer: [null]
    }
  })),
  relatedstaff: [
    {
      creator_id: "c001",
      name: "佐藤 花子",
      occupations: [{ occupation_id: "2", occupation_name: "プロデューサー" }],
      file_name: ""
    }
  ]
};
