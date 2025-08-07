import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { User, MapPin, Star, Coffee, Settings, Bell, Share, Crown, Calendar, ChevronRight, Heart, Search, Award } from "lucide-react";
const ProfilePage = () => {
  const stats = [{
    label: "Places Visited",
    value: "24",
    icon: MapPin,
    color: "text-blue-600"
  }, {
    label: "Reviews Written",
    value: "12",
    icon: Star,
    color: "text-yellow-600"
  }, {
    label: "Coffee Shops Saved",
    value: "18",
    icon: Heart,
    color: "text-red-600"
  }, {
    label: "Hours Worked",
    value: "127",
    icon: Coffee,
    color: "text-brown-600"
  }];
  const achievements = [{
    name: "Early Bird",
    description: "Visited 5 coffee shops before 8 AM",
    earned: true
  }, {
    name: "WiFi Hunter",
    description: "Found 10 spots with 50+ Mbps",
    earned: true
  }, {
    name: "Review Master",
    description: "Write 20 helpful reviews",
    earned: false
  }, {
    name: "Explorer",
    description: "Visit 50 different locations",
    earned: false
  }];
  const menuItems = [{
    icon: Settings,
    label: "Settings",
    hasChevron: true
  }, {
    icon: Bell,
    label: "Notifications",
    hasChevron: true
  }, {
    icon: Share,
    label: "Invite Friends",
    hasChevron: true
  }, {
    icon: Crown,
    label: "Bean There Pro",
    hasChevron: true,
    highlight: true
  }, {
    icon: Calendar,
    label: "Work History",
    hasChevron: true
  }];
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="px-4 py-8">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary-foreground/20">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold">David Zhang</h1>
              <p className="text-primary-foreground/80">VP, Media & People Operations at VaynerMedia</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Edit
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => <Card key={index}>
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>)}
        </div>

        {/* Achievements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Achievements</h2>
            <Badge variant="outline" className="text-xs">
              2 of 4
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => <Card key={index} className={achievement.earned ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20" : "opacity-60"}>
                <CardContent className="p-3 text-center">
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium text-sm">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-0">
              {[{
              action: "Reviewed",
              place: "The Daily Grind",
              time: "2 hours ago",
              icon: Star
            }, {
              action: "Visited",
              place: "Code & Coffee",
              time: "Yesterday",
              icon: Coffee
            }, {
              action: "Saved",
              place: "Brew & Work",
              time: "3 days ago",
              icon: Heart
            }, {
              action: "Searched",
              place: "Quiet cafes downtown",
              time: "1 week ago",
              icon: Search
            }].map((activity, index) => <div key={index} className="flex items-center gap-3 p-4 border-b border-border last:border-b-0">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span> {activity.place}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>)}
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div>
          <Card>
            <CardContent className="p-0">
              {menuItems.map((item, index) => <div key={index} className={`flex items-center gap-3 p-4 border-b border-border last:border-b-0 active:bg-muted transition-colors ${item.highlight ? "bg-primary/5" : ""}`}>
                  <item.icon className={`w-5 h-5 ${item.highlight ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`flex-1 ${item.highlight ? "text-primary font-medium" : ""}`}>
                    {item.label}
                  </span>
                  {item.highlight && <Badge variant="default" className="text-xs">
                      Pro
                    </Badge>}
                  {item.hasChevron && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>)}
            </CardContent>
          </Card>
        </div>

        {/* Sign Out */}
        <Button variant="outline" className="w-full text-destructive hover:text-destructive">
          Sign Out
        </Button>
      </div>

      <div className="h-20" />
      <MobileBottomNav />
    </div>;
};
export default ProfilePage;