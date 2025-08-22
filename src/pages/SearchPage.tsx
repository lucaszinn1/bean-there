import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Wifi, Zap, Users, Coffee, Star, Navigation2, Percent, Gift, Calendar, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CoffeeShopCard from '@/components/CoffeeShopCard';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [neighborhoodResults, setNeighborhoodResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("");
  const [matchReasons, setMatchReasons] = useState<{[key: string]: string[]}>({});
  const [discountFilter, setDiscountFilter] = useState<string>("all");
  const [distanceFilter, setDistanceFilter] = useState<string>("all");
  const [offerTypeFilter, setOfferTypeFilter] = useState<string>("all");

  // Sample coffee shops data with neighborhoods
  const allCoffeeShops = [
    {
      id: 1,
      name: "Blue Bottle Coffee",
      neighborhood: "West Village",
      location: "450 W 15th St",
      rating: 4.5,
      reviews: 324,
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
      tags: ["Specialty Coffee", "Minimalist", "Third Wave"],
      features: {
        wifi: "Excellent",
        outlets: "Many",
        noise: "Moderate",
        seating: "Limited"
      },
      userReviews: [
        "Perfect quiet workspace with great coffee",
        "Love the minimalist aesthetic and strong wifi",
        "Great for focused work sessions"
      ]
    },
    {
      id: 2,
      name: "Oslo Coffee Roasters",
      neighborhood: "Flatiron District",
      location: "133 Roebling St",
      rating: 4.7,
      reviews: 189,
      image: "https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg",
      tags: ["Nordic Style", "Light Roasts", "Cozy"],
      features: {
        wifi: "Good",
        outlets: "Some",
        noise: "Quiet",
        seating: "Comfortable"
      },
      userReviews: [
        "Incredibly quiet space perfect for studying",
        "Nordic-inspired design creates a peaceful atmosphere",
        "Best light roast coffee in the area"
      ]
    },
    {
      id: 3,
      name: "Gregorys Coffee",
      neighborhood: "Financial District",
      location: "200 Broadway",
      rating: 4.2,
      reviews: 456,
      image: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg",
      tags: ["Chain", "Quick Service", "Reliable"],
      features: {
        wifi: "Good",
        outlets: "Many",
        noise: "Busy",
        seating: "Ample"
      },
      userReviews: [
        "Reliable spot with plenty of charging ports",
        "Gets busy during lunch but good for quick meetings",
        "Consistent quality and fast service"
      ]
    },
    {
      id: 4,
      name: "Stumptown Coffee",
      neighborhood: "SoHo",
      location: "30 W 8th St",
      rating: 4.6,
      reviews: 278,
      image: "https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg",
      tags: ["Third Wave", "Portland Roaster", "Artisanal"],
      features: {
        wifi: "Excellent",
        outlets: "Some",
        noise: "Moderate",
        seating: "Limited"
      },
      userReviews: [
        "Amazing coffee quality and knowledgeable baristas",
        "Great for coffee meetings and casual work",
        "Love the Portland vibe in NYC"
      ]
    },
    {
      id: 5,
      name: "Joe Coffee",
      neighborhood: "Upper East Side",
      location: "1045 Lexington Ave",
      rating: 4.3,
      reviews: 167,
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
      tags: ["Local Chain", "Neighborhood Favorite", "Consistent"],
      features: {
        wifi: "Good",
        outlets: "Many",
        noise: "Quiet",
        seating: "Comfortable"
      },
      userReviews: [
        "Quiet neighborhood spot perfect for remote work",
        "Friendly staff and consistent coffee quality",
        "Great place to escape the midtown crowds"
      ]
    }
  ];

  // NYC Neighborhoods data
  const nycNeighborhoods = [
    {
      name: "West Village",
      description: "Charming cobblestone streets with cozy coffee spots",
      shopCount: 1,
      image: "https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg"
    },
    {
      name: "Flatiron District",
      description: "Modern coffee culture meets historic architecture",
      shopCount: 1,
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
    },
    {
      name: "SoHo",
      description: "Trendy spots perfect for creative professionals",
      shopCount: 1,
      image: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg"
    },
    {
      name: "Financial District",
      description: "Business-friendly cafes for professionals",
      shopCount: 1,
      image: "https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg"
    },
    {
      name: "Upper East Side",
      description: "Quiet neighborhood gems away from the hustle",
      shopCount: 1,
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
    }
  ];

  // Sample discounts data
  const discounts = [
    {
      id: 1,
      shopName: "Blue Bottle Coffee",
      logo: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
      discount: "15% off",
      description: "Student discount on all drinks",
      offerType: "Student",
      distance: "0.3 mi",
      walkTime: "4 min",
      expirationDate: "2024-12-31",
      terms: "Valid with student ID"
    },
    {
      id: 2,
      shopName: "Oslo Coffee Roasters",
      logo: "https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg",
      discount: "Buy 2 Get 1 Free",
      description: "On all pastries during happy hour",
      offerType: "Happy Hour",
      distance: "0.5 mi",
      walkTime: "7 min",
      expirationDate: "2024-11-30",
      terms: "3-5 PM weekdays only"
    }
  ];

  // Synonym mapping for intelligent search
  const synonymMap = {
    'quiet': ['peaceful', 'calm', 'silent', 'low noise', 'tranquil'],
    'outlets': ['charging ports', 'power', 'plugs', 'charging'],
    'wifi': ['internet', 'connection', 'online'],
    'work': ['workspace', 'office', 'productivity', 'business'],
    'study': ['academic', 'learning', 'reading', 'student'],
    'cozy': ['comfortable', 'warm', 'intimate', 'homey'],
    'meeting': ['conference', 'discussion', 'collaborative'],
    'downtown': ['financial district', 'lower manhattan'],
    'midtown': ['times square', 'herald square'],
    'uptown': ['upper east side', 'upper west side']
  };

  const expandSearchTerms = (query: string): string[] => {
    const terms = query.toLowerCase().split(' ');
    const expandedTerms = [...terms];
    
    terms.forEach(term => {
      if (synonymMap[term]) {
        expandedTerms.push(...synonymMap[term]);
      }
    });
    
    return expandedTerms;
  };

  const calculateRelevanceScore = (shop: any, searchTerms: string[]): { score: number, reasons: string[] } => {
    let score = 0;
    const reasons: string[] = [];
    
    searchTerms.forEach(term => {
      // Direct name match (highest priority)
      if (shop.name.toLowerCase().includes(term)) {
        score += 10;
        reasons.push(`Shop name contains "${term}"`);
      }
      
      // Location/neighborhood match
      if (shop.location?.toLowerCase().includes(term) || shop.neighborhood?.toLowerCase().includes(term)) {
        score += 8;
        reasons.push(`Located in area matching "${term}"`);
      }
      
      // Tags match
      shop.tags?.forEach((tag: string) => {
        if (tag.toLowerCase().includes(term)) {
          score += 6;
          reasons.push(`Tagged as "${tag}"`);
        }
      });
      
      // Features match
      Object.entries(shop.features || {}).forEach(([feature, value]) => {
        if (feature.toLowerCase().includes(term) || (typeof value === 'string' && value.toLowerCase().includes(term))) {
          score += 5;
          reasons.push(`${feature}: ${value}`);
        }
      });
      
      // Reviews match
      shop.userReviews?.forEach((review: string) => {
        if (review.toLowerCase().includes(term)) {
          score += 3;
          reasons.push(`Review mentions: "${review.substring(0, 50)}..."`);
        }
      });
    });
    
    return { score, reasons };
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setNeighborhoodResults([]);
      setMatchReasons({});
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const searchTerms = expandSearchTerms(query);
      const results: any[] = [];
      const neighborhoods: any[] = [];
      const reasons: {[key: string]: string[]} = {};

      // Search coffee shops
      allCoffeeShops.forEach(shop => {
        const { score, reasons: shopReasons } = calculateRelevanceScore(shop, searchTerms);
        if (score > 0) {
          results.push({ ...shop, relevanceScore: score });
          reasons[shop.id] = shopReasons;
        }
      });

      // Search neighborhoods
      nycNeighborhoods.forEach(neighborhood => {
        const neighborhoodScore = searchTerms.reduce((score, term) => {
          if (neighborhood.name.toLowerCase().includes(term) || 
              neighborhood.description.toLowerCase().includes(term)) {
            return score + 5;
          }
          return score;
        }, 0);

        if (neighborhoodScore > 0) {
          neighborhoods.push({ ...neighborhood, relevanceScore: neighborhoodScore });
        }
      });

      // Sort by relevance
      results.sort((a, b) => b.relevanceScore - a.relevanceScore);
      neighborhoods.sort((a, b) => b.relevanceScore - a.relevanceScore);

      setSearchResults(results);
      setNeighborhoodResults(neighborhoods);
      setMatchReasons(reasons);
      setIsSearching(false);
    }, 300);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
        setNeighborhoodResults([]);
        setMatchReasons({});
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handlePopularSearch = (search: string) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  const handleNeighborhoodClick = (neighborhoodName: string) => {
    setSelectedNeighborhood(neighborhoodName);
    setSearchQuery("");
    const filteredShops = allCoffeeShops.filter(shop => 
      shop.neighborhood && shop.neighborhood.toLowerCase() === neighborhoodName.toLowerCase()
    );
    setSearchResults(filteredShops);
  };

  const recentSearches = [
    "quiet workspace",
    "outlets midtown",
    "Blue Bottle",
    "study spots"
  ];

  const popularFilters = [
    { icon: Wifi, name: "Fast WiFi", color: "text-blue-600", query: "excellent wifi" },
    { icon: Zap, name: "Power Outlets", color: "text-yellow-600", query: "many outlets" },
    { icon: Users, name: "Meeting Space", color: "text-green-600", query: "meeting space" },
    { icon: Coffee, name: "Specialty Coffee", color: "text-amber-600", query: "specialty coffee" },
    { icon: MapPin, name: "Quiet Space", color: "text-purple-600", query: "quiet" },
    { icon: Clock, name: "Open Late", color: "text-purple-600", query: "open late" },
  ];

  const clearNeighborhoodFilter = () => {
    setSelectedNeighborhood("");
    setSearchResults([]);
    setSearchQuery("");
  };

  // Filter discounts
  const offerTypes = [...new Set(discounts.map(d => d.offerType))];
  
  const filteredDiscounts = discounts.filter(discount => {
    if (offerTypeFilter !== "all" && discount.offerType !== offerTypeFilter) return false;
    if (discountFilter === "active") {
      const expDate = new Date(discount.expirationDate);
      const now = new Date();
      if (expDate < now) return false;
    }
    return true;
  });

  const formatExpirationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Expires today";
    if (diffDays === 1) return "Expires tomorrow";
    if (diffDays < 7) return `${diffDays} days left`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search coffee shops, areas, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-12 text-base"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Results */}
        {selectedNeighborhood && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Coffee Shops in {selectedNeighborhood}</h3>
              <Button variant="outline" size="sm" onClick={clearNeighborhoodFilter}>
                Clear Filter
              </Button>
            </div>
          </div>
        )}

        {searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Search Results for "{searchQuery}" ({searchResults.length + neighborhoodResults.length})
            </h3>
            
            {/* Neighborhood Results */}
            {neighborhoodResults.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-muted-foreground">Neighborhoods</h4>
                <div className="space-y-3">
                  {neighborhoodResults.map((neighborhood, index) => (
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
            
            {/* Coffee Shop Results */}
            {searchResults.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-3 text-muted-foreground">Coffee Shops</h4>
                <div className="space-y-4">
                  {searchResults.map((shop) => (
                    <div key={shop.id}>
                      <CoffeeShopCard {...shop} />
                      {matchReasons[shop.id] && (
                        <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Why this matches:</p>
                          <div className="space-y-1">
                            {matchReasons[shop.id].slice(0, 3).map((reason, idx) => (
                              <p key={idx} className="text-xs text-muted-foreground">• {reason}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {searchResults.length === 0 && neighborhoodResults.length === 0 && !isSearching && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="mb-2">No results found for "{searchQuery}"</p>
                <p className="text-sm">Try different keywords or browse by neighborhood</p>
              </div>
            )}
          </div>
        )}

        {/* Browse by Neighborhood */}
        {!searchQuery && !selectedNeighborhood && (
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

        {/* Show filtered coffee shops when neighborhood is selected */}
        {selectedNeighborhood && searchResults.length > 0 && (
          <div className="space-y-4">
            {searchResults.map((shop) => (
              <CoffeeShopCard key={shop.id} {...shop} />
            ))}
          </div>
        )}

        {/* Popular Filters */}
        {!searchQuery && !selectedNeighborhood && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
            <div className="grid grid-cols-2 gap-3">
              {popularFilters.map((filter, index) => (
                <Card key={index} className="active:scale-95 transition-all duration-200 cursor-pointer" onClick={() => handlePopularSearch(filter.query)}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <filter.icon className={`w-5 h-5 ${filter.color}`} />
                    <span className="font-medium text-sm">{filter.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Recent Searches */}
            <div className="mt-6">
              <h4 className="text-md font-medium mb-3">Recent Searches</h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handlePopularSearch(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Discounts Section - Moved to bottom */}
        {!searchQuery && !selectedNeighborhood && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Local Discounts</h3>
              <Badge variant="secondary" className="text-xs">
                {filteredDiscounts.length} offers
              </Badge>
            </div>
            
            {/* Discount Filters */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Select value={offerTypeFilter} onValueChange={setOfferTypeFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Offer Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {offerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Distance</SelectItem>
                  <SelectItem value="0.5">Within 0.5 mi</SelectItem>
                  <SelectItem value="1.0">Within 1 mi</SelectItem>
                  <SelectItem value="2.0">Within 2 mi</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={discountFilter} onValueChange={setDiscountFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Offers</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Discount Cards */}
            <div className="space-y-3">
              {filteredDiscounts.map((discount) => (
                <Card key={discount.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <img
                        src={discount.logo}
                        alt={discount.shopName}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{discount.shopName}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Navigation2 className="w-3 h-3" />
                              <span>{discount.distance}</span>
                              <span>•</span>
                              <span>{discount.walkTime}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs ml-2">
                            {discount.offerType}
                          </Badge>
                        </div>
                        
                        <div className="mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Percent className="w-4 h-4 text-primary" />
                            <span className="font-medium text-sm text-primary">{discount.discount}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{discount.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{formatExpirationDate(discount.expirationDate)}</span>
                          </div>
                          <Button size="sm" className="h-7 px-3 text-xs">
                            <Gift className="w-3 h-3 mr-1" />
                            Redeem
                          </Button>
                        </div>
                        
                        {discount.terms && (
                          <p className="text-xs text-muted-foreground mt-2 italic">{discount.terms}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredDiscounts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Gift className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="mb-2">No discounts match your filters</p>
                <p className="text-sm">Try adjusting your filter settings</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-20" />
    </div>
  );
};

export default SearchPage;