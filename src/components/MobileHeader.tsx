import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter } from "lucide-react";
const MobileHeader = () => {
  return <header className="bg-card shadow-mobile sticky top-0 z-50 border-b border-border">
      {/* Top Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <img src="/lovable-uploads/db84e74d-d4ad-4163-96d0-cdc26c7ef469.png" alt="Bean There Logo" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Bean There</h1>
              <p className="text-xs text-muted-foreground">Find your workspace</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>10 Hudson Yards</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      
    </header>;
};
export default MobileHeader;