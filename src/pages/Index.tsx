import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import MobileHero from "@/components/MobileHero";
import MobileCoffeeShopCard from "@/components/MobileCoffeeShopCard";
import MobileBottomNav from "@/components/MobileBottomNav";
import MapView from "@/components/MapView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Real NYC coffee shops data with unique IDs
const nearbyShops = [{
  id: "blue-bottle-coffee",
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
}, {
  id: "joe-coffee-company",
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
}, {
  id: "stumptown-coffee",
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
}, {
  id: "irving-farm-coffee",
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
}, {
  id: "la-colombe-coffee",
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
}];

// Coffee shop templates for generating unlimited content
const coffeeShopTemplates = [
  {
    names: ["Third Rail Coffee", "Bluestone Lane", "Toby's Estate Coffee", "Ninth Street Espresso", "Birch Coffee", "Gregory's Coffee", "Think Coffee", "Oslo Coffee Roasters", "City of Saints Coffee Roasters", "Everyman Espresso", "Gasoline Alley Coffee", "Mud Coffee", "Abraço", "Happy Bones", "Box Kite Coffee", "Café Grumpy", "Culture Espresso", "Devoción", "Ground Central Coffee", "Hi-Collar"],
    addresses: ["Sullivan St", "W 3rd St", "N 6th St", "E 9th St", "E 27th St", "Broadway", "Mercer St", "E 4th St", "Lafayette St", "E 13th St", "Franklin St", "E 9th St", "E 7th St", "Crosby St", "W 4th St", "Chelsea Market", "W 38th St", "Grand St", "E 14th St", "E 10th St"],
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1453614482241-598e5dc1d180?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=200&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop"
    ]
  }
];

// Function to generate new coffee shops
const generateCoffeeShops = (startIndex: number, count: number = 3) => {
  const shops = [];
  const template = coffeeShopTemplates[0];
  
  for (let i = 0; i < count; i++) {
    const index = (startIndex + i) % template.names.length;
    const nameIndex = index % template.names.length;
    const addressIndex = index % template.addresses.length;
    const imageIndex = index % template.images.length;
    
    const baseDistance = 1.5 + (startIndex + i) * 0.3;
    const baseWalkTime = Math.round(baseDistance * 13);
    
    // Generate coordinates in NYC area
    const baseLat = 40.7128;
    const baseLng = -74.0060;
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.08;
    
    shops.push({
      id: `${template.names[nameIndex].toLowerCase().replace(/[^a-z0-9]/g, '-')}-${startIndex + i}`,
      name: template.names[nameIndex],
      image: template.images[imageIndex],
      rating: Math.round((3.8 + Math.random() * 1.2) * 10) / 10,
      address: `${50 + (index * 17) % 200} ${template.addresses[addressIndex]}, NYC`,
      wifiSpeed: `${25 + Math.floor(Math.random() * 40)} Mbps`,
      noiseLevel: ["Quiet", "Moderate", "Lively"][index % 3] as "Quiet" | "Moderate" | "Lively",
      powerOutlets: Math.random() > 0.2,
      openUntil: ["7 PM", "8 PM", "9 PM", "10 PM"][index % 4],
      distance: `${baseDistance.toFixed(1)} mi`,
      walkTime: `${baseWalkTime} min`,
      coordinates: [baseLng + lngOffset, baseLat + latOffset] as [number, number]
    });
  }
  
  return shops;
};

const Index = () => {
  const [visibleShops, setVisibleShops] = useState(nearbyShops);
  const [loadMoreCount, setLoadMoreCount] = useState(0);
  
  const handleLoadMore = () => {
    const newShops = generateCoffeeShops(visibleShops.length, 3);
    setVisibleShops([...visibleShops, ...newShops]);
    setLoadMoreCount(prev => prev + 1);
  };
  return <div className="min-h-screen bg-background">
      <MobileHeader />
      <MobileHero />
      
      {/* Map View */}
      <section className="px-[16px] py-0">
        <MapView coffeeShops={visibleShops} />
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
              {visibleShops.length} found
            </Badge>
          </div>
          
          <div className="space-y-4">
            {visibleShops.map((shop, index) => (
              <MobileCoffeeShopCard key={shop.id || index} id={shop.id} {...shop} />
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full h-12 text-base font-medium bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 mb-4" 
            onClick={handleLoadMore}
          >
            Load More Locations
          </Button>
        </div>
      </section>

      {/* Bottom spacing to prevent navigation overlap */}
      <div className="pb-24" />
      <MobileBottomNav />
    </div>;
};
export default Index;