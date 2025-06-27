import { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import Middlebar from './Middlebar';

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
  }, [middlebarTags, searchedKeyword, hasUserChanged, onSearch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 検索ボタン押下時は、現在の入力値を使って検索し、保持する
    onSearch(keyword, middlebarTags);
    setSearchedKeyword(keyword);
  };

  const handleTagsChange = useCallback((tags: {
    categories: string[];
    area: string[];
    price_day: number[];
    price_hour: number[];
  }) => {
    setMiddlebarTags(tags);
    if (!hasUserChanged) setHasUserChanged(true);
  }, [hasUserChanged]); 

  const handleClearAllRequest = () => {
    setKeyword("");
    setSearchedKeyword("");
    setMiddlebarTags({
      categories: [],
      area: [],
      price_day: [],
      price_hour: [],
    });
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="w-full md:w-3/4 lg:w-3/4 px-4">
        <form onSubmit={handleSubmit} className="w-full mx-auto flex items-center bg-white rounded-full shadow-lg">
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
        </form>
      </div>
      <div className="w-full md:w-3/4 lg:w-3/4 px-4 mt-[45px]">
        <Middlebar onTagsChange={handleTagsChange} onClearAllRequest={handleClearAllRequest}/>
      </div>
    </div>
  );
}
