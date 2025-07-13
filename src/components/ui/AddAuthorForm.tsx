'use client';

import { useState } from 'react';
import { Author } from '@/types';

interface AddAuthorFormProps {
  onSuccess?: (author: Author) => void;
}

export default function AddAuthorForm({ onSuccess }: AddAuthorFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    pseudonym: '',
    birthYear: '',
    deathYear: '',
    biography: '',
    era: '',
    genre: '',
    mysteriousBackground: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const authorData = {
        ...formData,
        birthYear: formData.birthYear ? parseInt(formData.birthYear) : undefined,
        deathYear: formData.deathYear ? parseInt(formData.deathYear) : undefined,
        genre: formData.genre.split(',').map(g => g.trim()).filter(g => g),
        pseudonym: formData.pseudonym || undefined,
        mysteriousBackground: formData.mysteriousBackground || undefined,
      };

      const response = await fetch('/api/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorData),
      });

      if (response.ok) {
        const newAuthor = await response.json();
        setFormData({
          name: '',
          pseudonym: '',
          birthYear: '',
          deathYear: '',
          biography: '',
          era: '',
          genre: '',
          mysteriousBackground: '',
        });
        setIsOpen(false);
        onSuccess?.(newAuthor);
      } else {
        alert('作家の追加に失敗しました');
      }
    } catch {
      alert('エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-900/30 border border-red-700 rounded hover:bg-red-900/50 transition-colors text-red-300"
      >
        + 新しい作家を追加
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-serif text-red-400 mb-6">新しい作家を追加</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              名前 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:border-red-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="pseudonym" className="block text-sm font-medium text-gray-300 mb-1">
              ペンネーム
            </label>
            <input
              type="text"
              id="pseudonym"
              name="pseudonym"
              value={formData.pseudonym}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:border-red-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="birthYear" className="block text-sm font-medium text-gray-300 mb-1">
                生年
              </label>
              <input
                type="number"
                id="birthYear"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:border-red-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="deathYear" className="block text-sm font-medium text-gray-300 mb-1">
                没年
              </label>
              <input
                type="number"
                id="deathYear"
                name="deathYear"
                value={formData.deathYear}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:border-red-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="era" className="block text-sm font-medium text-gray-300 mb-1">
              時代 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="era"
              name="era"
              value={formData.era}
              onChange={handleChange}
              required
              placeholder="例: 大正・昭和初期"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:border-red-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
              ジャンル <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              placeholder="例: 怪奇, 幻想, 詩 (カンマ区切り)"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:border-red-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="biography" className="block text-sm font-medium text-gray-300 mb-1">
              略歴 <span className="text-red-400">*</span>
            </label>
            <textarea
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:border-red-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="mysteriousBackground" className="block text-sm font-medium text-gray-300 mb-1">
              謎めいた背景
            </label>
            <textarea
              id="mysteriousBackground"
              name="mysteriousBackground"
              value={formData.mysteriousBackground}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:border-red-400 focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded hover:bg-gray-600 transition-colors text-gray-200"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-red-900/50 border border-red-700 rounded hover:bg-red-900 transition-colors text-red-300 disabled:opacity-50"
            >
              {isLoading ? '追加中...' : '追加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}