import MobileHeader from "@/components/MobileHeader";
import MobileHero from "@/components/MobileHero";
import MobileCoffeeShopCard from "@/components/MobileCoffeeShopCard";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data for nearby coffee shops
const nearbyShops = [
  {
    name: "The Daily Grind",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop",
    rating: 4.8,
    address: "123 Main St",
    wifiSpeed: "50 Mbps",
    noiseLevel: "Quiet" as const,
    powerOutlets: true,
    openUntil: "10 PM",
    distance: "0.3 mi",
    walkTime: "4 min"
  },
  {
    name: "Brew & Work",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=200&fit=crop",
    rating: 4.6,
    address: "456 Oak Ave",
    wifiSpeed: "35 Mbps",
    noiseLevel: "Moderate" as const,
    powerOutlets: true,
    openUntil: "9 PM",
    distance: "0.7 mi",
    walkTime: "8 min"
  },
  {
    name: "Central Perk",
    image: "https://images.unsplash.com/photo-1453614482241-598e5dc1d180?w=400&h=200&fit=crop",
    rating: 4.5,
    address: "789 Broadway",
    wifiSpeed: "40 Mbps",
    noiseLevel: "Lively" as const,
    powerOutlets: false,
    openUntil: "8 PM",
    distance: "1.2 mi",
    walkTime: "12 min"
  },
  {
    name: "Code & Coffee",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=200&fit=crop",
    rating: 4.9,
    address: "321 Tech Blvd",
    wifiSpeed: "75 Mbps",
    noiseLevel: "Quiet" as const,
    powerOutlets: true,
    openUntil: "11 PM",
    distance: "0.5 mi",
    walkTime: "6 min"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      <MobileHero />
      
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