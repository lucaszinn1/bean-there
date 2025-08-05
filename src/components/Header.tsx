import { Button } from "@/components/ui/button";
import { Coffee, MapPin, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Coffee className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Bean There</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Find Shops
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              For Business
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Community
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <MapPin className="w-4 h-4 mr-2" />
              Set Location
            </Button>
            <Button variant="default" size="sm">
              Sign In
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;