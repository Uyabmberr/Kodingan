'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Palette, 
  Calculator, 
  Target, 
  Shield, 
  Download, 
  Copy, 
  RefreshCw,
  Eye,
  Zap,
  TrendingUp,
  Users,
  MessageCircle
} from 'lucide-react';

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  isPremium: boolean;
  features: string[];
}

export default function AIToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'Semua', icon: '✨' },
    { id: 'breeding', name: 'Breeding', icon: '🐟' },
    { id: 'analysis', name: 'Analisis', icon: '📊' },
    { id: 'design', name: 'Desain', icon: '🎨' },
    { id: 'business', name: 'Bisnis', icon: '💼' }
  ];

  const tools: AITool[] = [
    {
      id: 'color-predictor',
      name: 'AI Color Predictor',
      description: 'Prediksi warna keturunan guppy berdasarkan genetik induk',
      category: 'breeding',
      icon: Palette,
      isPremium: true,
      features: ['Analisis genetik', 'Prediksi warna 3 generasi', 'Rekomendasi pairing', 'Simulasi visual']
    },
    {
      id: 'health-analyzer',
      name: 'AI Health Analyzer',
      description: 'Analisis kesehatan guppy dari foto',
      category: 'analysis',
      icon: Eye,
      isPremium: true,
      features: ['Deteksi penyakit', 'Rekomendasi perawatan', 'Pemantauan pertumbuhan', 'Alert kesehatan']
    },
    {
      id: 'breeding-calculator',
      name: 'Breeding Calculator',
      description: 'Kalkulator optimal breeding dan pairing',
      category: 'breeding',
      icon: Calculator,
      isPremium: false,
      features: ['Optimal pairing', 'Estimasi jumlah anak', 'Waktu breeding', 'Manajemen kolam']
    },
    {
      id: 'market-analyzer',
      name: 'Market Analyzer',
      description: 'Analisis pasar dan harga guppy',
      category: 'business',
      icon: TrendingUp,
      isPremium: true,
      features: ['Tren harga', 'Permintaan pasar', 'Strategi pricing', 'Analisis kompetitor']
    },
    {
      id: 'guppy-designer',
      name: 'Guppy Designer',
      description: 'Desain guppy impian dengan AI',
      category: 'design',
      icon: Palette,
      isPremium: true,
      features: ['Desain custom', 'Simulasi visual', 'Rekomendasi breeding', 'Export desain']
    },
    {
      id: 'community-matcher',
      name: 'Community Matcher',
      description: 'Temukan partner breeding terbaik',
      category: 'business',
      icon: Users,
      isPremium: false,
      features: ['Matching partner', 'Rekomendasi kolaborasi', 'Forum diskusi', 'Event networking']
    },
    {
      id: 'feed-optimizer',
      name: 'Feed Optimizer',
      description: 'Optimalkan pakan untuk warna maksimal',
      category: 'breeding',
      icon: Calculator,
      isPremium: false,
      features: ['Formula pakan', 'Jadwal feeding', 'Nutrisi optimal', 'Rekomendasi alami']
    },
    {
      id: 'water-quality',
      name: 'Water Quality AI',
      description: 'Pantau kualitas air secara real-time',
      category: 'analysis',
      icon: Shield,
      isPremium: true,
      features: ['Monitoring parameter', 'Alert kualitas', 'Rekomendasi perawatan', 'Log histori']
    }
  ];

  const filteredTools = tools.filter(tool => 
    selectedCategory === 'all' || tool.category === selectedCategory
  );

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const ToolCard = ({ tool }: { tool: AITool }) => (
    <motion.div
      key={tool.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/50 border border-red-900/30 rounded-2xl p-6 hover:border-red-600/50 transition-all cursor-pointer"
      onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
            <tool.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{tool.name}</h3>
            <p className="text-gray-400 text-sm">{tool.category}</p>
          </div>
        </div>
        {tool.isPremium && (
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-black px-2 py-1 rounded-full text-xs font-bold">
            PREMIUM
          </div>
        )}
      </div>
      
      <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {tool.features.slice(0, 2).map((feature, i) => (
            <span key={i} className="px-2 py-1 bg-black/30 text-gray-400 text-xs rounded-full">
              {feature}
            </span>
          ))}
          {tool.features.length > 2 && (
            <span className="px-2 py-1 bg-black/30 text-gray-400 text-xs rounded-full">
              +{tool.features.length - 2}
            </span>
          )}
        </div>
        
        <button className="p-2 border border-red-600/50 rounded-lg hover:bg-red-900/20 transition-all">
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Expanded View */}
      {activeTool === tool.id && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-white font-semibold mb-2">Fitur Utama:</h4>
              <ul className="space-y-1">
                {tool.features.map((feature, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Kategori:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-900/30 text-red-300 text-sm rounded-full">
                  {tool.category}
                </span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded-full">
                  AI Powered
                </span>
                {tool.isPremium && (
                  <span className="px-3 py-1 bg-yellow-900/30 text-yellow-300 text-sm rounded-full">
                    Premium
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-black py-2 px-4 rounded-lg font-medium hover:from-red-500 hover:to-red-700 transition-all">
              {tool.isPremium ? 'Upgrade to Premium' : 'Gunakan Sekarang'}
            </button>
            <button className="p-2 border border-red-600/50 rounded-lg hover:bg-red-900/20 transition-all">
              <Copy className="w-4 h-4" />
            </button>
            <button className="p-2 border border-red-600/50 rounded-lg hover:bg-red-900/20 transition-all">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Tools Premium</h1>
          <p className="text-gray-400">Alat AI canggih untuk breeding guppy profesional</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/50 border border-gray-600 rounded-lg px-3 py-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">AI Powered</span>
          </div>
          <div className="flex items-center gap-2 bg-black/50 border border-gray-600 rounded-lg px-3 py-2">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Smart Analysis</span>
          </div>
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

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filteredTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">Tidak ada tools ditemukan</div>
          <div className="text-gray-500">Coba pilih kategori lain atau cek kembali nanti</div>
        </div>
      )}

      {/* AI Features Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-600/30 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">AI Prediction</span>
          </div>
          <p className="text-gray-400 text-sm">Prediksi akurat berdasarkan data dan machine learning</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-600/30 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-white font-semibold">Smart Analysis</span>
          </div>
          <p className="text-gray-400 text-sm">Analisis cerdas untuk keputusan breeding terbaik</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-600/30 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold">Optimization</span>
          </div>
          <p className="text-gray-400 text-sm">Optimalkan hasil breeding dan keuntungan</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-600/30 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold">Community AI</span>
          </div>
          <p className="text-gray-400 text-sm">Fitur AI berbasis komunitas dan pengalaman</p>
        </div>
      </div>
    </div>
  );
}