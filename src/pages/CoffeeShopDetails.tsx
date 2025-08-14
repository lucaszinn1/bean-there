import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
    website: "https://bluebottlecoffee.com",
    reviews: [
      {
        username: "Sarah M.",
        rating: 5,
        text: "Perfect spot for remote work! WiFi is super fast and the atmosphere is so peaceful. Coffee quality is outstanding.",
        date: "2 days ago",
        topics: ["WiFi", "Atmosphere", "Coffee Quality"]
      },
      {
        username: "Mike C.",
        rating: 5,
        text: "Love the outlet availability here. Never had trouble finding a spot to plug in my laptop. Staff is very friendly too.",
        date: "1 week ago",
        topics: ["Outlets", "Staff", "Seating"]
      },
      {
        username: "Jennifer L.",
        rating: 4,
        text: "Great coffee and quiet environment. Sometimes gets busy during lunch hours but overall excellent for studying.",
        date: "2 weeks ago",
        topics: ["Noise Level", "Coffee Quality", "Seating"]
      }
    ],
    totalReviews: 28
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
    website: "https://joecoffee.com",
    reviews: [
      {
        username: "David K.",
        rating: 5,
        text: "Great community vibe! Perfect for meetings or just working solo. WiFi speed is solid and plenty of seating options.",
        date: "3 days ago",
        topics: ["Atmosphere", "WiFi", "Seating", "Meetings"]
      },
      {
        username: "Lisa R.",
        rating: 4,
        text: "Coffee is excellent and staff is always helpful. Gets a bit noisy during peak hours but manageable.",
        date: "5 days ago",
        topics: ["Coffee Quality", "Staff", "Noise Level"]
      },
      {
        username: "Tom H.",
        rating: 5,
        text: "Love the light meal options here. Great spot to spend a whole afternoon working. Outlets everywhere!",
        date: "1 week ago",
        topics: ["Food", "Outlets", "Seating"]
      }
    ],
    totalReviews: 34
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
    website: "https://stumptowncoffee.com",
    reviews: [
      {
        username: "Amanda P.",
        rating: 5,
        text: "Absolutely love the quiet atmosphere here! Perfect for deep focus work. The artisan pastries are amazing too.",
        date: "1 day ago",
        topics: ["Noise Level", "Food", "Atmosphere"]
      },
      {
        username: "Carlos M.",
        rating: 5,
        text: "Premium coffee quality as expected from Stumptown. Great power outlet availability and comfortable seating.",
        date: "4 days ago",
        topics: ["Coffee Quality", "Outlets", "Seating"]
      },
      {
        username: "Rachel W.",
        rating: 4,
        text: "Excellent study spot. WiFi is reliable and the environment really helps with productivity. Closes a bit early though.",
        date: "1 week ago",
        topics: ["WiFi", "Atmosphere", "Hours"]
      }
    ],
    totalReviews: 22
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
    website: "https://irvingfarm.com",
    reviews: [
      {
        username: "Emily J.",
        rating: 5,
        text: "Such a cozy atmosphere! The farm-to-cup coffee is exceptional and the fresh bakes are perfect for a long work session.",
        date: "2 days ago",
        topics: ["Atmosphere", "Coffee Quality", "Food"]
      },
      {
        username: "Alex B.",
        rating: 4,
        text: "Really laptop-friendly environment. Good WiFi and plenty of outlets. The moderate noise level is just right for focus.",
        date: "6 days ago",
        topics: ["WiFi", "Outlets", "Noise Level", "Seating"]
      },
      {
        username: "Maria S.",
        rating: 4,
        text: "Been coming here since college! Staff remembers regulars and the atmosphere is always welcoming. A NYC classic.",
        date: "1 week ago",
        topics: ["Staff", "Atmosphere", "Coffee Quality"]
      }
    ],
    totalReviews: 19
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
    website: "https://lacolombe.com",
    reviews: [
      {
        username: "Jake T.",
        rating: 4,
        text: "Love the trendy vibe and innovative coffee drinks! Great social atmosphere, though can get busy. Limited outlets but WiFi works well.",
        date: "3 days ago",
        topics: ["Atmosphere", "Coffee Quality", "Outlets", "WiFi"]
      },
      {
        username: "Sophie L.",
        rating: 5,
        text: "Perfect for creative work and brainstorming! The energy here is infectious and the pastries are fresh and delicious.",
        date: "5 days ago",
        topics: ["Atmosphere", "Food", "Noise Level"]
      },
      {
        username: "Mark D.",
        rating: 4,
        text: "Great coffee innovation and social space. Not the quietest for deep focus work but excellent for collaborative projects.",
        date: "1 week ago",
        topics: ["Coffee Quality", "Atmosphere", "Noise Level"]
      }
    ],
    totalReviews: 31
  }
];

// Generate fallback details for dynamically created coffee shops
const generateCoffeeShopDetails = (id: string) => {
  const nameFromId = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(/\d+$/, '').trim();
  
  // Generate sample reviews for dynamic shops
  const sampleReviews = [
    {
      username: "Coffee Lover",
      rating: 5,
      text: "Great spot for remote work! Fast WiFi and comfortable seating make this my go-to place.",
      date: "2 days ago",
      topics: ["WiFi", "Seating", "Atmosphere"]
    },
    {
      username: "Remote Worker",
      rating: 4,
      text: "Good coffee quality and decent noise level for focus. Power outlets are available throughout.",
      date: "1 week ago",
      topics: ["Coffee Quality", "Noise Level", "Outlets"]
    },
    {
      username: "Student",
      rating: 4,
      text: "Perfect study environment. Staff is friendly and the atmosphere is welcoming for long work sessions.",
      date: "3 days ago",
      topics: ["Staff", "Atmosphere", "Seating"]
    }
  ];
  
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
    website: "https://example.com",
    reviews: sampleReviews,
    totalReviews: Math.floor(15 + Math.random() * 25)
  };
};

const CoffeeShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Always scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Re-run when the coffee shop ID changes
  
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
            <span className="text-sm text-muted-foreground">• {shop.totalReviews} reviews</span>
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

        {/* Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{shop.rating}</span>
              <span className="text-muted-foreground">• {shop.totalReviews} reviews</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {shop.reviews?.slice(0, 3).map((review, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.username}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{review.text}</p>
                  <div className="flex flex-wrap gap-1">
                    {review.topics.map((topic, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            See All {shop.totalReviews} Reviews
          </Button>
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