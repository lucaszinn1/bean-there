import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Coffee } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
const MapView: React.FC<MapViewProps> = ({
  coffeeShops
}) => {
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
      // Default to NYC
      zoom: 13
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each coffee shop
    coffeeShops.forEach(shop => {
      // Create a custom marker element
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

      // Add coffee icon
      markerElement.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/>
          <line x1="10" y1="1" x2="10" y2="4"/>
          <line x1="14" y1="1" x2="14" y2="4"/>
        </svg>
      `;

      // Create popup content
      const popup = new mapboxgl.Popup({
        offset: 25
      }).setHTML(`
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

      // Add marker to map
      new mapboxgl.Marker(markerElement).setLngLat(shop.coordinates).setPopup(popup).addTo(map.current!);
    });

    // Fit map to show all markers
    if (coffeeShops.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      coffeeShops.forEach(shop => bounds.extend(shop.coordinates));
      map.current.fitBounds(bounds, {
        padding: 50
      });
    }
  };
  useEffect(() => {
    if (tokenEntered && mapboxToken) {
      initializeMap();
    }
    return () => {
      map.current?.remove();
    };
  }, [tokenEntered, mapboxToken, coffeeShops]);
  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenEntered(true);
    }
  };
  if (!tokenEntered) {
    return;
  }
  return <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>;
};
export default MapView;