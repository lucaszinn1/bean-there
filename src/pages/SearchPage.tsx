import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileCoffeeShopCard from "@/components/MobileCoffeeShopCard";
import { Search as SearchIcon, SlidersHorizontal, MapPin, Clock, Star, Wifi, Zap, Volume2 } from "lucide-react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([
    { name: "Open Now", active: true },
    { name: "WiFi 50+ Mbps", active: false },
    { name: "Quiet", active: false },
    { name: "Power Outlets", active: true },
    { name: "Parking", active: false },
  ]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Sample coffee shop data for search results
  const allCoffeeShops = [
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
      tags: ["fast wifi", "quiet", "power outlets", "open now"]
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
      tags: ["power outlets", "open now", "moderate noise"]
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
      tags: ["quiet", "power outlets", "open now"]
    }
  ];

  const toggleFilter = (index: number) => {
    setActiveFilters(prev => 
      prev.map((filter, i) => 
        i === index ? { ...filter, active: !filter.active } : filter
      )
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simple search logic
    const filtered = allCoffeeShops.filter(shop => {
      const matchesQuery = query === "" || 
        shop.name.toLowerCase().includes(query.toLowerCase()) ||
        shop.address.toLowerCase().includes(query.toLowerCase()) ||
        shop.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      
      const matchesFilters = activeFilters.every(filter => {
        if (!filter.active) return true;
        
        switch (filter.name) {
          case "Open Now":
            return true; // Assume all are open for demo
          case "WiFi 50+ Mbps":
            return parseInt(shop.wifiSpeed) >= 50;
          case "Quiet":
            return shop.noiseLevel === "Quiet";
          case "Power Outlets":
            return shop.powerOutlets;
          case "Parking":
            return false; // None have parking for demo
          default:
            return true;
        }
      });
      
      return matchesQuery && matchesFilters;
    });
    
    setSearchResults(filtered);
    setIsSearching(false);
  };

  const handleRecentSearch = (search: string) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  const recentSearches = [
    "Coffee shops with outlets",
    "24/7 coffee near me", 
    "Quiet workspace downtown",
    "Dog-friendly cafes"
  ];

  const popularFilters = [
    { icon: Wifi, name: "Fast WiFi", color: "text-blue-600" },
    { icon: Volume2, name: "Quiet", color: "text-green-600" },
    { icon: Zap, name: "Power Outlets", color: "text-yellow-600" },
    { icon: Clock, name: "Open Late", color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-card shadow-mobile sticky top-0 z-50 border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search coffee shops, areas..."
                className="pl-10 h-12 rounded-xl bg-secondary border-0 text-base"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
            </div>
            <Button variant="outline" size="lg" className="h-12 px-4">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Active Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {activeFilters.map((filter, index) => (
              <Badge 
                key={index} 
                variant={filter.active ? "default" : "outline"}
                className="whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleFilter(index)}
              >
                {filter.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Results */}
        {searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Search Results {searchResults.length > 0 && `(${searchResults.length})`}
            </h3>
            {isSearching ? (
              <div className="text-center py-8 text-muted-foreground">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((shop, index) => (
                  <MobileCoffeeShopCard key={index} {...shop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No coffee shops found matching your criteria
              </div>
            )}
          </div>
        )}

        {/* Popular Filters */}
        {!searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Filters</h3>
            <div className="grid grid-cols-2 gap-3">
              {popularFilters.map((filter, index) => (
                <Card 
                  key={index} 
                  className="active:scale-95 transition-all duration-200 cursor-pointer"
                  onClick={() => handleSearch(filter.name.toLowerCase())}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <filter.icon className={`w-5 h-5 ${filter.color}`} />
                    <span className="font-medium">{filter.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-secondary rounded-lg active:bg-muted transition-colors cursor-pointer"
                  onClick={() => handleRecentSearch(search)}
                >
                  <SearchIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{search}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Areas */}
        {!searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore Areas</h3>
            <div className="space-y-3">
              {[
                { name: "Downtown", shops: 15, distance: "0.5 mi" },
                { name: "Arts District", shops: 8, distance: "1.2 mi" },
                { name: "University Area", shops: 12, distance: "2.1 mi" },
                { name: "Tech Quarter", shops: 6, distance: "1.8 mi" },
              ].map((area, index) => (
                <Card 
                  key={index} 
                  className="active:scale-95 transition-all duration-200 cursor-pointer"
                  onClick={() => handleSearch(area.name.toLowerCase())}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium">{area.name}</h4>
                        <p className="text-sm text-muted-foreground">{area.shops} coffee shops</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {area.distance}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-20" />
      <MobileBottomNav />
    </div>
  );
};

export default SearchPage;