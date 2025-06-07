
import { BookmarkCard } from "@/components/BookmarkCard";
import { AISuggestions } from "@/components/AISuggestions";

interface MainContentProps {
  searchQuery: string;
  viewMode: "grid" | "list";
}

const mockBookmarks = [
  {
    id: "1",
    title: "React Documentation",
    description: "The official React documentation with guides and API reference",
    url: "https://react.dev",
    favicon: "🔷",
    tags: ["React", "Documentation"],
    pinned: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Tailwind CSS",
    description: "A utility-first CSS framework for rapidly building custom user interfaces",
    url: "https://tailwindcss.com",
    favicon: "💨",
    tags: ["CSS", "Framework"],
    pinned: false,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    description: "The TypeScript Handbook is a comprehensive guide to the TypeScript language",
    url: "https://typescriptlang.org",
    favicon: "📘",
    tags: ["TypeScript", "Programming"],
    pinned: true,
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    title: "Figma Design System",
    description: "Building and maintaining design systems in Figma",
    url: "https://figma.com",
    favicon: "🎨",
    tags: ["Design", "UI/UX"],
    pinned: false,
    createdAt: "2024-01-12",
  },
];

export function MainContent({ searchQuery, viewMode }: MainContentProps) {
  const filteredBookmarks = mockBookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pinnedBookmarks = filteredBookmarks.filter(b => b.pinned);
  const recentBookmarks = filteredBookmarks.slice().sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 6);

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <AISuggestions />
        
        {pinnedBookmarks.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              📌 Pinned
            </h2>
            <div className={`grid gap-4 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {pinnedBookmarks.map((bookmark) => (
                <BookmarkCard 
                  key={bookmark.id} 
                  bookmark={bookmark} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            🕒 Recently Accessed
          </h2>
          <div className={`grid gap-4 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {recentBookmarks.map((bookmark) => (
              <BookmarkCard 
                key={bookmark.id} 
                bookmark={bookmark} 
                viewMode={viewMode}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            📚 All Bookmarks
          </h2>
          <div className={`grid gap-4 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredBookmarks.map((bookmark) => (
              <BookmarkCard 
                key={bookmark.id} 
                bookmark={bookmark} 
                viewMode={viewMode}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
