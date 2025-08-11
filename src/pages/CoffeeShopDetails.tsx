import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Wifi, Zap, Volume2, Clock, MapPin, Navigation, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MobileBottomNav from "@/components/MobileBottomNav";

// Coffee shop data - in a real app this would come from an API
const coffeeShops = [
  {
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
    coordinates: [-74.0121, 40.7106] as [number, number],
    description: "Blue Bottle Coffee is known for its meticulously sourced beans and artisanal brewing methods. This location offers a serene atmosphere perfect for focused work sessions.",
    amenities: ["Free WiFi", "Power Outlets", "Quiet Environment", "Specialty Coffee", "Pastries", "Work-Friendly"],
    hours: {
      monday: "6:00 AM - 8:00 PM",
      tuesday: "6:00 AM - 8:00 PM", 
      wednesday: "6:00 AM - 8:00 PM",
      thursday: "6:00 AM - 8:00 PM",
      friday: "6:00 AM - 8:00 PM",
      saturday: "7:00 AM - 8:00 PM",
      sunday: "7:00 AM - 7:00 PM"
    },
    phone: "(212) 219-0140",
    website: "https://bluebottlecoffee.com"
  },
  {
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
    coordinates: [-74.0021, 40.7325] as [number, number],
    description: "Joe Coffee Company brings you expertly roasted coffee in a comfortable, community-focused environment. Great for both solo work and casual meetings.",
    amenities: ["Free WiFi", "Power Outlets", "Community Atmosphere", "Craft Coffee", "Light Meals", "Meeting Space"],
    hours: {
      monday: "6:30 AM - 9:00 PM",
      tuesday: "6:30 AM - 9:00 PM",
      wednesday: "6:30 AM - 9:00 PM", 
      thursday: "6:30 AM - 9:00 PM",
      friday: "6:30 AM - 9:00 PM",
      saturday: "7:30 AM - 9:00 PM",
      sunday: "7:30 AM - 8:00 PM"
    },
    phone: "(212) 924-7400",
    website: "https://joecoffee.com"
  },
  {
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
    coordinates: [-73.9965, 40.7328] as [number, number],
    description: "Stumptown Coffee Roasters is committed to sourcing exceptional coffee and sharing it with the world. This location provides a peaceful environment for productivity.",
    amenities: ["Free WiFi", "Power Outlets", "Quiet Space", "Premium Coffee", "Artisan Pastries", "Study Friendly"],
    hours: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM",
      wednesday: "7:00 AM - 7:00 PM",
      thursday: "7:00 AM - 7:00 PM", 
      friday: "7:00 AM - 7:00 PM",
      saturday: "8:00 AM - 7:00 PM",
      sunday: "8:00 AM - 6:00 PM"
    },
    phone: "(212) 677-5727",
    website: "https://stumptowncoffee.com"
  },
  {
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
    coordinates: [-73.9870, 40.7368] as [number, number],
    description: "Irving Farm Coffee Roasters has been serving New York's coffee community since 1996. This cozy spot offers a welcoming atmosphere for work and relaxation.",
    amenities: ["Free WiFi", "Power Outlets", "Cozy Atmosphere", "Farm-to-Cup Coffee", "Fresh Bakes", "Laptop Friendly"],
    hours: {
      monday: "6:00 AM - 8:00 PM",
      tuesday: "6:00 AM - 8:00 PM",
      wednesday: "6:00 AM - 8:00 PM",
      thursday: "6:00 AM - 8:00 PM",
      friday: "6:00 AM - 8:00 PM",
      saturday: "7:00 AM - 8:00 PM",
      sunday: "7:00 AM - 7:00 PM"
    },
    phone: "(212) 995-5252",
    website: "https://irvingfarm.com"
  },
  {
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
    coordinates: [-73.9925, 40.7256] as [number, number],
    description: "La Colombe is known for its innovative approach to coffee and vibrant community atmosphere. Perfect for those who enjoy a more energetic environment.",
    amenities: ["Free WiFi", "Lively Atmosphere", "Innovative Coffee", "Fresh Pastries", "Social Space", "Trendy Vibe"],
    hours: {
      monday: "6:30 AM - 9:00 PM",
      tuesday: "6:30 AM - 9:00 PM",
      wednesday: "6:30 AM - 9:00 PM",
      thursday: "6:30 AM - 9:00 PM",
      friday: "6:30 AM - 9:00 PM",
      saturday: "7:30 AM - 9:00 PM",
      sunday: "7:30 AM - 8:00 PM"
    },
    phone: "(212) 625-8585",
    website: "https://lacolombe.com"
  }
];

