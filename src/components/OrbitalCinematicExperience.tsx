
import React, { useState, useEffect } from 'react';
import { OrbitalDeathItem } from './OrbitalDeathItem';
import { CentralCounter } from './CentralCounter';
import { NarrativeIntro } from './NarrativeIntro';
import { StarfieldBackground } from './StarfieldBackground';

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

export const OrbitalCinematicExperience: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'orbital'>('intro');
  const [globalTime, setGlobalTime] = useState(0);
  const [visibleItems, setVisibleItems] = useState(0);
  const [lastDeathTime, setLastDeathTime] = useState(0);
  const [triggerStarDisappearance, setTriggerStarDisappearance] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setGlobalTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (phase === 'intro') {
      const timer = setTimeout(() => {
        setPhase('orbital');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'orbital') {
      const timer = setInterval(() => {
        setVisibleItems(prev => {
          if (prev < deathData.length) {
            return prev + 1;
          }
          return prev;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [phase]);

  // Trigger star disappearance based on death rate
  useEffect(() => {
    const totalDeathsPerSecond = deathData.reduce((sum, data) => sum + data.deathsPerSecond, 0);
    const currentTotalDeaths = Math.floor(globalTime * totalDeathsPerSecond);
    
    if (currentTotalDeaths > lastDeathTime) {
      setTriggerStarDisappearance(prev => !prev);
      setLastDeathTime(currentTotalDeaths);
    }
  }, [globalTime, lastDeathTime]);

  const totalDeathsPerSecond = deathData.reduce((sum, data) => sum + data.deathsPerSecond, 0);

  const getOrbitRadius = (index: number) => {
    const baseRadius = 220;
    const radiusIncrement = 80;
    return baseRadius + (Math.floor(index / 4) * radiusIncrement);
  };

  const getAngle = (index: number) => {
    const itemsPerRing = 4;
    const ringIndex = Math.floor(index / itemsPerRing);
    const positionInRing = index % itemsPerRing;
    const angleStep = 360 / itemsPerRing;
    const ringOffset = ringIndex * 22.5;
    return (positionInRing * angleStep + ringOffset) % 360;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Starfield Background */}
      <StarfieldBackground onDeathTrigger={triggerStarDisappearance} />

      {/* Enhanced Cinematic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-98"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.06)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(239,68,68,0.06)_0%,transparent_50%)]"></div>
      </div>

      {/* Constellation Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-gray-800/20 rounded-full animate-spin"
            style={{
              left: '50%',
              top: '50%',
              width: `${440 + i * 160}px`,
              height: `${440 + i * 160}px`,
              transform: 'translate(-50%, -50%)',
              animationDuration: `${25 + i * 8}s`,
              animationDirection: 'reverse'
            }}
          />
        ))}
      </div>

      {/* Ambient Audio */}
      <audio autoPlay loop className="hidden">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBDuI1/LMeSUGJnTG8N+PQgkTXrPp7KhUFAlHnt/yv2AcBzmI2e2MeSYGJnnG7+SOMwoBLIDQ+ddnLgMQQP/8Bvv8NAPE3v37/OwBDe/9/fnz9AYRhV3l6mte8fTw5/PyDAYi7vE3YqG/s3E=" type="audio/wav" />
      </audio>

      {/* Main Content */}
      <div className="relative z-10 w-full h-screen">
        {phase === 'intro' && <NarrativeIntro />}
        
        {phase === 'orbital' && (
          <>
            {/* Central Counter */}
            <CentralCounter 
              totalDeathsPerSecond={totalDeathsPerSecond}
              globalTime={globalTime}
            />

            {/* Orbital Death Items */}
            {deathData.slice(0, visibleItems).map((data, index) => (
              <OrbitalDeathItem
                key={data.cause}
                cause={data.cause}
                dailyDeaths={data.dailyDeaths}
                icon={data.icon}
                color={data.color}
                description={data.description}
                deathsPerSecond={data.deathsPerSecond}
                globalTime={globalTime}
                orbitRadius={getOrbitRadius(index)}
                angle={getAngle(index)}
                animationDelay={index * 500}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
