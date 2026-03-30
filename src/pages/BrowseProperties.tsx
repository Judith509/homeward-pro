import { useState } from "react";
import { MapPin, Users, Star, Search, SlidersHorizontal, Bed, Bath, Maximize2 } from "lucide-react";
import { properties, reviews } from "@/data/sampleData";
import PropertyDetail from "./PropertyDetail";
import type { Property } from "@/data/sampleData";

const typeLabels: Record<string, string> = {
  apartment: "Appartement",
  villa: "Villa",
  studio: "Studio",
  house: "Maison",
};

const typeFilters = ["all", "apartment", "villa", "studio", "house"] as const;

export default function BrowseProperties() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filtered = properties
    .filter((p) => p.status === "active")
    .filter((p) => typeFilter === "all" || p.type === typeFilter)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.city.toLowerCase().includes(searchQuery.toLowerCase()));

  const getAvgRating = (propId: string) => {
    const propReviews = reviews.filter((r) => r.propertyId === propId);
    if (propReviews.length === 0) return null;
    return (propReviews.reduce((s, r) => s + r.rating, 0) / propReviews.length).toFixed(1);
  };

  if (selectedProperty) {
    return <PropertyDetail property={selectedProperty} onBack={() => setSelectedProperty(null)} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Explorer les logements</h1>
        <p className="text-muted-foreground text-sm mt-1">Trouvez le logement idéal pour votre séjour</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Rechercher par nom ou ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          {typeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === t ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {t === "all" ? "Tous" : typeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((p) => {
          const rating = getAvgRating(p.id);
          return (
            <div key={p.id} className="glass-card overflow-hidden group cursor-pointer" onClick={() => setSelectedProperty(p)}>
              <div className="relative h-48 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <span className="absolute top-3 left-3 px-2 py-1 bg-card/90 backdrop-blur-sm rounded-md text-xs font-medium text-foreground">
                  {typeLabels[p.type]}
                </span>
                {rating && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-card/90 backdrop-blur-sm rounded-md text-xs font-medium text-foreground flex items-center gap-1">
                    <Star className="w-3 h-3 text-warning fill-warning" /> {rating}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {p.city}, {p.country}
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {p.bedrooms}</span>
                  <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {p.bathrooms}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {p.capacity}</span>
                  <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {p.surface}m²</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-1">
                    {p.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md">{a}</span>
                    ))}
                  </div>
                  <div className="text-lg font-bold text-primary">€{p.price}<span className="text-sm font-normal text-muted-foreground">/nuit</span></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">Aucun logement trouvé</p>
          <p className="text-sm mt-1">Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
}
