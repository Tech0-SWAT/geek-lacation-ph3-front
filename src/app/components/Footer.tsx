import Image from "next/image"

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row gap-4 md:gap-0 items-center md:items-end justify-between md:pl-[168px] md:pr-[198px] pt-[24px] pb-[24px]">
      {/* 左側ロゴ */}
      <div className="flex items-end space-x-2">
        <Image
          src="https://geekpictures.co.jp/jp/wp-content/themes/geek/img/logo_head.svg"
          alt="Geekpictures Logo"
          width={245}
          height={40}
        />
      </div>
      {/* 右側：著作権表示 */}
      <div className="text-[12px]">
        Copyright © GEEK PICTURES Inc. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
