
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { DeathCounter } from '../components/DeathCounter';
import { TimelineSlider } from '../components/TimelineSlider';
import { Footer } from '../components/Footer';
import { ParticleEffect } from '../components/ParticleEffect';

const deathData = [
  { 
    cause: "Cardiovascular diseases", 
    dailyDeaths: 49000, 
    icon: "💓", 
    color: "from-red-500 to-pink-600",
    particleColor: "#ef4444"
  },
  { 
    cause: "Cancer", 
    dailyDeaths: 27000, 
    icon: "🔬", 
    color: "from-purple-500 to-violet-600",
    particleColor: "#8b5cf6"
  },
  { 
    cause: "Hunger and malnutrition", 
    dailyDeaths: 20000, 
    icon: "🍽️", 
    color: "from-orange-500 to-yellow-600",
    particleColor: "#f97316"
  },
  { 
    cause: "Respiratory diseases", 
    dailyDeaths: 10000, 
    icon: "🫁", 
    color: "from-blue-500 to-cyan-600",
    particleColor: "#3b82f6"
  },
  { 
    cause: "Neonatal deaths", 
    dailyDeaths: 6500, 
    icon: "👶", 
    color: "from-pink-400 to-rose-500",
    particleColor: "#f472b6"
  },
  { 
    cause: "Accidents", 
    dailyDeaths: 5500, 
    icon: "⚠️", 
    color: "from-amber-500 to-orange-600",
    particleColor: "#f59e0b"
  },
  { 
    cause: "Infectious diseases", 
    dailyDeaths: 5000, 
    icon: "🦠", 
    color: "from-green-500 to-emerald-600",
    particleColor: "#10b981"
  },
  { 
    cause: "Tuberculosis", 
    dailyDeaths: 3500, 
    icon: "🩺", 
    color: "from-teal-500 to-cyan-600",
    particleColor: "#14b8a6"
  },
  { 
    cause: "Suicide", 
    dailyDeaths: 2000, 
    icon: "💔", 
    color: "from-gray-500 to-slate-600",
    particleColor: "#6b7280"
  },
  { 
    cause: "HIV/AIDS", 
    dailyDeaths: 2000, 
    icon: "🩸", 
    color: "from-red-600 to-crimson-700",
    particleColor: "#dc2626"
  },
  { 
    cause: "Malaria", 
    dailyDeaths: 1300, 
    icon: "🦟", 
    color: "from-lime-500 to-green-600",
    particleColor: "#65a30d"
  },
  { 
    cause: "Homicide", 
    dailyDeaths: 1000, 
    icon: "⚰️", 
    color: "from-zinc-600 to-gray-700",
    particleColor: "#52525b"
  },
  { 
    cause: "Maternal deaths", 
    dailyDeaths: 800, 
    icon: "🤱", 
    color: "from-rose-400 to-pink-500",
    particleColor: "#fb7185"
  },
  { 
    cause: "War and armed conflict", 
    dailyDeaths: 625, 
    icon: "⚔️", 
    color: "from-red-700 to-red-800",
    particleColor: "#b91c1c"
  },
  { 
    cause: "Civil unrest", 
    dailyDeaths: 125, 
    icon: "🔥", 
    color: "from-orange-600 to-red-600",
    particleColor: "#ea580c"
  },
  { 
    cause: "Terrorism", 
    dailyDeaths: 30, 
    icon: "💥", 
    color: "from-black to-gray-800",
    particleColor: "#1f2937"
  }
];

const Index = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => prev + speed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Particle Background */}
      <ParticleEffect />
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Daily Death Estimate
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A real-time visualization of global mortality statistics. Each second represents the fragility and scale of human life across our planet.
            </p>
            <div className="mt-6 text-cyan-400 text-lg">
              Time Elapsed: <span className="font-mono">{Math.floor(currentTime / 3600)}h {Math.floor((currentTime % 3600) / 60)}m {currentTime % 60}s</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mb-12">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25"
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Speed:</span>
              <select 
                value={speed} 
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={5}>5x</option>
                <option value={10}>10x</option>
              </select>
            </div>

            <button
              onClick={() => setCurrentTime(0)}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
            >
              🔄 Reset
            </button>
          </div>

          {/* Death Counters */}
          <div className="space-y-6">
            {deathData.map((data, index) => (
              <DeathCounter
                key={data.cause}
                cause={data.cause}
                dailyDeaths={data.dailyDeaths}
                icon={data.icon}
                color={data.color}
                particleColor={data.particleColor}
                currentTime={currentTime}
                index={index}
              />
            ))}
          </div>

          {/* Timeline Slider */}
          <TimelineSlider 
            currentTime={currentTime}
            onTimeChange={setCurrentTime}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
