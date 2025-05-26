import React, { useState, useEffect } from 'react';
import { CinematicDeathCounter } from './CinematicDeathCounter';
import { NarrativeIntro } from './NarrativeIntro';
import { CumulativeCounter } from './CumulativeCounter';

const deathData = [
  { 
    cause: "Cardiovascular diseases", 
    dailyDeaths: 49000, 
    icon: "💓", 
    color: "from-red-500 to-pink-600",
    description: "Hearts that will beat no more",
    deathsPerSecond: 0.57
  },
  { 
    cause: "Cancer", 
    dailyDeaths: 27000, 
    icon: "🔬", 
    color: "from-purple-500 to-violet-600",
    description: "Battles lost to the invisible enemy",
    deathsPerSecond: 0.31
  },
  { 
    cause: "Hunger and malnutrition", 
    dailyDeaths: 20000, 
    icon: "🍽️", 
    color: "from-orange-500 to-yellow-600",
    description: "Empty plates, empty futures",
    deathsPerSecond: 0.23
  },
  { 
    cause: "Respiratory diseases", 
    dailyDeaths: 10000, 
    icon: "🫁", 
    color: "from-blue-500 to-cyan-600",
    description: "Final breaths drawn too soon",
    deathsPerSecond: 0.12
  },
  { 
    cause: "Neonatal deaths", 
    dailyDeaths: 6500, 
    icon: "👶", 
    color: "from-pink-400 to-rose-500",
    description: "Lives that barely began",
    deathsPerSecond: 0.075
  },
  { 
    cause: "Accidents", 
    dailyDeaths: 5500, 
    icon: "⚠️", 
    color: "from-amber-500 to-orange-600",
    description: "Moments that changed everything",
    deathsPerSecond: 0.064
  },
  { 
    cause: "Infectious diseases", 
    dailyDeaths: 5000, 
    icon: "🦠", 
    color: "from-green-500 to-emerald-600",
    description: "Microscopic predators",
    deathsPerSecond: 0.058
  },
  { 
    cause: "Tuberculosis", 
    dailyDeaths: 3500, 
    icon: "🩺", 
    color: "from-teal-500 to-cyan-600",
    description: "Ancient disease, modern tragedy",
    deathsPerSecond: 0.041
  },
  { 
    cause: "Suicide", 
    dailyDeaths: 2000, 
    icon: "💔", 
    color: "from-gray-500 to-slate-600",
    description: "Pain too great to bear",
    deathsPerSecond: 0.023
  },
  { 
    cause: "HIV/AIDS", 
    dailyDeaths: 2000, 
    icon: "🩸", 
    color: "from-red-600 to-crimson-700",
    description: "A pandemic that continues",
    deathsPerSecond: 0.023
  },
  { 
    cause: "Malaria", 
    dailyDeaths: 1300, 
    icon: "🦟", 
    color: "from-lime-500 to-green-600",
    description: "Tiny wings, deadly bite",
    deathsPerSecond: 0.015
  },
  { 
    cause: "Homicide", 
    dailyDeaths: 1000, 
    icon: "⚰️", 
    color: "from-zinc-600 to-gray-700",
    description: "Violence begets violence",
    deathsPerSecond: 0.012
  },
  { 
    cause: "Maternal deaths", 
    dailyDeaths: 800, 
    icon: "🤱", 
    color: "from-rose-400 to-pink-500",
    description: "Giving life, losing life",
    deathsPerSecond: 0.009
  },
  { 
    cause: "War and armed conflict", 
    dailyDeaths: 625, 
    icon: "⚔️", 
    color: "from-red-700 to-red-800",
    description: "The cost of human conflict",
    deathsPerSecond: 0.007
  },
  { 
    cause: "Civil unrest", 
    dailyDeaths: 125, 
    icon: "🔥", 
    color: "from-orange-600 to-red-600",
    description: "When societies fracture",
    deathsPerSecond: 0.001
  },
  { 
    cause: "Terrorism", 
    dailyDeaths: 30, 
    icon: "💥", 
    color: "from-black to-gray-800",
    description: "Fear as a weapon",
    deathsPerSecond: 0.0003
  }
];

export const CinematicController: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'sequence' | 'finale' | 'restart'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [globalTime, setGlobalTime] = useState(0);
  const [showCumulative, setShowCumulative] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setGlobalTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const phaseTimer = setTimeout(() => {
      switch (phase) {
        case 'intro':
          setPhase('sequence');
          setShowCumulative(true);
          break;
        case 'sequence':
          if (currentIndex < deathData.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            setPhase('finale');
          }
          break;
        case 'finale':
          setTimeout(() => {
            setPhase('restart');
          }, 8000);
          break;
        case 'restart':
          setCurrentIndex(0);
          setGlobalTime(0);
          setShowCumulative(false);
          setPhase('intro');
          break;
      }
    }, phase === 'intro' ? 6000 : phase === 'sequence' ? 8000 : 10000);

    return () => clearTimeout(phaseTimer);
  }, [phase, currentIndex]);

  const totalDeathsPerSecond = deathData.reduce((sum, data) => sum + data.deathsPerSecond, 0);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse"></div>
      </div>

      {/* Cumulative Counter */}
      {showCumulative && (
        <CumulativeCounter 
          totalDeathsPerSecond={totalDeathsPerSecond}
          globalTime={globalTime}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {phase === 'intro' && <NarrativeIntro />}
        
        {phase === 'sequence' && (
          <div className="w-full max-w-6xl mx-auto px-8">
            {deathData.slice(0, currentIndex + 1).map((data, index) => (
              <CinematicDeathCounter
                key={data.cause}
                cause={data.cause}
                dailyDeaths={data.dailyDeaths}
                icon={data.icon}
                color={data.color}
                description={data.description}
                deathsPerSecond={data.deathsPerSecond}
                globalTime={globalTime}
                index={index}
                isActive={index === currentIndex}
                delay={index * 1000}
              />
            ))}
          </div>
        )}

        {phase === 'finale' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              {Math.floor(globalTime * totalDeathsPerSecond).toLocaleString()}
            </div>
            <div className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Lives lost since you began watching
            </div>
            <div className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed italic">
              "The death of one man is a tragedy. The death of millions is a statistic." - Joseph Stalin
            </div>
            <div className="text-sm text-gray-500 mt-8">
              But every number represents a human story, a family, a future unlived.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
