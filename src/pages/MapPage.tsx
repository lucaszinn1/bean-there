import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import MobileBottomNav from '@/components/MobileBottomNav';
import LeafletMap from '@/components/LeafletMap';

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

const MapPage = () => {
  const navigate = useNavigate();

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
        <LeafletMap coffeeShops={coffeeShops} />
      </div>
      
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-[1000]">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default MapPage;