'use client';

import { useState } from 'react';
import FontSizeControl from './FontSizeControl';

interface ReaderMenuProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export default function ReaderMenu({ fontSize, onFontSizeChange }: ReaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFontControl, setShowFontControl] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleFontControl = () => {
    console.log('フォントサイズクリック:', !showFontControl); // デバッグ
    setShowFontControl(!showFontControl);
    setIsOpen(false); // メニューを閉じる
  };

  return (
    <div className="relative z-30">
      {/* メニューアイコン */}
      <button
        onClick={toggleMenu}
        className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1"/>
          <circle cx="12" cy="5" r="1"/>
          <circle cx="12" cy="19" r="1"/>
        </svg>
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-black bg-opacity-90 rounded-lg shadow-lg border border-gray-600">
          <div className="py-2">
            {/* フォントサイズ調整 */}
            <button
              onClick={toggleFontControl}
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center justify-between"
            >
              <span>フォントサイズ</span>
              <span className="text-xs text-gray-400">{fontSize}px</span>
            </button>
            
            {/* 将来の機能用スロット */}
            <button className="w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-700" disabled>
              しおり機能（準備中）
            </button>
            <button className="w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-700" disabled>
              テーマ変更（準備中）
            </button>
            <button className="w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-700" disabled>
              読み上げ（準備中）
            </button>
          </div>
        </div>
      )}

      {/* フォントサイズ調整パネル */}
      {showFontControl && (
        <div className="absolute right-0 top-12 w-72">
          <div className="bg-black bg-opacity-90 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">フォントサイズ調整</h3>
              <button
                onClick={toggleFontControl}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white">12px</span>
              <input
                type="range"
                min="12"
                max="24"
                step="1"
                value={fontSize}
                onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-xs text-white">24px</span>
              <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded min-w-[50px] text-center">
                {fontSize}px
              </span>
            </div>
          </div>
        </div>
      )}

      {/* オーバーレイ（メニューを閉じる用） */}
      {(isOpen || showFontControl) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setIsOpen(false);
            setShowFontControl(false);
          }}
        />
      )}
    </div>
  );
}