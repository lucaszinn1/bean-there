import { Button } from "@/components/ui/button";
import { Home, Search, Heart, User, Plus } from "lucide-react";

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-mobile z-50">
      <div className="flex items-center justify-around py-2">
        <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 px-3">
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 px-3">
          <Search className="w-5 h-5" />
          <span className="text-xs">Search</span>
        </Button>
        
        <Button variant="mobile" size="sm" className="flex-col gap-1 h-auto py-3 px-4 rounded-full">
          <Plus className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 px-3">
          <Heart className="w-5 h-5" />
          <span className="text-xs">Saved</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 px-3">
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;