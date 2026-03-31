import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Zap, Flame, Trophy, Crown, Hexagon } from 'lucide-react';
import { useStore } from '../store/useStore';

const badges = [
  { id: 1, name: '初出茅庐', desc: '完成第一节课程', icon: Hexagon, color: 'text-blue-400', bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', earned: true },
  { id: 2, name: '坚持不懈', desc: '连续打卡 7 天', icon: Flame, color: 'text-orange-400', bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', earned: true },
  { id: 3, name: '词汇达人', desc: '掌握 1000 个单词', icon: Zap, color: 'text-yellow-400', bg: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500/30', earned: true },
  { id: 4, name: '口语王者', desc: '口语练习评分达到 S', icon: Crown, color: 'text-pink-400', bg: 'from-pink-500/20 to-purple-500/20', border: 'border-pink-500/30', earned: false },
  { id: 5, name: '社区之星', desc: '帖子获得 100 次点赞', icon: Star, color: 'text-green-400', bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', earned: false },
  { id: 6, name: '语言大师', desc: '完成任意高级(C1)课程', icon: Trophy, color: 'text-purple-400', bg: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500/30', earned: false },
];

const Profile: React.FC = () => {
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative">
            <img src="https://i.pravatar.cc/150?u=myprofile" alt="User" className="w-32 h-32 rounded-full border-4 border-white/10 z-10 relative" />
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-orange-500 w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#0f172a] z-20">
              <span className="text-white font-bold text-sm">Lv.5</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="text-3xl font-bold text-white mb-2">{user?.name}</h1>
            <p className="text-gray-400 mb-6">加入 LinguaNova 已有 128 天</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <span className="block text-xs text-gray-500 mb-1">当前积分</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {user?.points}
                </span>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <span className="block text-xs text-gray-500 mb-1">全球排名</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-pink-500" />
                  Top 5%
                </span>
              </div>
            </div>
          </div>

          <button className="md:absolute top-8 right-8 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors border border-white/10 z-10">
            编辑资料
          </button>
        </div>

        {/* Achievement Wall */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-pink-500" />
            荣誉成就墙
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  key={badge.id}
                  className={`relative overflow-hidden rounded-3xl p-6 border transition-all ${
                    badge.earned 
                      ? `bg-gradient-to-br ${badge.bg} ${badge.border} hover:scale-105` 
                      : 'bg-white/5 border-white/5 grayscale opacity-60'
                  }`}
                >
                  {badge.earned && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full pointer-events-none"></div>
                  )}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-black/20 backdrop-blur-md border ${badge.earned ? badge.border : 'border-white/10'}`}>
                    <Icon className={`w-8 h-8 ${badge.earned ? badge.color : 'text-gray-500'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{badge.name}</h3>
                  <p className="text-gray-400 text-sm">{badge.desc}</p>
                  
                  {!badge.earned && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-500 w-1/3"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-right">进度: 33%</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
