type ImageModalProps = {
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
  };
  
  export const ImageModal = ({ images, currentIndex, onClose, onPrev, onNext }: ImageModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="relative max-w-full max-h-full">
          <img src={images[currentIndex]} alt="拡大画像" className="max-h-[90vh] max-w-[90vw] object-contain" />
          {/* 閉じるボタン */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-2xl"
          >
            ×
          </button>
          {/* 前へ・次へ */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl px-4"
              >
                ◀
              </button>
              <button
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-4xl px-4"
              >
                ▶
              </button>
            </>
          )}
        </div>
      </div>
    );
  };