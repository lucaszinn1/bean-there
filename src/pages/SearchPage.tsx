import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileCoffeeShopCard from "@/components/MobileCoffeeShopCard";
import { Search as SearchIcon, SlidersHorizontal, MapPin, Clock, Star, Wifi, Zap, Volume2, Quote, Building2 } from "lucide-react";

// Enhanced coffee shop data with detailed reviews and attributes
const allCoffeeShops = [{
    id: "blue-bottle-coffee",
    name: "Blue Bottle Coffee",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop",
    rating: 4.8,
    address: "150 Greenwich St, NYC",
    location: "downtown",
    neighborhood: "Financial District",
    wifiSpeed: "50 Mbps",
    noiseLevel: "Quiet" as const,
    powerOutlets: true,
    openUntil: "8 PM",
    distance: "0.2 mi",
    walkTime: "3 min",
    coordinates: [-74.0121, 40.7106] as [number, number],
    amenities: ["Free WiFi", "Power Outlets", "Quiet Environment", "Specialty Coffee", "Pastries", "Work-Friendly"],
    tags: ["quiet", "work-friendly", "downtown", "specialty coffee", "outlets", "fast wifi", "financial district"],
    reviews: [
      {
        username: "Sarah M.",
        rating: 5,
        text: "Perfect spot for remote work! WiFi is super fast and the atmosphere is so peaceful. Coffee quality is outstanding. Great quiet workspace for focused sessions.",
        keywords: ["remote work", "fast wifi", "peaceful", "quiet workspace", "focused"]
      },
      {
        username: "Mike C.",
        rating: 5,
        text: "Love the outlet availability here. Never had trouble finding a spot to plug in my laptop. Staff is very friendly and it's perfect for studying.",
        keywords: ["outlet availability", "laptop", "studying", "charging ports"]
      },
      {
        username: "Jennifer L.",
        rating: 4,
        text: "Great coffee and quiet environment. Sometimes gets busy during lunch hours but overall excellent for studying and work.",
        keywords: ["quiet environment", "studying", "work", "low noise"]
      }
    ]
  },
  {
    id: "joe-coffee-company",
    name: "Joe Coffee Company",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=200&fit=crop",
    rating: 4.6,
    address: "141 Waverly Pl, NYC",
    location: "west village",
    neighborhood: "West Village",
    wifiSpeed: "45 Mbps",
    noiseLevel: "Moderate" as const,
    powerOutlets: true,
    openUntil: "9 PM",
    distance: "0.4 mi",
    walkTime: "6 min",
    coordinates: [-74.0021, 40.7325] as [number, number],
    amenities: ["Free WiFi", "Power Outlets", "Community Atmosphere", "Craft Coffee", "Light Meals", "Meeting Space"],
    tags: ["community", "meetings", "craft coffee", "outlets", "west village", "moderate noise"],
    reviews: [
      {
        username: "David K.",
        rating: 5,
        text: "Great community vibe! Perfect for meetings or just working solo. WiFi speed is solid and plenty of seating options. Good for collaborative work.",
        keywords: ["community vibe", "meetings", "working solo", "solid wifi", "collaborative work", "seating"]
      },
      {
        username: "Lisa R.",
        rating: 4,
        text: "Coffee is excellent and staff is always helpful. Gets a bit noisy during peak hours but manageable for most work.",
        keywords: ["excellent coffee", "helpful staff", "manageable noise", "work"]
      },
      {
        username: "Tom H.",
        rating: 5,
        text: "Love the light meal options here. Great spot to spend a whole afternoon working. Outlets everywhere and good for students!",
        keywords: ["light meals", "afternoon working", "outlets everywhere", "students", "study spot"]
      }
    ]
  },
  {
    id: "stumptown-coffee",
    name: "Stumptown Coffee",
    image: "https://images.unsplash.com/photo-1453614482241-598e5dc1d180?w=400&h=200&fit=crop",
    rating: 4.7,
    address: "30 W 8th St, NYC",
    location: "west village",
    neighborhood: "West Village",
    wifiSpeed: "40 Mbps",
    noiseLevel: "Quiet" as const,
    powerOutlets: true,
    openUntil: "7 PM",
    distance: "0.5 mi",
    walkTime: "7 min",
    coordinates: [-73.9965, 40.7328] as [number, number],
    amenities: ["Free WiFi", "Power Outlets", "Quiet Space", "Premium Coffee", "Artisan Pastries", "Study Friendly"],
    tags: ["quiet", "premium coffee", "study friendly", "artisan", "west village", "peaceful"],
    reviews: [
      {
        username: "Amanda P.",
        rating: 5,
        text: "Absolutely love the quiet atmosphere here! Perfect for deep focus work. The artisan pastries are amazing too. Very peaceful environment.",
        keywords: ["quiet atmosphere", "deep focus work", "artisan pastries", "peaceful environment"]
      },
      {
        username: "Carlos M.",
        rating: 5,
        text: "Premium coffee quality as expected from Stumptown. Great power outlet availability and comfortable seating for long study sessions.",
        keywords: ["premium coffee", "power outlet availability", "comfortable seating", "study sessions"]
      },
      {
        username: "Rachel W.",
        rating: 4,
        text: "Excellent study spot. WiFi is reliable and the environment really helps with productivity. Perfect for students and remote workers.",
        keywords: ["study spot", "reliable wifi", "productivity", "students", "remote workers"]
      }
    ]
  },
  {
    id: "irving-farm-coffee",
    name: "Irving Farm Coffee",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=200&fit=crop",
    rating: 4.5,
    address: "71 Irving Pl, NYC",
    location: "flatiron",
    neighborhood: "Flatiron District",
    wifiSpeed: "35 Mbps",
    noiseLevel: "Moderate" as const,
    powerOutlets: true,
    openUntil: "8 PM",
    distance: "0.7 mi",
    walkTime: "10 min",
    coordinates: [-73.9870, 40.7368] as [number, number],
    amenities: ["Free WiFi", "Power Outlets", "Cozy Atmosphere", "Farm-to-Cup Coffee", "Fresh Bakes", "Laptop Friendly"],
    tags: ["cozy", "farm-to-cup", "laptop friendly", "flatiron", "fresh bakes", "comfortable"],
    reviews: [
      {
        username: "Emily J.",
        rating: 5,
        text: "Such a cozy atmosphere! The farm-to-cup coffee is exceptional and the fresh bakes are perfect for a long work session. Very comfortable for laptops.",
        keywords: ["cozy atmosphere", "farm-to-cup coffee", "fresh bakes", "long work session", "comfortable", "laptops"]
      },
      {
        username: "Alex B.",
        rating: 4,
        text: "Really laptop-friendly environment. Good WiFi and plenty of outlets. The moderate noise level is just right for focus work.",
        keywords: ["laptop-friendly", "good wifi", "plenty of outlets", "moderate noise", "focus work"]
      },
      {
        username: "Maria S.",
        rating: 4,
        text: "Been coming here since college! Staff remembers regulars and the atmosphere is always welcoming. Great for studying and casual work.",
        keywords: ["college", "welcoming atmosphere", "studying", "casual work", "regulars"]
      }
    ]
  },
  {
    id: "la-colombe-coffee",
    name: "La Colombe Coffee",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop",
    rating: 4.4,
    address: "270 Lafayette St, NYC",
    location: "soho",
    neighborhood: "SoHo",
    wifiSpeed: "30 Mbps",
    noiseLevel: "Lively" as const,
    powerOutlets: false,
    openUntil: "9 PM",
    distance: "0.9 mi",
    walkTime: "12 min",
    coordinates: [-73.9925, 40.7256] as [number, number],
    amenities: ["Free WiFi", "Lively Atmosphere", "Innovative Coffee", "Fresh Pastries", "Social Space", "Trendy Vibe"],
    tags: ["lively", "innovative", "social", "trendy", "soho", "energetic"],
    reviews: [
      {
        username: "Jake T.",
        rating: 4,
        text: "Love the trendy vibe and innovative coffee drinks! Great social atmosphere, though can get busy. Limited outlets but WiFi works well for light work.",
        keywords: ["trendy vibe", "innovative coffee", "social atmosphere", "limited outlets", "light work"]
      },
      {
        username: "Sophie L.",
        rating: 5,
        text: "Perfect for creative work and brainstorming! The energy here is infectious and the pastries are fresh and delicious. Great for collaboration.",
        keywords: ["creative work", "brainstorming", "infectious energy", "collaboration", "energetic"]
      },
      {
        username: "Mark D.",
        rating: 4,
        text: "Great coffee innovation and social space. Not the quietest for deep focus work but excellent for collaborative projects and networking.",
        keywords: ["coffee innovation", "social space", "collaborative projects", "networking", "energetic environment"]
      }
    ]
  },
  {
    id: "oslo-coffee-roasters",
    name: "Oslo Coffee Roasters",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=200&fit=crop",
    rating: 4.6,
    address: "422 E 75th St, NYC",
    location: "upper east side",
    neighborhood: "Upper East Side",
    wifiSpeed: "42 Mbps",
    noiseLevel: "Quiet" as const,
    powerOutlets: true,
    openUntil: "7 PM",
    distance: "1.1 mi",
    walkTime: "15 min",
    coordinates: [-73.9442, 40.7711] as [number, number],
    amenities: ["Free WiFi", "Power Outlets", "Scandinavian Design", "Specialty Coffee", "Pastries", "Study Friendly"],
    tags: ["quiet", "scandinavian", "specialty coffee", "upper east side", "study friendly", "minimalist"],
    reviews: [
      {
        username: "Anna K.",
        rating: 5,
        text: "Beautiful Scandinavian-inspired space with excellent coffee. Perfect for studying with reliable WiFi and plenty of outlets.",
        keywords: ["scandinavian", "excellent coffee", "studying", "reliable wifi", "outlets"]
      },
      {
        username: "James P.",
        rating: 4,
        text: "Love the minimalist design and quiet atmosphere. Great for focused work sessions. Coffee is top-notch.",
        keywords: ["minimalist design", "quiet atmosphere", "focused work", "top-notch coffee"]
      }
    ]
  },
  {
    id: "gregorys-coffee-flatiron",
    name: "Gregorys Coffee",
    image: "https://images.unsplash.com/photo-1453614482241-598e5dc1d180?w=400&h=200&fit=crop",
    rating: 4.3,
    address: "200 5th Ave, NYC",
    location: "flatiron",
    neighborhood: "Flatiron District",
    wifiSpeed: "38 Mbps",
    noiseLevel: "Moderate" as const,
    powerOutlets: true,
    openUntil: "8 PM",
    distance: "0.8 mi",
    walkTime: "11 min",
    coordinates: [-73.9899, 40.7410] as [number, number],
    amenities: ["Free WiFi", "Power Outlets", "Quick Service", "Grab & Go", "Reliable Chain", "Work Friendly"],
    tags: ["reliable", "quick service", "flatiron", "chain", "work friendly", "convenient"],
    reviews: [
      {
        username: "Michael R.",
        rating: 4,
        text: "Reliable spot for getting work done. Good WiFi, plenty of seating, and consistent quality. Perfect for quick meetings.",
        keywords: ["reliable", "work", "good wifi", "seating", "quick meetings"]
      },
      {
        username: "Sarah T.",
        rating: 4,
        text: "Great location in Flatiron with dependable service. Not the most unique but gets the job done for remote work.",
        keywords: ["flatiron location", "dependable service", "remote work"]
      }
    ]
  }
];

