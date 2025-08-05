import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Wifi, Zap, Volume2, Clock, MapPin } from "lucide-react";

interface CoffeeShopCardProps {
  name: string;
  image: string;
  rating: number;
  address: string;
  wifiSpeed: string;
  noiseLevel: "Quiet" | "Moderate" | "Lively";
  powerOutlets: boolean;
  openUntil: string;
  distance: string;
}

const CoffeeShopCard = ({
  name,
  image,
  rating,
  address,
  wifiSpeed,
  noiseLevel,
  powerOutlets,
  openUntil,
  distance
}: CoffeeShopCardProps) => {
  const getNoiseColor = (level: string) => {
    switch (level) {
      case "Quiet":
        return "bg-green-100 text-green-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Lively":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90">
            {distance}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
              </div>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {address}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-blue-600" />
              <span>{wifiSpeed}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${powerOutlets ? 'text-green-600' : 'text-gray-400'}`} />
              <span>{powerOutlets ? 'Outlets' : 'No outlets'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-600" />
              <Badge variant="outline" className={`text-xs ${getNoiseColor(noiseLevel)} border-none`}>
                {noiseLevel}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-muted-foreground">Until {openUntil}</span>
            </div>
          </div>

          {/* Action Button */}
          <Button variant="coffee" className="w-full">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoffeeShopCard;