import { useState } from "react";
import { InfoCard } from "../InfoCard";
import { InfoPopup } from "./InfoPopup";
import PhoneIcon from "../icon/PhoneIcon";
import MailIcon from "../icon/MailIcon";
import CompanyIcon from "../icon/CompanyIcon";
import FaxIcon from "../icon/FaxIcon";
import AddressIcon from "../icon/AddressIcon";
import HomepageIcon from "../icon/HomepageIcon";
import { Comment, Creator } from "@/app/types/types";
import { formatPhoneNumber } from "@/utils/format"

type ProfileCardProps = {
  creator: Creator;
  comments?: Array<Comment> | null;
};

// 電話番号のフォールバック（home → mobile）
const getPhone = (contact?: { home_phone?: string | null; mobile_phone?: string | null }) =>
  contact?.home_phone || contact?.mobile_phone || "";

export const ProfileCard = ({ creator, comments }: ProfileCardProps) => {
  return (
    <InfoCard
      headerContent={
        <>
          <h2 className="text-xl font-semibold text-accent">creator</h2>
          <div className="flex flex-grow" />
          {Array.isArray(comments) && comments.length > 0 && (
            <InfoPopup position="bottom-right">
              <h2 className="text-xl text-center w-full mt-2 mb-12">Information</h2>
              {comments.map((comment, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 px-16 py-6 text-base-primary font-semibold"
                >
                  <p className="text-sm py-2">{comment.comment}</p>
                  <p className="ml-auto text-sm">{comment.created_at.toLocaleDateString()}</p>
                </div>
              ))}
            </InfoPopup>
          )}
        </>
      }
      enableToggle
      expandedContent={
        <>
          <div>
            <h3 className="font-semibold mb-1 px-1">会社情報</h3>
            <hr className="my-4" />

            <div className="flex items-center gap-4 px-1 text-sm">
              <CompanyIcon size={20} />
              <span>所属</span>
              <div className="flex flex-grow" />
              <span>{creator?.company?.company_name ?? "N/A"}</span>
            </div>

            <hr className="my-4" />
            <div className="flex items-center gap-4 px-1 text-sm">
              <PhoneIcon size={20} />
              <span>電話番号</span>
              <div className="flex flex-grow" />
              <span>{formatPhoneNumber(creator?.company?.contact_phone)}</span>
            </div>

            <hr className="my-4" />
            <div className="flex items-center gap-4 px-1 text-sm">
              <FaxIcon size={20} />
              <span>FAX</span>
              <div className="flex flex-grow" />
              <span>{formatPhoneNumber(creator?.company?.contact_fax)}</span>
            </div>

            <hr className="my-4" />
            <div className="flex items-center gap-4 px-1 text-sm">
              <MailIcon size={20} />
              <span>メールアドレス</span>
              <div className="flex flex-grow" />
              <span>{creator?.company?.contact_email ?? "N/A"}</span>
            </div>

            <hr className="my-4" />
            <div className="flex items-center gap-4 px-1 text-sm">
              <AddressIcon size={20} />
              <span>住所</span>
              <div className="flex flex-grow" />
              <span>
                {"〒"}{creator?.company?.com_postal_code ?? ""} {creator?.company?.com_address ?? "N/A"}
              </span>
            </div>

            <hr className="my-4" />
            <div className="flex items-center gap-4 px-1 text-sm">
              <HomepageIcon size={20} />
              <span>ホームページ</span>
              <div className="flex flex-grow" />
              <a
                href={creator?.company?.website ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {creator?.company?.website ?? "N/A"}
              </a>
            </div>

            <hr className="my-4" />
          </div>

          <div className="mb-12">
            <h3 className="font-semibold mb-1 px-1">個人情報</h3>
            <hr className="my-4" />

            <div className="flex items-center gap-4 px-1 text-sm">
              <PhoneIcon size={20} />
              <span>電話番号</span>
              <div className="flex flex-grow" />
              <span>{formatPhoneNumber(getPhone(creator?.personal_contact))}</span>
            </div>

            <hr className="my-4" />
            <div className="flex items-center gap-4 px-1 text-sm">
              <MailIcon size={20} />
              <span>メールアドレス</span>
              <div className="flex flex-grow" />
              <span>{creator?.personal_contact?.personal_email ?? "N/A"}</span>
            </div>

            <hr className="my-4" />
            <div className="flex items-center gap-4 px-1 text-sm">
              <AddressIcon size={20} />
              <span>住所</span>
              <div className="flex flex-grow" />
              <span>
                {creator?.addresses && creator?.addresses[0] && (
                  creator.addresses[0].postal_code ||
                  creator.addresses[0].state ||
                  creator.addresses[0].city ||
                  creator.addresses[0].address_line
                )
                  ? `〒${creator.addresses[0].postal_code ?? ""} ${creator.addresses[0].state ?? ""}${creator.addresses[0].city ?? ""} ${creator.addresses[0].address_line ?? ""}`.trim()
                  : "N/A"}
              </span>
            </div>

            <hr className="my-4" />
            <div className="flex items-center gap-4 px-1 text-sm">
              <HomepageIcon size={20} />
              <span>ホームページ</span>
              <div className="flex flex-grow" />
              <a
                href={creator?.portfolio_site ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {creator?.portfolio_site ?? "N/A"}
              </a>
            </div>

            <hr className="my-4" />
          </div>
        </>
      }
    >
      <div className="mb-12">
        <h3 className="font-semibold mb-1 px-1">経歴</h3>
        <p className="px-1 pt-1 text-base-primary whitespace-pre-line">{creator?.bio}</p>
      </div>

      <div className="text-accent">
        <h3 className="font-semibold mb-1 px-1">問い合わせ先</h3>
        <hr className="my-4" />
        <div className="flex items-center gap-4 px-1 text-sm">
          <PhoneIcon size={20} />
          <span>電話番号</span>
          <div className="flex flex-grow" />
          <span>{formatPhoneNumber(creator?.inquiry_contact?.inquiry_phone)}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-center gap-4 px-1 text-sm">
          <MailIcon size={20} />
          <span>メールアドレス</span>
          <div className="flex flex-grow" />
          <span>{creator?.inquiry_contact?.inquiry_email ?? "N/A"}</span>
        </div>

        <hr className="my-4" />
      </div>
    </InfoCard>
  );
};
