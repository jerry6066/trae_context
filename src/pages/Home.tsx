import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Mic, Trophy, ArrowRight } from 'lucide-react';

const FloatingCharacters = () => {
  const chars = ['A', 'あ', '한', 'Ω', 'é', '語', 'ß', 'च'];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {chars.map((char, index) => (
        <motion.div
          key={index}
          className="absolute text-6xl font-bold text-white/40"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -500],
            rotate: [null, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {char}
        </motion.div>
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/30 rounded-full blur-[120px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-secondary/30 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[150px] animate-blob" style={{ animationDelay: '4s' }}></div>

      <FloatingCharacters />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 animate-float">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-pink-400 mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>全新一代多语种学习平台</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white"
          >
            打破语言界限<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
              探索无限可能
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl text-gray-400 font-light"
          >
            英语、日语、韩语全覆盖。通过沉浸式互动、智能路径推荐和趣味挑战，让外语学习像呼吸一样自然。
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-6 pt-8"
          >
            <Link 
              to="/dashboard"
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] flex items-center gap-2"
            >
              开始你的旅程
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/courses"
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-lg transition-all backdrop-blur-md"
            >
              浏览课程
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-display">智能记忆追踪</h3>
            <p className="text-gray-400 leading-relaxed">
              基于艾宾浩斯遗忘曲线的动态算法，个性化定制复习计划，让每一个单词都深深印在脑海。
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mic className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-display">AI 口语对练</h3>
            <p className="text-gray-400 leading-relaxed">
              实时语音识别与发音打分，模拟真实对话场景，助你告别哑巴外语，自信开口表达。
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-display">游戏化成就</h3>
            <p className="text-gray-400 leading-relaxed">
              赚取积分、解锁独特徽章，在排行榜上与全球学习者一较高下，保持源源不断的学习动力。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
