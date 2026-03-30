import { MapPin, Users, Plus, Eye, ToggleLeft, ToggleRight, Bed, Bath, Maximize2 } from "lucide-react";
import { properties } from "@/data/sampleData";

const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
};

const typeLabels: Record<string, string> = {
  apartment: "Appartement",
  villa: "Villa",
  studio: "Studio",
  house: "Maison",
};

export default function Properties() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Logements</h1>
          <p className="text-muted-foreground text-sm mt-1">{properties.length} logements gérés</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Ajouter un logement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p.id} className="glass-card overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <span className={`status-badge absolute top-3 right-3 ${statusColors[p.status]}`}>
                {p.status === "active" ? <ToggleRight className="w-3 h-3 mr-1" /> : <ToggleLeft className="w-3 h-3 mr-1" />}
                {p.status === "active" ? "Actif" : "Inactif"}
              </span>
              <span className="absolute top-3 left-3 px-2 py-1 bg-card/90 backdrop-blur-sm rounded-md text-xs font-medium text-foreground">
                {typeLabels[p.type]}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin className="w-3.5 h-3.5" /> {p.city}, {p.country}
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {p.bedrooms}</span>
                <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {p.bathrooms}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {p.capacity}</span>
                <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {p.surface}m²</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-1.5">
                  {p.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md">{a}</span>
                  ))}
                  {p.amenities.length > 3 && <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded-md">+{p.amenities.length - 3}</span>}
                </div>
                <div className="text-lg font-bold text-primary">€{p.price}<span className="text-sm font-normal text-muted-foreground">/nuit</span></div>
              </div>
              <button className="flex items-center gap-2 mt-4 text-sm text-primary font-medium hover:opacity-80 transition-opacity">
                <Eye className="w-4 h-4" /> Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
