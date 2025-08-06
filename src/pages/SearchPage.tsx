import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Search as SearchIcon, SlidersHorizontal, MapPin, Clock, Star, Wifi, Zap, Volume2 } from "lucide-react";

const SearchPage = () => {
  const filters = [
    { name: "Open Now", active: true },
    { name: "WiFi 50+ Mbps", active: false },
    { name: "Quiet", active: false },
    { name: "Power Outlets", active: true },
    { name: "Parking", active: false },
  ];

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
                autoFocus
              />
            </div>
            <Button variant="outline" size="lg" className="h-12 px-4">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Active Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter, index) => (
              <Badge 
                key={index} 
                variant={filter.active ? "default" : "outline"}
                className="whitespace-nowrap"
              >
                {filter.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Popular Filters */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Popular Filters</h3>
          <div className="grid grid-cols-2 gap-3">
            {popularFilters.map((filter, index) => (
              <Card key={index} className="active:scale-95 transition-all duration-200">
                <CardContent className="p-4 flex items-center gap-3">
                  <filter.icon className={`w-5 h-5 ${filter.color}`} />
                  <span className="font-medium">{filter.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-secondary rounded-lg active:bg-muted transition-colors"
              >
                <SearchIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{search}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Areas */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore Areas</h3>
          <div className="space-y-3">
            {[
              { name: "Downtown", shops: 15, distance: "0.5 mi" },
              { name: "Arts District", shops: 8, distance: "1.2 mi" },
              { name: "University Area", shops: 12, distance: "2.1 mi" },
              { name: "Tech Quarter", shops: 6, distance: "1.8 mi" },
            ].map((area, index) => (
              <Card key={index} className="active:scale-95 transition-all duration-200">
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
      </div>

      <div className="h-20" />
      <MobileBottomNav />
    </div>
  );
};

export default SearchPage;