import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Coffee, Wifi, MapPin, Clock, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-coffee-shop.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-warm overflow-hidden">
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Coffee className="w-4 h-4 mr-2" />
                Find Your Perfect Workspace
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Bean There,
                <span className="text-primary block">Work There</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover laptop-friendly coffee shops with reliable WiFi, comfortable seating, and the perfect atmosphere for productivity.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Enter your location..."
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="hero" size="lg" className="h-12 px-8">
                Find Spots
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1000+ Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Verified WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-warm">
              <img
                src={heroImage}
                alt="Modern coffee shop workspace with laptops and cozy atmosphere"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -right-4 top-20 bg-card p-4 rounded-lg shadow-card animate-float">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-sm">WiFi: Excellent</div>
                  <div className="text-xs text-muted-foreground">25 Mbps</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-4 bottom-20 bg-card p-4 rounded-lg shadow-card animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <Coffee className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium text-sm">4.8 ⭐</div>
                  <div className="text-xs text-muted-foreground">Perfect for work</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  );
};

export default HeroSection;