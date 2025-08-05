import { Button } from "@/components/ui/button";
import { Home, Search, Heart, User, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/saved", icon: Heart, label: "Saved" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-mobile z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
          <Button 
            key={index}
            variant="ghost" 
            size="sm" 
            className={`flex-col gap-1 h-auto py-2 px-3 ${
              isActive(item.path) ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
        
        {/* Center Plus Button */}
        <Button 
          variant="mobile" 
          size="sm" 
          className="flex-col gap-1 h-auto py-3 px-4 rounded-full"
          onClick={() => {/* Add new review/check-in functionality */}}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;