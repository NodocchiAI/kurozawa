export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-black/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif text-red-400 mb-4">黒空文庫について</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              失われた作家たちの魂が宿る、もう一つの文学世界。
              この図書館に収められた作品は、現実と幻想の境界に存在する。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-serif text-red-400 mb-4">収蔵作品</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• 怪奇小説集</li>
              <li>• 幻想文学</li>
              <li>• 禁断の詩篇</li>
              <li>• 未発表原稿</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif text-red-400 mb-4">注意事項</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              当図書館の作品は全て架空のものです。
              実在の人物・団体とは一切関係ありません。
              深夜の閲覧は推奨いたしません。
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            © 2024 黒空文庫 - 禁断の小説墓場. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}