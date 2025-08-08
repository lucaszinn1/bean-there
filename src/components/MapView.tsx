import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Coffee } from 'lucide-react';
interface CoffeeShop {
  name: string;
  address: string;
  rating: number;
  wifiSpeed: string;
  noiseLevel: 'Quiet' | 'Moderate' | 'Lively';
  powerOutlets: boolean;
  coordinates: [number, number]; // [lng, lat]
}
interface MapViewProps {
  coffeeShops: CoffeeShop[];
}
// Create custom coffee shop icon
const coffeeIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="hsl(var(--primary))" stroke="white" stroke-width="3"/>
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

const MapView: React.FC<MapViewProps> = ({ coffeeShops }) => {
  // Calculate center position from coffee shops
  const defaultCenter: [number, number] = coffeeShops.length > 0 
    ? [
        coffeeShops.reduce((sum, shop) => sum + shop.coordinates[1], 0) / coffeeShops.length,
        coffeeShops.reduce((sum, shop) => sum + shop.coordinates[0], 0) / coffeeShops.length
      ]
    : [40.7128, -74.006]; // Default to NYC

  return (
    <div className="relative w-full h-[400px] mx-4 rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
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
  );
};
export default MapView;