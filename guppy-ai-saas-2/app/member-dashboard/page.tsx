'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Video, 
  FileText, 
  Shield, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  MessageSquare,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import VideoSection from './components/VideoSection';
import AIToolsSection from './components/AIToolsSection';

// --- COMPONENT: SIDEBAR NAVIGATION ---
function DashboardSidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'courses', label: 'E-Course', icon: FileText },
    { id: 'community', label: 'Komunitas', icon: Users },
    { id: 'videos', label: 'Video Tutorial', icon: Video },
    { id: 'tools', label: 'AI Tools', icon: Shield },
    { id: 'schedule', label: 'Jadwal Live', icon: Calendar },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-black/90 border-r border-red-900/30 fixed left-0 top-0 h-full z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Guppy Member</h2>
            <p className="text-red-400 text-xs">Premium Access</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-600/50 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-red-900/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-red-900/30">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-red-900/20 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

// --- COMPONENT: DASHBOARD OVERVIEW ---
function DashboardOverview() {
  const [stats, setStats] = useState({
    totalCourses: 15,
    completedCourses: 8,
    communityMembers: 1247,
    nextLive: '2024-01-25'
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Selamat Datang Kembali</h1>
          <p className="text-gray-400">Hari ini ada 3 materi baru yang bisa kamu pelajari</p>
        </div>
        <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-600/50 rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.completedCourses}/{stats.totalCourses}</div>
            <div className="text-xs text-gray-400">Kursus Selesai</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-600/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Kursus</p>
              <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
            </div>
            <FileText className="w-12 h-12 text-red-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border border-yellow-600/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Anggota Komunitas</p>
              <p className="text-2xl font-bold text-white">{stats.communityMembers}</p>
            </div>
            <Users className="w-12 h-12 text-yellow-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-600/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Live Selanjutnya</p>
              <p className="text-2xl font-bold text-white">{stats.nextLive}</p>
            </div>
            <Calendar className="w-12 h-12 text-blue-400" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/50 border border-red-900/30 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">Kursus Terbaru</h3>
          <div className="space-y-3">
            {['Breeding Advanced', 'Pakan Premium', 'Air Kualitas Tinggi'].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <span className="text-white">{course}</span>
                <button className="text-red-400 hover:text-red-300">Mulai →</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/50 border border-red-900/30 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">Aktivitas Terakhir</h3>
          <div className="space-y-3">
            {['Mengakses video tutorial', 'Bergabung di grup WA', 'Download materi PDF'].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT: E-COURSE SECTION ---
function ECourseSection() {
  const [courses] = useState([
    {
      id: 1,
      title: 'Breeding Dasar',
      description: 'Pelajari dasar-dasar breeding guppy yang benar',
      progress: 100,
      duration: '2 jam',
      level: 'Pemula'
    },
    {
      id: 2,
      title: 'Breeding Advanced',
      description: 'Teknik breeding tingkat lanjut untuk kontes',
      progress: 75,
      duration: '4 jam',
      level: 'Mahir'
    },
    {
      id: 3,
      title: 'Pakan Premium',
      description: 'Formula pakan alami untuk warna maksimal',
      progress: 40,
      duration: '1.5 jam',
      level: 'Menengah'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">E-Course Premium</h1>
          <p className="text-gray-400">Akses semua materi breeding guppy profesional</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 border border-red-900/30 rounded-2xl p-6 hover:border-red-600/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-red-900/30 text-red-300 text-xs rounded-full font-medium">
                {course.level}
              </span>
              <span className="text-gray-400 text-sm">{course.duration}</span>
            </div>
            
            <h3 className="text-white font-bold text-lg mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{course.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-600 to-red-800 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-black py-2 rounded-lg font-medium hover:from-red-500 hover:to-red-700 transition-all">
                Lanjutkan
              </button>
              <button className="p-2 border border-red-600/50 rounded-lg hover:bg-red-900/20 transition-all">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- COMPONENT: COMMUNITY SECTION ---
function CommunitySection() {
  const [messages] = useState([
    { id: 1, user: 'Budi', message: 'Hai semua! Baru saja berhasil breeding albino red...', time: '2 menit lalu' },
    { id: 2, user: 'Siti', message: 'Ada yang punya rekomendasi pakan alami?', time: '15 menit lalu' },
    { id: 3, user: 'Andi', message: 'Hasil breeding saya kemarin juara 1 di kontes lokal!', time: '1 jam lalu' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Komunitas Eksklusif</h1>
          <p className="text-gray-400">Berkomunikasi dengan sesama pecinta guppy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black/50 border border-red-900/30 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Grup Diskusi</h3>
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{msg.user}</span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex gap-2">
              <input 
                type="text" 
                placeholder="Ketik pesan..."
                className="flex-1 bg-black/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Kirim
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-black/50 border border-red-900/30 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Anggota Aktif</h3>
            <div className="space-y-3">
              {['Budi Santoso', 'Siti Rahayu', 'Andi Wijaya', 'Rina Permata', 'Agus Setiawan'].map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full"></div>
                  <span className="text-white text-sm">{member}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/50 border border-red-900/30 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Event Mendatang</h3>
            <div className="space-y-3">
              {[
                { title: 'Live Q&A Breeding', date: '25 Jan 2024', time: '20:00 WIB' },
                { title: 'Sharing Hasil Kontes', date: '28 Jan 2024', time: '19:00 WIB' }
              ].map((event, i) => (
                <div key={i} className="p-3 bg-black/30 rounded-lg">
                  <div className="font-medium text-white">{event.title}</div>
                  <div className="text-xs text-gray-400">{event.date} • {event.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT: ADMIN PANEL ---
function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400">Kelola konten dan member</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Admin Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Member', value: '1,247', icon: Users, color: 'from-red-600 to-red-800' },
                { title: 'Kursus Aktif', value: '15', icon: FileText, color: 'from-blue-600 to-blue-800' },
                { title: 'Pendapatan', value: 'Rp 45.2jt', icon: TrendingUp, color: 'from-green-600 to-green-800' },
                { title: 'Live Stream', value: '3', icon: Video, color: 'from-purple-600 to-purple-800' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 border border-red-900/30 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Manage Courses */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-bold">Kelola Kursus</h3>
                <button className="bg-gradient-to-r from-red-600 to-red-800 text-black px-4 py-2 rounded-lg font-medium hover:from-red-500 hover:to-red-700 transition-all">
                  <Plus className="w-4 h-4 inline mr-2" /> Tambah Kursus
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Breeding Dasar', 'Breeding Advanced', 'Pakan Premium', 'Air Kualitas Tinggi'].map((course, i) => (
                  <div key={i} className="bg-black/50 border border-red-900/30 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold">{course}</h4>
                      <div className="flex gap-2">
                        <button className="p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 border border-gray-600 rounded-lg hover:bg-red-900/20 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-black py-2 rounded-lg font-medium hover:from-red-500 hover:to-red-700 transition-all">
                        Lihat Detail
                      </button>
                      <button className="p-2 border border-red-600/50 rounded-lg hover:bg-red-900/20 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manage Members */}
          {activeTab === 'members' && (
            <div className="space-y-4">
              <h3 className="text-white font-bold">Kelola Member</h3>
              <div className="bg-black/50 border border-red-900/30 rounded-2xl p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left text-gray-400 pb-2">Nama</th>
                        <th className="text-left text-gray-400 pb-2">Email</th>
                        <th className="text-left text-gray-400 pb-2">Status</th>
                        <th className="text-left text-gray-400 pb-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Budi Santoso', email: 'budi@example.com', status: 'Aktif' },
                        { name: 'Siti Rahayu', email: 'siti@example.com', status: 'Aktif' },
                        { name: 'Andi Wijaya', email: 'andi@example.com', status: 'Pending' }
                      ].map((member, i) => (
                        <tr key={i} className="border-b border-gray-700">
                          <td className="py-3 text-white">{member.name}</td>
                          <td className="py-3 text-gray-400">{member.email}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              member.status === 'Aktif' 
                                ? 'bg-green-900/30 text-green-400 border border-green-600/50' 
                                : 'bg-yellow-900/30 text-yellow-400 border border-yellow-600/50'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <button className="px-3 py-1 bg-red-900/30 text-red-400 border border-red-600/50 rounded-lg text-xs hover:bg-red-900/50 transition-all">
                                Blokir
                              </button>
                              <button className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-600/50 rounded-lg text-xs hover:bg-green-900/50 transition-all">
                                Aktifkan
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Sidebar */}
        <div className="space-y-4">
          <div className="bg-black/50 border border-red-900/30 rounded-2xl p-6">
            <h4 className="text-white font-bold mb-4">Menu Admin</h4>
            <div className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'courses', label: 'Kelola Kursus', icon: FileText },
                { id: 'members', label: 'Kelola Member', icon: Users },
                { id: 'analytics', label: 'Statistik', icon: TrendingUp }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-all ${
                      activeTab === item.id 
                        ? 'bg-red-900/30 text-white border border-red-600/50' 
                        : 'text-gray-400 hover:text-white hover:bg-red-900/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'courses':
        return <ECourseSection />;
      case 'community':
        return <CommunitySection />;
      case 'videos':
        return <VideoSection />;
      case 'tools':
        return <AIToolsSection />;
      case 'schedule':
        return <div className="text-white">Jadwal Live Section</div>;
      case 'settings':
        return <AdminPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          backgroundSize: "300px",
          filter: "brightness(100%) contrast(150%)"
        }}
        aria-hidden="true"
      ></div>

      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      ></div>

      {/* Main Content */}
      <div className="relative z-10 ml-64">
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar */}
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}