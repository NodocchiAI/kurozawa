'use client';

interface FontSizeControlProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export default function FontSizeControl({ fontSize, onFontSizeChange }: FontSizeControlProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    console.log('スライダー変更:', newSize); // デバッグ
    onFontSizeChange(newSize);
  };

  return (
    <div className="absolute top-4 left-4 z-20 bg-black bg-opacity-70 rounded p-3">
      <div className="flex items-center gap-3 text-white text-sm">
        <span>フォント:</span>
        <div className="flex items-center gap-2">
          <span className="text-xs">12px</span>
          <input
            type="range"
            min="12"
            max="24"
            step="1"
            value={fontSize}
            onChange={handleSliderChange}
            className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs">24px</span>
        </div>
        <span className="text-xs bg-gray-700 px-2 py-1 rounded">
          {fontSize}px
        </span>
      </div>
    </div>
  );
}