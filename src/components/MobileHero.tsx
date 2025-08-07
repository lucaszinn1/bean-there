import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Wifi, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
const MobileHero = () => {
  const navigate = useNavigate();
  return <section className="px-4 py-8 bg-gradient-bg">
      <div className="text-center space-y-6 mx-0">
        {/* Hero Text */}
        <div className="space-y-4">
          <Badge variant="secondary" className="mx-auto">
            <Users className="w-4 h-4 mr-2" />
            Perfect for Remote Work
          </Badge>
          
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Work from the 
            <span className="text-primary block">Best Coffee Shops</span>
          </h2>
          
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
            Discover spaces with fast WiFi, power outlets, and the perfect atmosphere for productivity
          </p>
        </div>

        {/* Quick Stats */}
        

        {/* CTA Button */}
        <Button variant="mobile" className="w-full max-w-xs mx-auto" onClick={() => navigate('/map')}>
          Explore Nearby
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>;
};
export default MobileHero;