// Generate fallback details for dynamically created coffee shops
const generateCoffeeShopDetails = (id: string) => {
  const nameFromId = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(/\d+$/, '').trim();
  
  return {
    id,
    name: nameFromId,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop",
    rating: Math.round((3.8 + Math.random() * 1.2) * 10) / 10,
    address: "NYC",
    wifiSpeed: `${25 + Math.floor(Math.random() * 40)} Mbps`,
    noiseLevel: ["Quiet", "Moderate", "Lively"][Math.floor(Math.random() * 3)] as "Quiet" | "Moderate" | "Lively",
    powerOutlets: Math.random() > 0.2,
    openUntil: ["7 PM", "8 PM", "9 PM"][Math.floor(Math.random() * 3)],
    distance: `${(1.0 + Math.random() * 2).toFixed(1)} mi`,
    walkTime: `${Math.floor(15 + Math.random() * 20)} min`,
    coordinates: [-74.0060 + (Math.random() - 0.5) * 0.08, 40.7128 + (Math.random() - 0.5) * 0.05] as [number, number],
    description: `${nameFromId} offers a welcoming atmosphere perfect for both work and relaxation. Known for quality coffee and comfortable seating.`,
    amenities: ["Free WiFi", "Power Outlets", "Comfortable Seating", "Quality Coffee", "Work Friendly"],
    hours: {
      monday: "7:00 AM - 8:00 PM",
      tuesday: "7:00 AM - 8:00 PM",
      wednesday: "7:00 AM - 8:00 PM",
      thursday: "7:00 AM - 8:00 PM",
      friday: "7:00 AM - 8:00 PM",
      saturday: "8:00 AM - 8:00 PM",
      sunday: "8:00 AM - 7:00 PM"
    },
    phone: "(212) 555-0000",
    website: "https://example.com"
  };
};

const CoffeeShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  let shop = coffeeShops.find(shop => shop.id === id);
  
  // If shop not found in static data, generate details dynamically
  if (!shop && id) {
    shop = generateCoffeeShopDetails(id);
  }
  
  if (!shop) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Coffee shop not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const getWifiLabel = (speed: string) => {
    const mbps = parseInt(speed);
    if (mbps >= 50) return "Fast";
    if (mbps >= 25) return "Average";
    return "Slow";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold truncate flex-1 mx-4">{shop.name}</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex items-center gap-2 bg-background/90 px-3 py-2 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{shop.rating}</span>
          </div>
          <Badge variant="secondary" className="bg-background/90">
            {shop.distance}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{shop.name}</h2>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>{shop.address}</span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Navigation className="w-4 h-4" />
            <span>{shop.walkTime} walk ({shop.distance})</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-muted-foreground leading-relaxed">{shop.description}</p>
        </div>

        {/* Key Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Work Features</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <Wifi className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">{getWifiLabel(shop.wifiSpeed)}</div>
                  <div className="text-xs text-muted-foreground">{shop.wifiSpeed}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <Zap className={`w-5 h-5 ${shop.powerOutlets ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <div className="font-medium">{shop.powerOutlets ? 'Outlets' : 'No outlets'}</div>
                  <div className="text-xs text-muted-foreground">Power access</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">{shop.noiseLevel}</div>
                  <div className="text-xs text-muted-foreground">Noise level</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Until {shop.openUntil}</div>
                  <div className="text-xs text-muted-foreground">Today</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {shop.amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Hours</h3>
          <Card>
            <CardContent className="p-4 space-y-2">
              {Object.entries(shop.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize font-medium">{day}</span>
                  <span className="text-muted-foreground">{hours}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Phone</span>
              <span className="text-muted-foreground">{shop.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Website</span>
              <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Visit website
              </a>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1">
            Get Directions
          </Button>
          <Button variant="outline" className="flex-1">
            Call Now
          </Button>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default CoffeeShopDetails;