"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BlogFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  type: string | null;
  setType: (v: string | null) => void;
  tag: string | null;
  setTag: (v: string | null) => void;
  uniqueTypes: string[];
  uniqueTags: string[];
}

export default function BlogFilters({
  search,
  setSearch,
  type,
  setType,
  tag,
  setTag,
  uniqueTypes,
  uniqueTags,
}: BlogFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
      <Input
        placeholder="Search blog or workshop..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />
      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant={!type ? "default" : "outline"}
          onClick={() => setType(null)}
        >
          All
        </Button>
        {uniqueTypes.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={type === t ? "default" : "outline"}
            onClick={() => setType(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant={!tag ? "default" : "outline"}
          onClick={() => setTag(null)}
        >
          All Tags
        </Button>
        {uniqueTags.map((tg) => (
          <Button
            key={tg}
            size="sm"
            variant={tag === tg ? "default" : "outline"}
            onClick={() => setTag(tg)}
          >
            {tg}
          </Button>
        ))}
      </div>
    </div>
  );
}
