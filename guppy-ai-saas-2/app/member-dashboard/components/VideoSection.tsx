'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, Eye, Clock, Star, Share2, Heart, MessageCircle } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
  views: number;
  likes: number;
  isPremium: boolean;
  url: string;
}

export default function VideoSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', name: 'Semua', icon: '🎬' },
    { id: 'breeding', name: 'Breeding', icon: '🐟' },
    { id: 'feeding', name: 'Pakan', icon: '🥬' },
    { id: 'water', name: 'Air', icon: '💧' },
    { id: 'contests', name: 'Kontes', icon: '🏆' }
  ];

  const videos: Video[] = [
    {
      id: '1',
      title: 'Teknik Breeding Guppy Albino Red',
      description: 'Pelajari teknik breeding guppy albino red yang menghasilkan warna super terang',
      duration: '15:32',
      thumbnail: '/api/placeholder/400/225',
      category: 'breeding',
      views: 1247,
      likes: 89,
      isPremium: true,
      url: '/videos/breeding-albino-red'
    },
    {
      id: '2',
      title: 'Formula Pakan Alami untuk Warna Maksimal',
      description: 'Resep pakan alami yang bisa kamu buat sendiri di rumah',
      duration: '12:15',
      thumbnail: '/api/placeholder/400/225',
      category: 'feeding',
      views: 2156,
      likes: 156,
      isPremium: false,
      url: '/videos/formula-pakan'
    },
    {
      id: '3',
      title: 'Cara Menjaga Kualitas Air Ideal',
      description: 'Panduan lengkap menjaga kualitas air untuk pertumbuhan guppy optimal',
      duration: '18:45',
      thumbnail: '/api/placeholder/400/225',
      category: 'water',
      views: 1890,
      likes: 134,
      isPremium: true,
      url: '/videos/kualitas-air'
    },
    {
      id: '4',
      title: 'Persiapan Kontes Guppy Tingkat Nasional',
      description: 'Tips dan trik mempersiapkan guppy untuk kontes tingkat nasional',
      duration: '22:10',
      thumbnail: '/api/placeholder/400/225',
      category: 'contests',
      views: 987,
      likes: 76,
      isPremium: true,
      url: '/videos/persiapan-kontes'
    },
    {
      id: '5',
      title: 'Pemula: Perawatan Guppy Dasar',
      description: 'Panduan lengkap untuk pemula dalam merawat guppy',
      duration: '10:20',
      thumbnail: '/api/placeholder/400/225',
      category: 'breeding',
      views: 3421,
      likes: 245,
      isPremium: false,
      url: '/videos/perawatan-dasar'
    }
  ];

  const filteredVideos = videos.filter(video => 
    selectedCategory === 'all' || video.category === selectedCategory
  );

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.id).getTime() - new Date(a.id).getTime();
      case 'popular':
        return b.views - a.views;
      case 'rating':
        return b.likes - a.likes;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default:
        return 0;
    }
  });

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Video Tutorial</h1>
          <p className="text-gray-400">Kumpulan video tutorial breeding guppy profesional</p>
        </div>
        
        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="newest">Terbaru</option>
            <option value="popular">Terpopuler</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="duration">Durasi</option>
          </select>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-red-600 to-red-800 text-black border border-red-600/50'
                : 'bg-black/50 text-gray-400 border border-gray-600 hover:text-white hover:border-red-600/50'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {sortedVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/50 border border-red-900/30 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all group"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-red-900/20 to-red-800/20">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-red-600 ml-1" />
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>

                {/* Premium Badge */}
                {video.isPremium && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-600 to-yellow-800 text-black px-2 py-1 rounded text-xs font-bold">
                    PREMIUM
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatViews(video.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {video.likes}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-black py-2 px-4 rounded-lg font-medium hover:from-red-500 hover:to-red-700 transition-all group-hover:scale-105">
                    {video.isPremium ? 'Akses Premium' : 'Tonton Gratis'}
                  </button>
                  <button className="p-2 border border-red-600/50 rounded-lg hover:bg-red-900/20 transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-red-600/50 rounded-lg hover:bg-red-900/20 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {sortedVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">Tidak ada video ditemukan</div>
          <div className="text-gray-500">Coba pilih kategori lain atau cek kembali nanti</div>
        </div>
      )}
    </div>
  );
}