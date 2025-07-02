import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameSelection = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'fortnite',
      name: 'FN',
      title: 'FORTNITE',
      image: '/EchoContent/Fortnite (1).png',
      category: 'FN'
    },
    {
      id: 'valorant',
      name: 'Valorant',
      title: 'VALORANT',
      image: '/EchoContent/Val.png',
      category: 'VALORANT'
    },
    {
      id: 'hwid',
      name: 'HWID Spoofer',
      title: 'HWID SPOOFER',
      image: '/EchoContent/Temp (1).png',
      category: 'SPOOFER'
    }
  ];

  const handleGameClick = (category: string) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-[#08C422]">Extensive</span>{' '}
            <span className="text-white">Game Selection</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="group cursor-pointer"
              onClick={() => handleGameClick(game.category)}
            >
              {/* Game Card with full image */}
              <div className="relative overflow-hidden rounded-xl h-80 mb-4 transition-transform duration-300 hover:scale-105">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                {/* Slash animation overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/35 to-transparent transform -rotate-12 translate-x-[-100%] group-hover:animate-[slash_1.5s_ease-in-out_infinite]"></div>
                </div>
              </div>
              
              {/* Label and Arrow underneath */}
              <div className="flex items-center justify-center gap-3">
                <span className="text-white text-lg font-medium">{game.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:translate-x-1">
                  <g fill="none">
                    <path fill="#08C422" d="M4 11.25a.75.75 0 0 0 0 1.5zm0 1.5h16v-1.5H4z" opacity="0.5"/>
                    <path stroke="#08C422" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14 6l6 6l-6 6"/>
                  </g>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSelection;
