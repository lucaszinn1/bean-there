import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import MobileBottomNav from '@/components/MobileBottomNav';

// Fix default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
    name: "Blue Bottle Coffee",
    address: "150 Greenwich St, NYC",
    rating: 4.8,
    wifiSpeed: "Fast",
    noiseLevel: "Quiet",
    powerOutlets: true,
    coordinates: [-74.0121, 40.7106]
  },
  {
    name: "Joe Coffee Company",
    address: "141 Waverly Pl, NYC",
    rating: 4.6,
    wifiSpeed: "Fast",
    noiseLevel: "Moderate",
    powerOutlets: true,
    coordinates: [-74.0021, 40.7325]
  },
  {
    name: "Stumptown Coffee",
    address: "30 W 8th St, NYC",
    rating: 4.7,
    wifiSpeed: "Fast",
    noiseLevel: "Quiet",
    powerOutlets: true,
    coordinates: [-73.9965, 40.7328]
  },
  {
    name: "Irving Farm Coffee",
    address: "71 Irving Pl, NYC",
    rating: 4.5,
    wifiSpeed: "Average",
    noiseLevel: "Moderate",
    powerOutlets: true,
    coordinates: [-73.9870, 40.7368]
  },
  {
    name: "La Colombe Coffee",
    address: "270 Lafayette St, NYC",
    rating: 4.4,
    wifiSpeed: "Average",
    noiseLevel: "Lively",
    powerOutlets: false,
    coordinates: [-73.9925, 40.7256]
  },
  {
    name: "Birch Coffee",
    address: "96 7th Ave, NYC",
    rating: 4.6,
    wifiSpeed: "Fast",
    noiseLevel: "Quiet",
    powerOutlets: true,
    coordinates: [-74.0021, 40.7423]
  },
  {
    name: "Gregorys Coffee",
    address: "200 Broadway, NYC",
    rating: 4.3,
    wifiSpeed: "Average",
    noiseLevel: "Moderate",
    powerOutlets: true,
    coordinates: [-74.0089, 40.7107]
  },
  {
    name: "Think Coffee",
    address: "248 Mercer St, NYC",
    rating: 4.5,
    wifiSpeed: "Fast",
    noiseLevel: "Moderate",
    powerOutlets: true,
    coordinates: [-73.9957, 40.7282]
  }
];

// Create custom coffee shop icon
const coffeeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#8B5CF6" stroke="white" stroke-width="3"/>
      <svg x="10" y="10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const MapPage = () => {
  const navigate = useNavigate();
  
  // Calculate center position from coffee shops
  const defaultCenter: [number, number] = coffeeShops.length > 0 
    ? [
        coffeeShops.reduce((sum, shop) => sum + shop.coordinates[1], 0) / coffeeShops.length,
        coffeeShops.reduce((sum, shop) => sum + shop.coordinates[0], 0) / coffeeShops.length
      ]
    : [40.7128, -74.006]; // Default to NYC

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-background/80 backdrop-blur-sm border-b">
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
        <MapContainer
          center={defaultCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {coffeeShops.map((shop, index) => (
            <Marker
              key={index}
              position={[shop.coordinates[1], shop.coordinates[0]]}
              icon={coffeeIcon}
            >
              <Popup>
                <div className="p-3 min-w-[200px]">
                  <h3 className="font-semibold text-lg mb-2">{shop.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{shop.address}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{shop.rating}</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>Wi-Fi: {shop.wifiSpeed}</div>
                    <div>Noise: {shop.noiseLevel}</div>
                    <div>Power: {shop.powerOutlets ? 'Available' : 'Limited'}</div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-[1000]">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default MapPage;