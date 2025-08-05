import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CoffeeShopCard from "./CoffeeShopCard";

// Mock data for featured coffee shops
const featuredShops = [
  {
    name: "The Grind Coffee",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
    rating: 4.8,
    address: "123 Main St, Downtown",
    wifiSpeed: "50 Mbps",
    noiseLevel: "Quiet" as const,
    powerOutlets: true,
    openUntil: "10 PM",
    distance: "0.3 mi"
  },
  {
    name: "Brew & Work",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    rating: 4.6,
    address: "456 Oak Ave, Midtown",
    wifiSpeed: "35 Mbps",
    noiseLevel: "Moderate" as const,
    powerOutlets: true,
    openUntil: "9 PM",
    distance: "0.7 mi"
  },
  {
    name: "Central Perk",
    image: "https://images.unsplash.com/photo-1453614482241-598e5dc1d180?w=400&h=300&fit=crop",
    rating: 4.5,
    address: "789 Broadway, Arts District",
    wifiSpeed: "40 Mbps",
    noiseLevel: "Lively" as const,
    powerOutlets: false,
    openUntil: "8 PM",
    distance: "1.2 mi"
  }
];

const FeaturedShops = () => {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Top Picks Near You
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Featured Coffee Shops
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked locations that consistently deliver excellent working conditions for remote professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredShops.map((shop, index) => (
            <CoffeeShopCard key={index} {...shop} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            Explore All Locations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedShops;