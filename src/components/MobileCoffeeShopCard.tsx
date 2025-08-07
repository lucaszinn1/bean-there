import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Wifi, Zap, Volume2, Clock, MapPin, Navigation } from "lucide-react";

interface MobileCoffeeShopCardProps {
  name: string;
  image: string;
  rating: number;
  address: string;
  wifiSpeed: string;
  noiseLevel: "Quiet" | "Moderate" | "Lively";
  powerOutlets: boolean;
  openUntil: string;
  distance: string;
  walkTime: string;
}

const MobileCoffeeShopCard = ({
  name,
  image,
  rating,
  address,
  wifiSpeed,
  noiseLevel,
  powerOutlets,
  openUntil,
  distance,
  walkTime
}: MobileCoffeeShopCardProps) => {
  const getWifiLabel = (speed: string) => {
    const mbps = parseInt(speed);
    if (mbps >= 50) return "Fast";
    if (mbps >= 25) return "Average";
    return "Slow";
  };

  return (
    <Card className="overflow-hidden shadow-card active:scale-95 transition-all duration-200">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant="secondary" className="bg-background/90 text-xs">
            {distance}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div>
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-3 h-3" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-1 text-primary text-sm mt-1">
            <Navigation className="w-3 h-3" />
            <span>{walkTime} walk</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
            <Wifi className="w-4 h-4 text-primary" />
            <span className="font-medium">{getWifiLabel(wifiSpeed)}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
            <Zap className={`w-4 h-4 ${powerOutlets ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="font-medium">{powerOutlets ? 'Outlets' : 'No outlets'}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
            <Volume2 className="w-4 h-4 text-primary" />
            <span className="font-medium">{noiseLevel}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium">Until {openUntil}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button variant="mobile" className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default MobileCoffeeShopCard;