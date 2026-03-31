import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Mic, CheckCircle2, XCircle, ArrowRight, Brain } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const Learn: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'vocab' | 'listening' | 'speaking'>('vocab');
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/courses')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← 返回课程
          </button>
          <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {[
              { id: 'vocab', label: '单词记忆' },
              { id: 'listening', label: '听力训练' },
              { id: 'speaking', label: '口语跟读' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsFlipped(false);
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          
          <AnimatePresence mode="wait">
            {activeTab === 'vocab' && (
              <motion.div
                key="vocab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-lg"
              >
                <div 
                  className="relative h-[400px] w-full perspective-1000 cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center backdrop-blur-xl shadow-2xl">
                      <div className="text-gray-400 mb-8 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        <span>点击翻转卡片</span>
                      </div>
                      <h2 className="text-6xl font-bold text-white mb-6 font-display tracking-wider">Serendipity</h2>
                      <button className="p-4 rounded-full bg-white/5 hover:bg-pink-500/20 hover:text-pink-400 transition-colors text-gray-300">
                        <Volume2 className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/30 rounded-3xl p-12 flex flex-col items-center justify-center backdrop-blur-xl shadow-[0_0_50px_rgba(236,72,153,0.15)]">
                      <div className="text-2xl text-pink-400 mb-4 font-mono">/ˌserənˈdɪpəti/</div>
                      <p className="text-3xl font-bold text-white mb-6">机缘巧合；意外发现的珍宝</p>
                      <p className="text-gray-400 text-center text-lg leading-relaxed">
                        They found each other by pure serendipity.
                        <br />
                        他们纯粹是机缘巧合才相遇的。
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex justify-center gap-6 mt-12">
                  <button className="flex-1 py-4 bg-red-500/10 text-red-400 border border-red-500/30 rounded-2xl font-bold text-lg hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                    <XCircle className="w-6 h-6" />
                    不认识
                  </button>
                  <button className="flex-1 py-4 bg-green-500/10 text-green-400 border border-green-500/30 rounded-2xl font-bold text-lg hover:bg-green-500 hover:text-white transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-6 h-6" />
                    认识
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'listening' && (
              <motion.div
                key="listening"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-2xl"
              >
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                  <div className="flex items-center justify-center mb-12 relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
                    <button className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 transition-transform z-10 relative group">
                      <Volume2 className="w-10 h-10 text-white ml-2" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4">听录音并选择正确答案：</h3>
                    {[
                      'A. 预约在下周一下午三点',
                      'B. 预约在下周二上午十点',
                      'C. 预约已取消',
                    ].map((option, i) => (
                      <button key={i} className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-left text-gray-300 hover:bg-white/10 hover:border-blue-500/50 transition-all">
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'speaking' && (
              <motion.div
                key="speaking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-2xl text-center"
              >
                <div className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
                  <p className="text-gray-400 mb-4 text-lg">请跟读以下句子</p>
                  <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                    Could you tell me the way to the station?
                  </h2>
                  <p className="text-pink-400 mb-12 text-lg">你能告诉我怎么去车站吗？</p>

                  <div className="relative flex justify-center mb-8">
                    <button className="w-24 h-24 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-105 transition-transform z-10 group">
                      <Mic className="w-10 h-10 text-white" />
                    </button>
                  </div>
                  <p className="text-gray-500">点击麦克风开始录音</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default Learn;
