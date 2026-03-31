import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Share2, TrendingUp, Users, PenSquare } from 'lucide-react';

const posts = [
  { id: 1, author: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=1', title: '如何突破日语 N2 听力瓶颈？', content: '分享一下我最近使用的影子跟读法，配合平台的听力模块，感觉效果非常明显...', likes: 234, comments: 45, time: '2小时前', tags: ['日语学习', '经验分享'] },
  { id: 2, author: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?u=2', title: '英语口语打卡第30天！', content: '今天终于能够流利地完成商务英语场景的所有对话了，感谢每天坚持的自己！', likes: 512, comments: 89, time: '5小时前', tags: ['英语打卡', '成就分享'] },
  { id: 3, author: 'Kim Min', avatar: 'https://i.pravatar.cc/150?u=3', title: '韩语敬语体系整理图表', content: '花了一周时间把初中级所有敬语变形做成了思维导图，希望能帮到大家~', likes: 890, comments: 120, time: '1天前', tags: ['韩语学习', '干货资源'] },
];

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-display text-white mb-2">全球学习社区</h1>
              <p className="text-gray-400">与 100,000+ 语言学习者交流心得</p>
            </div>
            <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition-transform">
              <PenSquare className="w-5 h-5" />
              发布动态
            </button>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={post.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full border-2 border-white/20" />
                  <div>
                    <h4 className="text-white font-medium">{post.author}</h4>
                    <p className="text-sm text-gray-500">{post.time}</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{post.content}</p>

                <div className="flex gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-pink-400">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>分享</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              热门话题
            </h3>
            <div className="space-y-4">
              {['# JLPT 备考指南', '# 英语四六级冲刺', '# 每日口语打卡', '# 语言学习工具推荐'].map((topic, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-gray-400 group-hover:text-pink-400 transition-colors">{topic}</span>
                  <span className="text-xs text-gray-600">热度 {(5-i)*12}k</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/30 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/20 blur-[30px] rounded-full"></div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 relative z-10">
              <Users className="w-5 h-5 text-pink-400" />
              寻找语伴
            </h3>
            <p className="text-sm text-gray-400 mb-6 relative z-10">匹配与你语言互补的学习伙伴，共同进步！</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/10 relative z-10">
              一键匹配
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Community;
