import React from 'react';

// ImageGallery関数コンポーネントを定義します。imagesは親コンポーネントからのpropsです。
function ImageGallery({ images }) {
  // 画像をグリッドレイアウトで表示します。
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* images配列をmap関数で処理し、各画像を表示します。 */}
      {images.map((image, index) => (
        // 画像のキーはindexを使用し、src属性には画像のURLを設定します。alt属性には画像のタグを設定します。
        // <img key={index} src={image.webformatURL} alt={image.tags} className="w-full h-auto" />
        <a key={index} href={image.pageURL} target="_blank" rel="noopener noreferrer">
          <img src={image.webformatURL} alt={image.tags} className="w-full h-auto" />
        </a>
      ))}
    </div>
  );
}

// ImageGallery関数コンポーネントをエクスポートします。
export default ImageGallery;