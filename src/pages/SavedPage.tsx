import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Star, MapPin, Heart, Share, Navigation, Trash2 } from "lucide-react";

const SavedPage = () => {
  const savedShops = [
    {
      id: 1,
      name: "The Daily Grind",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop",
      rating: 4.8,
      address: "123 Main St",
      distance: "0.3 mi",
      savedDate: "2 days ago",
      tags: ["WiFi", "Outlets", "Quiet"]
    },
    {
      id: 2,
      name: "Code & Coffee",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=200&fit=crop",
      rating: 4.9,
      address: "321 Tech Blvd",
      distance: "0.5 mi",
      savedDate: "1 week ago",
      tags: ["Fast WiFi", "Outlets", "Quiet"]
    },
    {
      id: 3,
      name: "Brew & Work",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=200&fit=crop",
      rating: 4.6,
      address: "456 Oak Ave",
      distance: "0.7 mi",
      savedDate: "2 weeks ago",
      tags: ["WiFi", "Food", "Moderate"]
    }
  ];

  const collections = [
    { name: "Work Favorites", count: 5, color: "bg-blue-100 text-blue-800" },
    { name: "Study Spots", count: 3, color: "bg-green-100 text-green-800" },
    { name: "Weekend Hangouts", count: 8, color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-mobile sticky top-0 z-50 border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Saved Places</h1>
              <p className="text-sm text-muted-foreground">{savedShops.length} saved coffee shops</p>
            </div>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share List
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Collections */}
        <div>
          <h2 className="text-lg font-semibold mb-4">My Collections</h2>
          <div className="grid grid-cols-1 gap-3">
            {collections.map((collection, index) => (
              <Card key={index} className="active:scale-95 transition-all duration-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground">{collection.count} places</p>
                    </div>
                  </div>
                  <Badge className={collection.color}>
                    {collection.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Saved Shops */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recently Saved</h2>
          <div className="space-y-4">
            {savedShops.map((shop) => (
              <Card key={shop.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{shop.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{shop.rating}</span>
                            <span>•</span>
                            <span>{shop.distance}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{shop.address}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <Button variant="ghost" size="sm" className="p-2 h-auto">
                            <Navigation className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2 h-auto text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 mb-2">
                        {shop.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Saved {shop.savedDate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button variant="mobile" className="w-full">
            <Heart className="w-5 h-5 mr-2" />
            Create New Collection
          </Button>
          <Button variant="outline" className="w-full">
            Import from Maps
          </Button>
        </div>
      </div>

      <div className="h-20" />
      <MobileBottomNav />
    </div>
  );
};

export default SavedPage;