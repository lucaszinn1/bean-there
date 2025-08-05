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
  const getNoiseColor = (level: string) => {
    switch (level) {
      case "Quiet":
        return "bg-green-50 text-green-700 border-green-200";
      case "Moderate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Lively":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
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
            <span className="font-medium">{wifiSpeed}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
            <Zap className={`w-4 h-4 ${powerOutlets ? 'text-green-600' : 'text-gray-400'}`} />
            <span className="font-medium">{powerOutlets ? 'Outlets' : 'No outlets'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <Badge variant="outline" className={`text-xs ${getNoiseColor(noiseLevel)}`}>
              {noiseLevel}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Clock className="w-3 h-3" />
            <span>Until {openUntil}</span>
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