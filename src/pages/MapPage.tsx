import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import MobileBottomNav from '@/components/MobileBottomNav';

interface CoffeeShop {
  name: string;
  address: string;
  rating: number;
  wifiSpeed: string;
  noiseLevel: 'Quiet' | 'Moderate' | 'Lively';
  powerOutlets: boolean;
  coordinates: [number, number];
}

const coffeeShops: CoffeeShop[] = [
  {
    name: "The Daily Grind",
    address: "123 Main St",
    rating: 4.8,
    wifiSpeed: "Fast",
    noiseLevel: "Quiet",
    powerOutlets: true,
    coordinates: [-74.006, 40.7128]
  },
  {
    name: "Brew & Work",
    address: "456 Oak Ave",
    rating: 4.6,
    wifiSpeed: "Average",
    noiseLevel: "Moderate",
    powerOutlets: true,
    coordinates: [-74.010, 40.7158]
  },
  {
    name: "Central Perk",
    address: "789 Broadway",
    rating: 4.5,
    wifiSpeed: "Average",
    noiseLevel: "Lively",
    powerOutlets: false,
    coordinates: [-74.000, 40.7100]
  },
  {
    name: "Code & Coffee",
    address: "321 Tech Blvd",
    rating: 4.9,
    wifiSpeed: "Fast",
    noiseLevel: "Quiet",
    powerOutlets: true,
    coordinates: [-74.008, 40.7140]
  }
];

const MapPage = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenEntered, setTokenEntered] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128],
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each coffee shop
    coffeeShops.forEach((shop) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'coffee-marker';
      markerElement.style.cssText = `
        width: 40px;
        height: 40px;
        background: hsl(var(--primary));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        border: 3px solid white;
      `;
      
      markerElement.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/>
          <line x1="10" y1="1" x2="10" y2="4"/>
          <line x1="14" y1="1" x2="14" y2="4"/>
        </svg>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3 min-w-[200px]">
          <h3 class="font-semibold text-lg mb-2">${shop.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${shop.address}</p>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-yellow-500">★</span>
            <span class="text-sm">${shop.rating}</span>
          </div>
          <div class="space-y-1 text-sm">
            <div>Wi-Fi: ${shop.wifiSpeed}</div>
            <div>Noise: ${shop.noiseLevel}</div>
            <div>Power: ${shop.powerOutlets ? 'Available' : 'Limited'}</div>
          </div>
        </div>
      `);

      new mapboxgl.Marker(markerElement)
        .setLngLat(shop.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Fit map to show all markers
    if (coffeeShops.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      coffeeShops.forEach(shop => bounds.extend(shop.coordinates));
      map.current.fitBounds(bounds, { padding: 50 });
    }
  };

  useEffect(() => {
    if (tokenEntered && mapboxToken) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [tokenEntered, mapboxToken]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenEntered(true);
    }
  };

  if (!tokenEntered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-6 max-w-md w-full">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Map Setup Required</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              To display the coffee shop map, please enter your Mapbox public token. 
              You can get one from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
            </p>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter Mapbox public token (pk.xxx...)"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()} className="flex-1">
                  Load Map
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Nearby Coffee Shops</h1>
          <div className="w-9" />
        </div>
      </div>
      
      {/* Full Screen Map */}
      <div className="absolute inset-0 pt-16 pb-20">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
      
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default MapPage;