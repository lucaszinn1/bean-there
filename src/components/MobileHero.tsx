import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Wifi, Users } from "lucide-react";

const MobileHero = () => {
  return (
    <section className="px-4 py-8 bg-gradient-bg">
      <div className="text-center space-y-6">
        {/* Hero Text */}
        <div className="space-y-4">
          <Badge variant="secondary" className="mx-auto">
            <Zap className="w-4 h-4 mr-2" />
            Perfect for Remote Work
          </Badge>
          
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Work from the 
            <span className="text-primary block">Best Coffee Shops</span>
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
            Discover spaces with fast WiFi, power outlets, and the perfect atmosphere for productivity
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>500+ Spots</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wifi className="w-4 h-4 text-primary" />
            <span>Verified WiFi</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button variant="mobile" className="w-full max-w-xs mx-auto">
          Explore Nearby
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default MobileHero;