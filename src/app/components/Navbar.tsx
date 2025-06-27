import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()
  // 3点メニューの開閉状態を管理するフック
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // メニューを開閉するハンドラー
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <nav className="flex items-center justify-between pl-[168px] pr-4 pt-[16px] pb-[18px] border-b relative">
      {/* 左側ロゴ */}
      <div className="flex items-center space-x-2">
        <Image
          src="https://geekpictures.co.jp/jp/wp-content/themes/geek/img/logo_head.svg"
          alt="Geekpictures Logo"
          width={245}
          height={40}
        />
      </div>

      {/* 右側：サインイン／サインアウト と 3点メニュー */}
      <div className="flex items-center space-x-6">
        {/* 既存のサインイン／サインアウト部分 */}
        {session ? (
          <a href="/api/auth/signout" className="block">
            <div className="bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 cursor-pointer">
              <span>{session.user?.name}</span>
              {" | Sign out"}
            </div>
          </a>
        ) : (
          <div className="flex items-center space-x-4">
          {/* <span className="text-sm text-gray-600">未signin：表示数3 |</span> */}
          <a
            href="/api/auth/signin"
            className="bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 cursor-pointer"
          >
              Sign in
            </a>
          </div>
        )}

        {/* 3点メニューアイコン（縦に3つの点） */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {/* 縦に3つの点のアイコン */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {/* ドロップダウンメニュー（isMenuOpenがtrueの時のみ表示） */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10">
              {/* 例として2枚目の画像にあるようなメニュー項目を列挙 */}
              <div className="py-2 px-4 border-b font-bold">
                {session?.user?.name ?? "ゲスト"} ログイン中
              </div>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">履歴</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">ダウンロード</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">ブックマークとリスト</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">拡張機能</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">閲覧履歴データを削除...</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">検索と編集</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">その他のツール</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">ヘルプ</a>
              {/* 必要に応じてメニュー項目を追加 */}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
