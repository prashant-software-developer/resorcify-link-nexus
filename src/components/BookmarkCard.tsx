
import { Pin, Share, Edit, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Bookmark {
  id: string;
  title: string;
  description: string;
  url: string;
  favicon: string;
  tags: string[];
  pinned: boolean;
  createdAt: string;
}

interface BookmarkCardProps {
  bookmark: Bookmark;
  viewMode: "grid" | "list";
}

export function BookmarkCard({ bookmark, viewMode }: BookmarkCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-all duration-200 border-slate-200 bg-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl">{bookmark.favicon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">{bookmark.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-1 mt-1">{bookmark.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {bookmark.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pin className={`w-4 h-4 ${bookmark.pinned ? 'text-purple-600' : 'text-slate-400'}`} />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Share className="w-4 h-4 text-slate-400" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit className="w-4 h-4 text-slate-400" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-slate-200 bg-white hover:border-purple-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="text-2xl">{bookmark.favicon}</div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
              <Pin className={`w-4 h-4 ${bookmark.pinned ? 'text-purple-600' : 'text-slate-400'}`} />
            </Button>
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
              <Share className="w-4 h-4 text-slate-400" />
            </Button>
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
              <Edit className="w-4 h-4 text-slate-400" />
            </Button>
          </div>
        </div>
        
        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
          {bookmark.title}
        </h3>
        
        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
          {bookmark.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {bookmark.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {bookmark.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{bookmark.tags.length - 2}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{new Date(bookmark.createdAt).toLocaleDateString()}</span>
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardContent>
    </Card>
  );
}
