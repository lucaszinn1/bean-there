import MobileHeader from "@/components/MobileHeader";
import MobileHero from "@/components/MobileHero";
import MobileCoffeeShopCard from "@/components/MobileCoffeeShopCard";
import MobileBottomNav from "@/components/MobileBottomNav";
import MapView from "@/components/MapView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Real NYC coffee shops data
const nearbyShops = [
  {
    name: "Blue Bottle Coffee",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop",
    rating: 4.8,
    address: "150 Greenwich St, NYC",
    wifiSpeed: "50 Mbps",
    noiseLevel: "Quiet" as const,
    powerOutlets: true,
    openUntil: "8 PM",
    distance: "0.2 mi",
    walkTime: "3 min",
    coordinates: [-74.0121, 40.7106] as [number, number]
  },
  {
    name: "Joe Coffee Company",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=200&fit=crop",
    rating: 4.6,
    address: "141 Waverly Pl, NYC",
    wifiSpeed: "45 Mbps",
    noiseLevel: "Moderate" as const,
    powerOutlets: true,
    openUntil: "9 PM",
    distance: "0.4 mi",
    walkTime: "6 min",
    coordinates: [-74.0021, 40.7325] as [number, number]
  },
  {
    name: "Stumptown Coffee",
    image: "https://images.unsplash.com/photo-1453614482241-598e5dc1d180?w=400&h=200&fit=crop",
    rating: 4.7,
    address: "30 W 8th St, NYC",
    wifiSpeed: "40 Mbps",
    noiseLevel: "Quiet" as const,
    powerOutlets: true,
    openUntil: "7 PM",
    distance: "0.5 mi",
    walkTime: "7 min",
    coordinates: [-73.9965, 40.7328] as [number, number]
  },
  {
    name: "Irving Farm Coffee",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=200&fit=crop",
    rating: 4.5,
    address: "71 Irving Pl, NYC",
    wifiSpeed: "35 Mbps",
    noiseLevel: "Moderate" as const,
    powerOutlets: true,
    openUntil: "8 PM",
    distance: "0.7 mi",
    walkTime: "10 min",
    coordinates: [-73.9870, 40.7368] as [number, number]
  },
  {
    name: "La Colombe Coffee",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop",
    rating: 4.4,
    address: "270 Lafayette St, NYC",
    wifiSpeed: "30 Mbps",
    noiseLevel: "Lively" as const,
    powerOutlets: false,
    openUntil: "9 PM",
    distance: "0.9 mi",
    walkTime: "12 min",
    coordinates: [-73.9925, 40.7256] as [number, number]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      <MobileHero />
      
      {/* Map View */}
      <section className="py-4">
        <MapView coffeeShops={nearbyShops} />
      </section>
      
      {/* Coffee Shops List */}
      <section className="px-4 py-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground">Nearby Coffee Shops</h3>
              <p className="text-sm text-muted-foreground">Perfect for working</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {nearbyShops.length} found
            </Badge>
          </div>
          
          <div className="space-y-4">
            {nearbyShops.map((shop, index) => (
              <MobileCoffeeShopCard key={index} {...shop} />
            ))}
          </div>
          
          <Button variant="outline" className="w-full">
            Load More Locations
          </Button>
        </div>
      </section>

      <MobileBottomNav />
    </div>
  );
};

export default Index;