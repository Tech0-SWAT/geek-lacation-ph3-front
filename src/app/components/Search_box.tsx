import { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import Middlebar from './Middlebar';
import { useFilter } from '@/app/context/FilterContext';

interface SearchProps {
  onSearch: (
    keyword: string,
    tags: {
      categories: string[];
      area: string[];
      price_day: number[];
      price_hour: number[];
    }
  ) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const { filters, setFilters } = useFilter();
  
  // テキスト入力の値を管理する状態
  const [keyword, setKeyword] = useState("");
  // 最後にユーザーが検索したキーワードを保持する
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [middlebarTags, setMiddlebarTags] = useState<{
    categories: string[];
    area: string[];
    price_day: number[];
    price_hour: number[];
  }>({ categories: [], area: [], price_day: [], price_hour: [] });

  // ユーザーがタグを操作したかどうかのフラグ
  const [hasUserChanged, setHasUserChanged] = useState(false);
  const [prevSearch, setPrevSearch] = useState<{
    keyword: string;
    tags: {
      categories: string[];
      area: string[];
      price_day: (number | null)[];
      price_hour: (number | null)[];
    };
  }>({
    keyword: '',
    tags: {
      categories: [],
      area: [],
      price_day: [null, null],
      price_hour: [null, null],
    },
  });

  // タグまたはキーワードが変化したときに、自動検索を実行（初回はスキップ）  
  useEffect(() => {
    // ユーザーが検索ボタンで一度検索している場合のみ自動検索を実行
    if (!hasUserChanged) return;
    
    const isSame =
      searchedKeyword === prevSearch.keyword &&
      JSON.stringify(middlebarTags) === JSON.stringify(prevSearch.tags);
  
    if (isSame) return;
  
    onSearch(searchedKeyword, middlebarTags);
    setPrevSearch({ keyword: searchedKeyword, tags: middlebarTags });
    // FilterContextにも全データを同期
    setFilters(prev => ({ 
      ...prev, 
      keyword: searchedKeyword,
      categories: middlebarTags.categories,
      locations: middlebarTags.area,
      price_day: middlebarTags.price_day.length === 2 ? [middlebarTags.price_day[0], middlebarTags.price_day[1]] : [null, null],
      price_hour: middlebarTags.price_hour.length === 2 ? [middlebarTags.price_hour[0], middlebarTags.price_hour[1]] : [null, null],
    }));
  }, [middlebarTags, searchedKeyword, hasUserChanged, onSearch, setFilters]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 検索ボタン押下時は、現在の入力値を使って検索し、保持する
    onSearch(keyword, middlebarTags);
    setSearchedKeyword(keyword);
    // FilterContextにも全データを同期
    setFilters(prev => ({ 
      ...prev, 
      keyword: keyword,
      categories: middlebarTags.categories,
      locations: middlebarTags.area,
      price_day: middlebarTags.price_day.length === 2 ? [middlebarTags.price_day[0], middlebarTags.price_day[1]] : [null, null],
      price_hour: middlebarTags.price_hour.length === 2 ? [middlebarTags.price_hour[0], middlebarTags.price_hour[1]] : [null, null],
    }));
  };

  const handleTagsChange = useCallback((tags: {
    categories: string[];
    area: string[];
    price_day: number[];
    price_hour: number[];
  }) => {
    setMiddlebarTags(tags);
    if (!hasUserChanged) setHasUserChanged(true);
    
    // FilterContextにもMiddlebarのデータを同期
    setFilters(prev => ({
      ...prev,
      categories: tags.categories,
      locations: tags.area,
      price_day: tags.price_day.length === 2 ? [tags.price_day[0], tags.price_day[1]] : [null, null],
      price_hour: tags.price_hour.length === 2 ? [tags.price_hour[0], tags.price_hour[1]] : [null, null],
    }));
  }, [hasUserChanged, setFilters]); 

  const handleClearAllRequest = () => {
    setKeyword("");
    setSearchedKeyword("");
    setMiddlebarTags({
      categories: [],
      area: [],
      price_day: [],
      price_hour: [],
    });
    // FilterContextの関連フィールドもクリア
    setFilters(prev => ({ 
      ...prev, 
      keyword: "",
      categories: [],
      locations: [],
      price_day: [null, null],
      price_hour: [null, null],
    }));
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="w-full md:w-3/4 lg:w-3/4 px-10 flex items-center justify-start space-x-4 mb-4">
        <span
          className="text-gray-500 cursor-not-allowed select-none"
          title="準備中です"
        >
          スタッフ
        </span>

        <span className="bg-[#FFEBBB] text-black px-5 py-2 rounded-full font-medium">
          ロケ地
        </span>

        <span
          className="text-gray-500 cursor-not-allowed select-none"
          title="準備中です"
        >
          作品
        </span>
      </div>

      <div className="w-full md:w-3/4 lg:w-3/4 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full mx-auto bg-white rounded-full shadow-lg"
      >
        {/* 検索アイコン */}
        <button
          type="submit"
          className="absolute left-4 top-1/2 -translate-y-1/2 focus:outline-none"
        >
          <FaSearch className="text-gray-600" />
        </button>

        {/* テキスト入力 */}
        <input
          type="text"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="フリーワード検索"
          className="w-full py-4 pl-12 text-gray-800 bg-transparent rounded-full focus:outline-none"
        />

        {/* フォトアイコン */}
        <span className="material-icons absolute right-8 top-1/2 -translate-y-1/2 text-2xl">
          insert_photo
        </span>
      </form>
        {/* <form onSubmit={handleSubmit} className="w-full mx-auto flex items-center bg-white rounded-full shadow-lg">
          <button
            type="submit"
            className="bg-white p-2 rounded-full focus:outline-none transition-colors flex items-center justify-center"
          >
            <FaSearch className="text-gray-600 ml-6" />
          </button>
          <input
            type="text"
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="フリーワード検索"
            className="flex-grow rounded-r-full pl-4 py-4 text-gray-800 bg-white focus:outline-none"
          />
          <span className="material-icons ml-3">
            insert_photo
          </span>
        </form> */}
      </div>
      <div className="w-full md:w-3/4 lg:w-3/4 px-4 mt-[45px]">
        <Middlebar onTagsChange={handleTagsChange} onClearAllRequest={handleClearAllRequest}/>
      </div>
    </div>
  );
}
