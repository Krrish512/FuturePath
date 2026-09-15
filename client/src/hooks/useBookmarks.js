import { useState, useEffect } from 'react';

const STORAGE_KEY = 'futurepath_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (err) {
      console.error('Failed to save bookmarks to localStorage', err);
    }
  }, [bookmarks]);

  const toggleBookmark = (item, type) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b._id === item._id && b.type === type);
      if (exists) {
        return prev.filter((b) => !(b._id === item._id && b.type === type));
      } else {
        return [...prev, { ...item, type }];
      }
    });
  };

  const isBookmarked = (id, type) => {
    return bookmarks.some((b) => b._id === id && b.type === type);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    clearBookmarks,
    bookmarkCount: bookmarks.length
  };
}
