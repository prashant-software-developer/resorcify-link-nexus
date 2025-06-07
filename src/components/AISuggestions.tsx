
import { Sparkles, TrendingUp, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const suggestions = [
  {
    id: 1,
    title: "New React 19 Features",
    description: "Explore the latest React 19 features and improvements",
    url: "https://react.dev/blog/2024/12/05/react-19",
    reason: "Based on your React bookmarks",
    icon: "⚛️",
    type: "trending",
  },
  {
    id: 2,
    title: "CSS Grid Guide 2024",
    description: "Complete guide to CSS Grid layout with modern examples",
    url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    reason: "Popular in web development",
    icon: "🎨",
    type: "popular",
  },
  {
    id: 3,
    title: "TypeScript 5.3 Release",
    description: "What's new in TypeScript 5.3 with practical examples",
    url: "https://devblogs.microsoft.com/typescript/",
    reason: "Related to your TypeScript collection",
    icon: "📘",
    type: "related",
  },
];

export function AISuggestions() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      case 'popular':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'related':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-slate-900">AI Suggestions</h2>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          New
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion) => (
          <Card 
            key={suggestion.id} 
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-purple-200"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">{suggestion.icon}</div>
                <div className="flex items-center gap-1">
                  {getIcon(suggestion.type)}
                </div>
              </div>
              
              <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
                {suggestion.title}
              </h3>
              
              <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                {suggestion.description}
              </p>
              
              <div className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full border border-slate-200">
                {suggestion.reason}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
