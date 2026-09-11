import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  BookOpen,
  FileText,
  User,
  Calendar,
  Clock,
  Sparkles,
  Download,
  Share2,
  Check
} from 'lucide-react';
import { SERMONS_DATA } from '../data/churchData';
import { Sermon } from '../types';
import { useChurch } from '../context/ChurchContext';

export const SermonPlayer: React.FC = () => {
  const { sermons, churchInfo } = useChurch();
  const [activeSermon, setActiveSermon] = useState<Sermon>(() => sermons[0] || {
    id: 'default',
    title: '作主门徒',
    series: '作主门徒系列',
    speaker: '李恩宏 主任牧师',
    date: '2026年9月',
    scripture: '马太福音 11:28-29',
    duration: '40 分钟',
    summary: '凡劳苦担重担的人可以到主这里来。',
    keyPoints: ['一、来到主前放下重担', '二、负主的轭学主样式', '三、灵魂得享真正安息'],
    audioSampleDurationSec: 2400
  });

  // Keep activeSermon in sync if sermons changes and activeSermon was deleted
  useEffect(() => {
    if (sermons.length > 0 && !sermons.find((s) => s.id === activeSermon.id)) {
      setActiveSermon(sermons[0]);
    }
  }, [sermons, activeSermon.id]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0); // in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Web Audio Context for generating a warm, peaceful sacred organ/piano hymn tone
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Start peaceful sacred chord progression
  const startSacredChords = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Stop previous
      stopSacredChords();

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Gentle C major chord notes: C3 (130.81), G3 (196.00), E4 (329.63), B4 (493.88)
      const frequencies = [130.81, 196.00, 261.63, 329.63];

      frequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine'; // Soft, warm, organ-like sine wave
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscillatorRefs.current.push(osc);
      });
    } catch (e) {
      console.warn('Audio synthesis not available or blocked by browser', e);
    }
  };

  const stopSacredChords = () => {
    oscillatorRefs.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    oscillatorRefs.current = [];
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopSacredChords();
      setIsPlaying(false);
    } else {
      startSacredChords();
      setIsPlaying(true);
    }
  };

  // Timer effect when playing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= activeSermon.audioSampleDurationSec) {
            stopSacredChords();
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, activeSermon]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopSacredChords();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume * 0.15,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setPlaybackTime(newTime);
  };

  const handleSelectSermon = (sermon: Sermon) => {
    if (activeSermon.id !== sermon.id) {
      stopSacredChords();
      setIsPlaying(false);
      setPlaybackTime(0);
      setActiveSermon(sermon);
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(
      `推荐主日讲道【${activeSermon.title}】\n讲员：${activeSermon.speaker} | 经文：${activeSermon.scripture}\n来自：${churchInfo.name}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="sermons" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel uppercase tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Sermon Archives & Media
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-sc font-bold text-white">
              主日讲道精选影音
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              按着正意分解真理的道，滋养灵魂，装备门徒，在每日生活与职场中活出属神生命。
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-xs text-stone-400">已收录讲道集：</span>
            <span className="px-2.5 py-1 bg-stone-800 text-amber-300 font-mono text-xs rounded-md">
              4 篇精选
            </span>
          </div>
        </div>

        {/* Main Sermon Feature & Player Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Active Sermon Card & Audio Controller (Left / 7 cols) */}
          <div className="lg:col-span-7 bg-stone-850 border border-stone-700/70 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Top info tags */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-medium">
                  {activeSermon.series}
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  {activeSermon.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-serif-sc font-bold text-white tracking-wide mb-3 leading-snug">
                {activeSermon.title}
              </h3>

              {/* Speaker and Scripture Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-300 mb-6">
                <span className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1 rounded-lg">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  {activeSermon.speaker}
                </span>
                <span className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1 rounded-lg">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  {activeSermon.scripture}
                </span>
                <span className="flex items-center gap-1.5 text-stone-400">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  总时长 {activeSermon.duration}
                </span>
              </div>

              {/* Summary quote */}
              <p className="text-stone-300 text-sm leading-relaxed mb-6 font-serif-sc italic bg-stone-900/50 p-4 rounded-xl border border-stone-800">
                “{activeSermon.summary}”
              </p>
            </div>

            {/* Audio Player Controls */}
            <div className="bg-stone-950/80 rounded-2xl p-5 border border-stone-800 mt-4">
              {/* Waveform visualizer simulation / status */}
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-mono">
                <span className="text-amber-300 font-medium">
                  {isPlaying ? '正在在线试听（圣乐背景音已启动）' : '点击播放收听讲道录音'}
                </span>
                <span>
                  {formatTime(playbackTime)} / {formatTime(activeSermon.audioSampleDurationSec)}
                </span>
              </div>

              {/* Progress Scrubber */}
              <div className="relative mb-4">
                <input
                  type="range"
                  min={0}
                  max={activeSermon.audioSampleDurationSec}
                  value={playbackTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Control Buttons row */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPlaybackTime((prev) => Math.max(0, prev - 15))}
                    className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                    title="后退15秒"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Big Play/Pause Button */}
                  <button
                    onClick={handlePlayToggle}
                    id="btn-sermon-play"
                    className="w-12 h-12 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-900/40 transition-all hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      setPlaybackTime((prev) =>
                        Math.min(activeSermon.audioSampleDurationSec, prev + 15)
                      )
                    }
                    className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                    title="前进15秒"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>

                  {/* Playback speed selector */}
                  <button
                    onClick={() => {
                      const speeds = [1, 1.25, 1.5];
                      const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                      setPlaybackSpeed(speeds[nextIndex]);
                    }}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-stone-800 text-stone-300 hover:bg-stone-700"
                  >
                    {playbackSpeed}x
                  </button>
                </div>

                {/* Right controls: volume & notes */}
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-stone-400 hover:text-white"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        if (isMuted) setIsMuted(false);
                      }}
                      className="w-16 h-1.5 bg-stone-800 rounded appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  <button
                    onClick={() => setShowNotesDrawer(!showNotesDrawer)}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-amber-300 font-medium flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{showNotesDrawer ? '收起大纲' : '查看大纲'}</span>
                  </button>

                  <button
                    onClick={handleCopyShare}
                    className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg"
                    title="分享本篇讲道"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Sermon Outline Drawer */}
            {showNotesDrawer && (
              <div className="mt-6 p-5 bg-stone-900 rounded-2xl border border-stone-800 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-3 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    讲道四大要点提纲
                  </span>
                  <button
                    onClick={() => alert(`已生成【${activeSermon.title}】灵修与研经提纲 PDF 下载链接！`)}
                    className="text-stone-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    <Download className="w-3 h-3" />
                    下载讲道简报
                  </button>
                </div>
                <div className="space-y-2">
                  {activeSermon.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="text-xs sm:text-sm text-stone-200 bg-stone-850 p-2.5 rounded-lg border border-stone-800/80 font-sans"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sermon Playlist Archive (Right / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-bold text-stone-200 mb-4 flex items-center gap-2">
                <span>近期主日讲道列表</span>
                <span className="text-xs font-normal text-stone-400">（点击切换聆听）</span>
              </h4>

              <div className="space-y-3">
                {sermons.map((sermon) => {
                  const isCurrent = activeSermon.id === sermon.id;
                  return (
                    <div
                      key={sermon.id}
                      onClick={() => handleSelectSermon(sermon)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                        isCurrent
                          ? 'bg-amber-950/40 border-amber-500/50 shadow-md'
                          : 'bg-stone-850/70 border-stone-800 hover:bg-stone-800/80 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[11px] text-amber-400 font-medium">
                          {sermon.series}
                        </span>
                        <span className="text-[11px] text-stone-400">{sermon.date}</span>
                      </div>

                      <h5
                        className={`text-sm sm:text-base font-serif-sc font-semibold leading-snug mb-2 ${
                          isCurrent ? 'text-amber-200' : 'text-stone-100'
                        }`}
                      >
                        {sermon.title}
                      </h5>

                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-stone-500" />
                          {sermon.speaker}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <BookOpen className="w-3 h-3 text-stone-500" />
                          {sermon.scripture}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-6 p-4 rounded-xl bg-stone-800/40 border border-stone-800 text-xs text-stone-400 text-center">
              所有讲道录音与敬拜诗歌版权归属{churchInfo.name}，供个人灵修及福音传递使用。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
