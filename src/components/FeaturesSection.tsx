import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Zap, Volume2, Utensils, Car, Clock } from "lucide-react";

const features = [
  {
    icon: Wifi,
    title: "Reliable WiFi",
    description: "Verified internet speeds and connectivity ratings from real users",
    color: "text-blue-600"
  },
  {
    icon: Zap,
    title: "Power Outlets",
    description: "Guaranteed seating near charging stations for your devices",
    color: "text-yellow-600"
  },
  {
    icon: Volume2,
    title: "Noise Levels",
    description: "Real-time noise ratings to match your concentration needs",
    color: "text-purple-600"
  },
  {
    icon: Utensils,
    title: "Food & Drinks",
    description: "Quality coffee, snacks, and meal options to fuel your work",
    color: "text-orange-600"
  },
  {
    icon: Car,
    title: "Parking Available",
    description: "Easy parking options and accessibility information",
    color: "text-green-600"
  },
  {
    icon: Clock,
    title: "Hours & Availability",
    description: "Real-time updates on hours, capacity, and peak times",
    color: "text-red-600"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Why Choose Bean There
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Everything Remote Workers Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We understand what makes a coffee shop perfect for work. Our platform tracks the details that matter most to your productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-secondary ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;