'use client';

import { useState } from 'react';
import AuthGuard from '../../components/AuthGuard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TweetCard from './components/TweetCard';
import { tweetAnalysisData } from './data';

export default function TestPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    'all',
    'ビジネス',
    'テクノロジー',
    'AI',
    '起業',
    '時事問題',
    '宇宙',
    'ライフプラン',
    '本紹介'
  ];

  const filteredTweets = selectedCategory === 'all' 
    ? tweetAnalysisData 
    : tweetAnalysisData.filter(tweet => tweet.category === selectedCategory);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                ビジネス・tech系　話題のツイート分析
              </h1>
              <p className="text-gray-600">
                SNSで話題となっているビジネス・テクノロジー系ツイートの分析結果
              </p>
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category === 'all' ? '全て' : category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              {filteredTweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} />
              ))}
            </div>

            {filteredTweets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">該当するツイートが見つかりませんでした</p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}