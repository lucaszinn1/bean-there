import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter } from "lucide-react";

const MobileHeader = () => {
  return (
    <header className="bg-card shadow-mobile sticky top-0 z-50 border-b border-border">
      {/* Top Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <img 
                src="/lovable-uploads/2a690f24-dfd3-4872-b192-5c66f2f090b2.png" 
                alt="Bean There Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Bean There</h1>
              <p className="text-xs text-muted-foreground">Find your workspace</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Downtown</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search coffee shops..."
              className="pl-10 h-12 rounded-xl bg-secondary border-0 text-base"
            />
          </div>
          <Button variant="outline" size="lg" className="h-12 px-4">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;