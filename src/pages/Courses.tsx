import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const courses = [
  { id: '1', title: '零基础英语入门', language: 'en', level: 'A1', rating: 4.8, students: '12k', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800' },
  { id: '2', title: '进阶商务英语', language: 'en', level: 'B2', rating: 4.9, students: '8k', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
  { id: '3', title: '实用生活日语', language: 'ja', level: 'A2', rating: 4.7, students: '15k', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' },
  { id: '4', title: '新标准韩语初级', language: 'ko', level: 'A1', rating: 4.6, students: '10k', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800' },
  { id: '5', title: 'JLPT N2 冲刺', language: 'ja', level: 'B2', rating: 4.9, students: '20k', image: 'https://images.unsplash.com/photo-1542051812871-757500820028?auto=format&fit=crop&q=80&w=800' },
  { id: '6', title: '雅思高分听力', language: 'en', level: 'C1', rating: 4.8, students: '5k', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
];

const langs = [
  { id: 'all', name: '全部语言' },
  { id: 'en', name: '英语' },
  { id: 'ja', name: '日语' },
  { id: 'ko', name: '韩语' }
];

const levels = ['全部', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const Courses: React.FC = () => {
  const [activeLang, setActiveLang] = useState('all');
  const [activeLevel, setActiveLevel] = useState('全部');
  const navigate = useNavigate();

  const filteredCourses = courses.filter(c => {
    if (activeLang !== 'all' && c.language !== activeLang) return false;
    if (activeLevel !== '全部' && c.level !== activeLevel) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-display text-white mb-4">探索课程</h1>
          <p className="text-gray-400 text-lg">找到最适合你的语言学习路径</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="搜索课程名称、语言..." 
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all backdrop-blur-md"
            />
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {langs.map(lang => (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                className={`px-6 py-3 rounded-full whitespace-nowrap font-medium transition-all ${
                  activeLang === lang.id 
                    ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeLevel === level
                  ? 'bg-white/20 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={course.id}
              className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/30 transition-colors"
              onClick={() => navigate(`/learn/${course.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
                  {course.level}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.students} 学习者</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">24 课时</span>
                  <button className="px-4 py-2 bg-white/10 hover:bg-pink-500 hover:text-white rounded-xl text-sm font-medium transition-colors">
                    开始学习
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
