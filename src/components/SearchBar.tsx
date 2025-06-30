import React, { useState } from 'react';
import { Search, MapPin, Loader2, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleLocationClick = () => {
    onLocationSearch();
  };

  return (
    <div className="card mb-8">
      <div className="flex items-center mb-6">
        <Sparkles className="w-6 h-6 text-blue-500 mr-3" />
        <h3 className="text-xl font-bold text-gray-800">Buscar Clima</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Digite o nome da cidade..."
            className="input pl-12"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || !city.trim()}
            className="btn flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Buscar
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleLocationClick}
            disabled={isLoading}
            className="btn flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Localização
          </button>
        </div>
      </form>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-gray-700 text-sm leading-relaxed">
          💡 <strong>Dica:</strong> Você pode buscar por cidade, estado ou país. 
          Exemplos: "São Paulo", "Rio de Janeiro, RJ", "Brasil", "New York", "London"
        </p>
      </div>
    </div>
  );
};

export default SearchBar; 