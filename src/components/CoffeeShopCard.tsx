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
              <Wifi className="w-4 h-4 text-primary" />
              <Badge variant="outline" className="text-xs bg-secondary text-secondary-foreground">
                {wifiSpeed}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${powerOutlets ? 'text-primary' : 'text-muted-foreground'}`} />
              <Badge variant="outline" className="text-xs bg-secondary text-secondary-foreground">
                {powerOutlets ? 'Outlets' : 'No outlets'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" />
              <Badge variant="outline" className="text-xs bg-secondary text-secondary-foreground">
                {noiseLevel}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <Badge variant="outline" className="text-xs bg-secondary text-secondary-foreground">
                Until {openUntil}
              </Badge>
            </div>
          </div>

          {/* Action Button */}
          <Button variant="mobile" className="w-full">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoffeeShopCard;