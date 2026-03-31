import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Clock, Target, Flame, Star } from 'lucide-react';
import { useStore } from '../store/useStore';

const Dashboard: React.FC = () => {
  const { user } = useStore();

  const stats = [
    { label: '连续打卡', value: '12天', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: '总学习时长', value: '45小时', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: '掌握词汇', value: '1,280', icon: BookOpen, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { label: '当前积分', value: user?.points || 0, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ];

  const todayTasks = [
    { id: 1, title: '完成 N3 语法第 4 单元', type: 'grammar', status: 'completed' },
    { id: 2, title: '复习 50 个生词', type: 'vocab', status: 'pending' },
    { id: 3, title: '商务邮件听力模拟', type: 'listening', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-white mb-2">
              欢迎回来, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">{user?.name}</span>
            </h1>
            <p className="text-gray-400">准备好继续你的外语探索了吗？</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">
              当前目标: 日语 N3
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl"
              >
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Recommended Path */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-pink-500" />
              推荐学习路径
            </h2>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-3xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-90 mix-blend-multiply"></div>
              <img 
                src="https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2092&auto=format&fit=crop" 
                alt="Japan" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative p-8 min-h-[300px] flex flex-col justify-end">
                <div className="bg-black/40 backdrop-blur-md w-fit px-3 py-1 rounded-full text-xs font-medium mb-4">
                  进阶课程
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">职场日语沟通技巧</h3>
                <p className="text-white/80 mb-6 max-w-md">
                  掌握地道的敬语表达与邮件撰写，提升职场竞争力。包含 12 个互动场景与口语模拟。
                </p>
                
                <div className="flex items-center gap-4">
                  <button className="bg-white text-pink-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                    <Play className="w-5 h-5 fill-current" />
                    继续学习
                  </button>
                  <div className="flex-1 max-w-xs">
                    <div className="flex justify-between text-xs text-white/90 mb-1">
                      <span>进度</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[45%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Daily Tasks */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              今日任务
            </h2>
            
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 space-y-4">
              {todayTasks.map((task, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  key={task.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${task.status === 'completed' ? 'border-green-500 bg-green-500/20' : 'border-gray-500'}
                  `}>
                    {task.status === 'completed' && <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {task.title}
                    </p>
                  </div>
                </motion.div>
              ))}

              <button className="w-full mt-4 py-3 rounded-xl border border-dashed border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-colors text-sm font-medium">
                查看全部任务
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
