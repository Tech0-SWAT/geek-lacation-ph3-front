"use client"
// 必要なフックとコンポーネントをインポート
import { useRef, useState,useEffect } from 'react';
import Search from './components/Search_box';
import DisplayCards from './components/DisplayCards';
import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthGuard from '../components/AuthGuard';

const test_query = {
  "oid": "sample-org-002",
  "keyword": "",
  "occupations": ["プロデューサー"],
  "avg_min": null,
  "avg_max": null
}

// メインのHomeコンポーネント
export default function Home() {
  const { data: session } = useSession(
  //   {
  //   required: true,
  //   // sessionが必須であることを示す
  //   onUnauthenticated() {
  //       // redirect('/api/auth/signin?callbackUrl=/')
  //       console.log("signinしてください。")
  //   }
  // }
  );

  // 初期データ用
  const [initialFetchData, setInitialFetchData] = useState([]);
  // 表示用のデータ（初期表示時は初期データと同じ）
  const [displayData, setDisplayData] = useState([]);
  // ローディング状態
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  // 一度初期データを取得したかどうかを判定するフラグ
  const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);
  // サイドバーの開閉状態（モバイル用）
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // 初回実行済みかを判定するためのref
  const hasSearched = useRef(false);

  // サイドバーのトグル関数（モバイル用）
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // セッションがあり、初期データがまだ取得されていない場合にだけフェッチする
    if (!isInitialDataFetched) {
      handleSearch();
      setIsInitialDataFetched(true);
    }
  }, [isInitialDataFetched]);

  // //ログイン導入時
  // useEffect(() => {
  //   // セッションがあり、初期データがまだ取得されていない場合にだけフェッチする
  //   if (session && !isInitialDataFetched) {
  //     handleSearch();
  //     setIsInitialDataFetched(true);
  //   }
  // }, [session, isInitialDataFetched]);

  // useEffect(() => {
  //   if (session && displayData.length === 0) {
  //     handleSearch();
  //   }
  // }, [session, displayData]);

  // データをフェッチする関数
  const handleSearch = async () => {
    setLoading(true);
    try {
      const endpointURL = "/api/get_information_by_query";
      const res = await fetch(endpointURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: "",
          categories: [],
          area: [],
          price_day: [null, null],
          price_hour: [null, null]
        })
      });
  
      const data = await res.json();
      console.log("✅ 初期データ取得:", data);
      setInitialFetchData(data.results); // ← .results がある前提
    } catch (error) {
      console.error("❌ Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };


  const querySearch = async (
    keyword: string,
    tags: {
      categories: string[];
      area: string[];
      price_day: number[];
      price_hour: number[];
    }
  ) => {
    try {
      const endpointURL = "api/get_information_by_query";
      const bodyData = {
        keyword: keyword,
        categories: tags.categories ?? [],
        area: tags.area ?? [],
        price_day: tags.price_day.length === 2 ? tags.price_day : [null, null],
        price_hour: tags.price_hour.length === 2 ? tags.price_hour : [null, null],
      };
  
      console.log("Request body:", bodyData);
  
      const res = await fetch(endpointURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
  
      const data = await res.json();
      console.log("API response:", data);
  
      if (data.results) {
        const newArray = data.results.map((item: any) => ({
          creator_id: item.creator_id,
          creator_name: item.creator_name,
          file_name: item.file_name,
          latest_product_number: item.latest_product_number,
          latest_product_title: item.latest_product_title,
          latest_product_image_path: item.latest_product_image_path,
          latest_inquiry_email: item.latest_inquiry_email,
          latest_inquiry_phone: item.latest_inquiry_phone,
          occupations: item.occupations,
          company_name: item.company_name,
          name_furigana: item.creator_name_furinaga,
          gender: item.gender,
        }));
        setDisplayData(newArray);
      } else {
        console.warn("No results returned");
        setDisplayData([]);
      }
    } catch (error) {
      console.error("Query search error:", error);
    }
  };


  useEffect(() => {
    if (initialFetchData && initialFetchData.length > 0 && displayData.length === 0) {
      setDisplayData(initialFetchData);
    }
  }, [initialFetchData]);


  // ローディング中ならスピナーを表示
  if (loading) {
    return (
      <AuthGuard>
        <div className="lg:pb-0 pb-20">
          <Navbar />
          <div className="mt-[247px] mb-[161px]">
            <Search onSearch={querySearch}/>
          </div>
          <div className="pb-[300px] bg-[#F2F6F9]">
            Loading...
          </div>
          <Footer />
        </div>
      </AuthGuard>
    );
  }

  // ローディングが終わったら通常のUIを表示
  return (
    <AuthGuard>
      <div className="lg:pb-0 pb-20">
        <Navbar />
        <div className="mt-[247px] mb-[161px]">
          <Search onSearch={querySearch}/>
        </div>
        <DisplayCards 
          images={displayData} 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={toggleSidebar} 
        />
        <Footer />
      </div>
    </AuthGuard>
  );

  // コンポーネントのレンダリング
  // return (
  //   <>
  //     <Navbar />
  //     {session ? (
  //       <>
  //         <div className="mt-[247px] mb-[161px]">
  //           <Search onSearch={handleSearch} count={count} />
  //         </div>
  //         {/* <Middlebar onSearch={handleSearch} /> */}
  //         <DisplayCards images={displayData} />
  //         <Footer />
  //         <div className="flex justify-center mb-8">
  //         {/* <button
  //           onClick={handleSearch}
  //           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  //         >
  //           データを取得
  //         </button> */}
  //       </div>
  //       </>
  //     ) : (
  //       <div className="container mx-auto flex justify-center items-center h-screen">
  //         <p className="text-xl font-bold">サインインして下さい</p>
  //       </div>
  //       )
  //     }
  //   </>
  //   )
}
