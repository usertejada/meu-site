import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface Team {
  name: string;
  score: number;
  logo?: string;
}

interface MatchCardProps {
  rodada?: number;
  date: string;
  time: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  status: 'agendado' | 'ao-vivo' | 'finalizado';
}

const statusConfig = {
  agendado: {
    label: 'AGENDADO',
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500'
  },
  'ao-vivo': {
    label: 'AO VIVO',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500'
  },
  finalizado: {
    label: 'FINALIZADO',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500'
  }
};

const MatchCard: React.FC<MatchCardProps> = ({
  rodada,
  date,
  time,
  homeTeam,
  awayTeam,
  venue,
  status
}) => {
  const statusStyle = statusConfig[status];

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 w-full border-l-4 ${statusStyle.borderColor}`}>
      {/* Rodada Badge (canto superior esquerdo) */}
      {rodada && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span className="text-sm font-semibold text-gray-600">
              {rodada}º Rodada
            </span>
          </div>
        </div>
      )}

      {/* Data e Hora */}
      <div className="flex gap-4 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>

      {/* Placar */}
      <div className="mb-6">
        {/* Time da Casa */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
              {homeTeam.logo ? (
                <img 
                  src={homeTeam.logo} 
                  alt={`Escudo ${homeTeam.name}`}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-gray-400 text-xs">⚽</span>
              )}
            </div>
            <span className="font-medium text-gray-800">{homeTeam.name}</span>
          </div>
          <span className="text-3xl font-bold text-gray-800">{homeTeam.score}</span>
        </div>

        {/* Time Visitante */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
              {awayTeam.logo ? (
                <img 
                  src={awayTeam.logo} 
                  alt={`Escudo ${awayTeam.name}`}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-gray-400 text-xs">⚽</span>
              )}
            </div>
            <span className="font-medium text-gray-800">{awayTeam.name}</span>
          </div>
          <span className="text-3xl font-bold text-gray-800">{awayTeam.score}</span>
        </div>
      </div>

      {/* Local e Status */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{venue}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusStyle.color}`}></div>
          <span className={`text-xs font-semibold ${statusStyle.textColor}`}>
            {statusStyle.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;