// NYC Neighborhoods data
const nycNeighborhoods = [
  {
    name: "West Village",
    description: "Charming cobblestone streets with cozy coffee shops",
    shopCount: 2,
    image: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=300&h=200&fit=crop"
  },
  {
    name: "Flatiron District",
    description: "Business district with work-friendly coffee spots",
    shopCount: 2,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop"
  },
  {
    name: "SoHo",
    description: "Trendy area with innovative coffee experiences",
    shopCount: 1,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop"
  },
  {
    name: "Financial District",
    description: "Downtown business hub with quiet work spaces",
    shopCount: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
  },
  {
    name: "Upper East Side",
    description: "Upscale neighborhood with specialty coffee roasters",
    shopCount: 1,
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=300&h=200&fit=crop"
  }
];

// Synonym mapping for intelligent search
const synonymMap = {
  quiet: ["peaceful", "silent", "low noise", "calm", "tranquil", "serene"],
  outlets: ["charging ports", "power", "plugs", "electricity", "charging stations"],
  wifi: ["internet", "connection", "online", "network"],
  study: ["studying", "academic", "learning", "homework", "research", "student"],
  work: ["working", "office", "remote work", "productivity", "professional", "business"],
  coffee: ["espresso", "latte", "cappuccino", "brew", "caffeine", "java"],
  downtown: ["city center", "central", "urban core", "financial district"],
  cozy: ["comfortable", "warm", "inviting", "homey", "welcoming"],
  fast: ["quick", "speedy", "rapid", "high-speed", "efficient"],
  meeting: ["collaboration", "group work", "team", "discussion", "conference"]
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [neighborhoodResults, setNeighborhoodResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [matchReasons, setMatchReasons] = useState<{[key: string]: string[]}>({});

  // Enhanced search function with natural language processing
  const performIntelligentSearch = useMemo(() => {
    return (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setNeighborhoodResults([]);
        setMatchReasons({});
        return;
      }

      setIsSearching(true);
      
      const queryWords = query.toLowerCase().split(/\s+/);
      const results: any[] = [];
      const neighborhoodMatches: any[] = [];
      const reasons: {[key: string]: string[]} = {};

      allCoffeeShops.forEach(shop => {
        const matches: string[] = [];
        let score = 0;

        // Check direct matches in shop attributes
        queryWords.forEach(word => {
          // Location matching
          if (shop.name.toLowerCase().includes(word)) {
            matches.push(`Coffee shop name contains "${word}"`);
            score += 5; // Higher score for name matches
          }
          
          // Location and neighborhood matching
          if (shop.location.includes(word) || shop.address.toLowerCase().includes(word)) {
            matches.push(`Located in ${shop.location}`);
            score += 3;
          }
          
          if (shop.neighborhood && shop.neighborhood.toLowerCase().includes(word)) {
            matches.push(`Located in ${shop.neighborhood}`);
            score += 3;
          }

          // Tags matching
          shop.tags.forEach(tag => {
            if (tag.includes(word)) {
              matches.push(`Tagged as "${tag}"`);
              score += 2;
            }
          });

          // Amenities matching
          shop.amenities.forEach(amenity => {
            if (amenity.toLowerCase().includes(word)) {
              matches.push(`Offers ${amenity}`);
              score += 2;
            }
          });

          // Noise level matching
          if (shop.noiseLevel.toLowerCase().includes(word)) {
            matches.push(`${shop.noiseLevel} environment`);
            score += 2;
          }

          // Power outlets matching
          if ((word === "outlets" || word === "power") && shop.powerOutlets) {
            matches.push("Has power outlets available");
            score += 2;
          }

          // WiFi speed matching
          if ((word === "wifi" || word === "internet") && parseInt(shop.wifiSpeed) >= 40) {
            matches.push(`Fast WiFi (${shop.wifiSpeed})`);
            score += 2;
          }
        });

        // Check synonym matches
        queryWords.forEach(word => {
          Object.entries(synonymMap).forEach(([key, synonyms]) => {
            if (synonyms.includes(word) || key === word) {
              // Apply the same matching logic for synonyms
              if (key === "quiet" && shop.noiseLevel === "Quiet") {
                matches.push("Quiet atmosphere");
                score += 3;
              }
              if (key === "outlets" && shop.powerOutlets) {
                matches.push("Power outlets available");
                score += 2;
              }
              if (key === "wifi" && parseInt(shop.wifiSpeed) >= 40) {
                matches.push(`Reliable WiFi (${shop.wifiSpeed})`);
                score += 2;
              }
              if ((key === "study" || key === "work") && shop.tags.includes("work-friendly")) {
                matches.push("Work-friendly environment");
                score += 2;
              }
              if (key === "downtown" && shop.location === "downtown") {
                matches.push("Downtown location");
                score += 3;
              }
            }
          });
        });

        // Check review content for keyword matches
        shop.reviews.forEach(review => {
          queryWords.forEach(word => {
            if (review.text.toLowerCase().includes(word)) {
              matches.push(`Review mentions: "${review.text.substring(0, 100)}..."`);
              score += 1;
            }

            // Check review keywords
            review.keywords.forEach(keyword => {
              if (keyword.includes(word)) {
                matches.push(`Review highlights: "${keyword}"`);
                score += 1;
              }
            });

            // Check synonyms in reviews
            Object.entries(synonymMap).forEach(([key, synonyms]) => {
              if (synonyms.includes(word) || key === word) {
                review.keywords.forEach(keyword => {
                  if (keyword.includes(key) || synonyms.some(syn => keyword.includes(syn))) {
                    matches.push(`Review mentions: "${keyword}"`);
                    score += 1;
                  }
                });
              }
            });
          });
        });

        // If we have matches, add to results
        if (matches.length > 0) {
          results.push({ ...shop, searchScore: score });
          reasons[shop.id] = [...new Set(matches)]; // Remove duplicates
        }
      });

      // Search neighborhoods
      nycNeighborhoods.forEach(neighborhood => {
        const neighborhoodMatches = queryWords.some(word => 
          neighborhood.name.toLowerCase().includes(word) ||
          neighborhood.description.toLowerCase().includes(word)
        );
        
        if (neighborhoodMatches) {
          neighborhoodMatches.push({
            ...neighborhood,
            type: 'neighborhood'
          });
        }
      });

      // Sort by relevance score
      results.sort((a, b) => b.searchScore - a.searchScore);
      
      setSearchResults(results);
      setNeighborhoodResults(neighborhoodMatches);
      setMatchReasons(reasons);
      setIsSearching(false);
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    performIntelligentSearch(query);
  };

  const handleRecentSearch = (search: string) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  const handleNeighborhoodClick = (neighborhoodName: string) => {
    handleSearch(neighborhoodName.toLowerCase());
  };

  const recentSearches = [
    "quiet workspace downtown",
    "coffee shops with outlets", 
    "study spots with fast wifi",
    "meeting spaces midtown"
  ];

  const popularFilters = [
    { icon: Wifi, name: "Fast WiFi", color: "text-blue-600", query: "fast wifi" },
    { icon: Volume2, name: "Quiet", color: "text-green-600", query: "quiet" },
    { icon: Zap, name: "Power Outlets", color: "text-yellow-600", query: "outlets" },
    { icon: Clock, name: "Open Late", color: "text-purple-600", query: "open late" },
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
                placeholder="Search coffee shops, areas, or features..."
                className="pl-10 h-12 rounded-xl bg-secondary border-0 text-base"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="lg" className="h-12 px-4">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Results */}
        {searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isSearching ? "Searching..." : `Search Results ${searchResults.length + neighborhoodResults.length > 0 ? `(${searchResults.length + neighborhoodResults.length})` : ""}`}
            </h3>
            {isSearching ? (
              <div className="text-center py-8 text-muted-foreground">
                Finding the perfect coffee shops for you...
              </div>
            ) : (searchResults.length > 0 || neighborhoodResults.length > 0) ? (
              <div className="space-y-4">
                {/* Neighborhood Results */}
                {neighborhoodResults.map((neighborhood, index) => (
                  <Card key={`neighborhood-${index}`} className="active:scale-95 transition-all duration-200 cursor-pointer" onClick={() => handleNeighborhoodClick(neighborhood.name)}>
                    <CardContent className="p-0">
                      <div className="flex">
                        <img
                          src={neighborhood.image}
                          alt={neighborhood.name}
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Building2 className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold">{neighborhood.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {neighborhood.shopCount} shops
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{neighborhood.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Coffee Shop Results */}
                {searchResults.map((shop, index) => (
                  <div key={index} className="space-y-2">
                    <MobileCoffeeShopCard {...shop} />
                    {/* Match reasons */}
                    {matchReasons[shop.id] && (
                      <Card className="bg-secondary/50">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <Quote className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-primary">Why this matches:</p>
                              <div className="space-y-1">
                                {matchReasons[shop.id].slice(0, 3).map((reason, i) => (
                                  <p key={i} className="text-xs text-muted-foreground">• {reason}</p>
                                ))}
                                {matchReasons[shop.id].length > 3 && (
                                  <p className="text-xs text-muted-foreground">• And {matchReasons[shop.id].length - 3} more reasons...</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="mb-2">No coffee shops found matching "{searchQuery}"</p>
                <p className="text-sm">Try searching for "quiet workspace", "outlets downtown", or "study spots"</p>
              </div>
            )}
          </div>
        )}

        {/* Popular Filters */}
        {!searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Browse by Neighborhood</h3>
            <div className="space-y-3">
              {nycNeighborhoods.map((neighborhood, index) => (
                <Card key={index} className="active:scale-95 transition-all duration-200 cursor-pointer" onClick={() => handleNeighborhoodClick(neighborhood.name)}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{neighborhood.name}</h4>
                      <p className="text-sm text-muted-foreground">{neighborhood.description}</p>
                      <Badge variant="outline" className="text-xs mt-1">{neighborhood.shopCount} coffee shops</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
            <div className="grid grid-cols-2 gap-3">
              {popularFilters.map((filter, index) => (
                <Card 
                  key={index} 
                  className="active:scale-95 transition-all duration-200 cursor-pointer"
                  onClick={() => handleSearch(filter.query)}
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
            <h3 className="text-lg font-semibold mb-4">Try These Searches</h3>
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

        {/* Search Tips */}
        {!searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Search Tips</h3>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Try natural language searches:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• "quiet workspace downtown"</p>
                    <p>• "coffee shops with charging ports"</p>
                    <p>• "Blue Bottle" or "Oslo Coffee"</p>
                    <p>• "meeting spaces in midtown"</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Search by features:</p>
                  <div className="flex flex-wrap gap-1">
                    {["outlets", "quiet", "wifi", "study", "work", "cozy", "west village", "flatiron"].map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleSearch(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="h-20" />
      <MobileBottomNav />
    </div>
  );
};

export default SearchPage;