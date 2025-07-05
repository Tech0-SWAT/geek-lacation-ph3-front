import Image from 'next/image';
import { TweetCardProps } from '../types';

export default function TweetCard({ tweet }: TweetCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {tweet.imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={tweet.imageUrl}
              alt={`${tweet.content}の画像`}
              width={208}
              height={200}
              className="rounded-md object-cover w-full sm:w-[208px] h-[200px]"
            />
          </div>
        )}
        
        <div className="flex-1 space-y-2 min-w-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">内容：</span>
              <span className="text-sm text-gray-900">{tweet.content}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">画像：</span>
              <span className="text-sm text-gray-900">
                {tweet.hasImage ? 'あり' : 'なし'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">リンク：</span>
              <span className="text-sm text-gray-900">
                {tweet.hasLink ? 'あり' : 'なし'}
              </span>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-gray-700">リプライ：</span>
              <span className="text-sm text-gray-900">
                {tweet.hasReplies ? (
                  <>
                    あり・・・{tweet.replyTypes.join('、')}
                  </>
                ) : (
                  'なし'
                )}
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-900 font-medium">
            {tweet.followerText}
          </div>
          
          {tweet.insights && (
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-gray-700">気づきその他：</span>
              <span className="text-sm text-gray-900 break-words">{tweet.insights}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}