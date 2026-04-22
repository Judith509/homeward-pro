import { useState } from "react";
import { MapPin, Users, Plus, Eye, ToggleLeft, ToggleRight, Bed, Bath, Maximize2 } from "lucide-react";
import { properties as initialProperties, allAmenities, type Property } from "@/data/sampleData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import propertyParis from "@/assets/property-paris.jpg";

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

const emptyForm = {
  name: "",
  address: "",
  city: "",
  country: "France",
  price: "",
  capacity: "",
  bedrooms: "",
  bathrooms: "",
  surface: "",
  type: "apartment" as Property["type"],
  description: "",
  amenities: [] as string[],
};

export default function Properties() {
  const [items, setItems] = useState<Property[]>(initialProperties);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.price) {
      toast.error("Merci de remplir les champs obligatoires");
      return;
    }
    const newProperty: Property = {
      id: `p${Date.now()}`,
      name: form.name.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      country: form.country.trim() || "France",
      price: Number(form.price) || 0,
      capacity: Number(form.capacity) || 1,
      bedrooms: Number(form.bedrooms) || 1,
      bathrooms: Number(form.bathrooms) || 1,
      surface: Number(form.surface) || 0,
      type: form.type,
      status: "active",
      image: propertyParis,
      photos: [propertyParis],
      description: form.description.trim(),
      amenities: form.amenities,
      cleaningIncluded: true,
      ownerId: "owner1",
    };
    setItems((prev) => [newProperty, ...prev]);
    setForm(emptyForm);
    setOpen(false);
    toast.success("Logement ajouté avec succès");
  };

  const toggleAmenity = (a: string) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Logements</h1>
          <p className="text-muted-foreground text-sm mt-1">{items.length} logements gérés</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Ajouter un logement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((p) => (
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter un logement</DialogTitle>
            <DialogDescription>Renseignez les informations de votre nouveau logement.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="name">Nom du logement *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex : Appartement vue mer" maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as Property["type"] })}>
                  <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="house">Maison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Prix par nuit (€) *</Label>
                <Input id="price" type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} maxLength={200} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} maxLength={80} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input id="country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} maxLength={80} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité (voyageurs)</Label>
                <Input id="capacity" type="number" min="1" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surface">Surface (m²)</Label>
                <Input id="surface" type="number" min="0" value={form.surface} onChange={(e) => setForm({ ...form, surface: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Chambres</Label>
                <Input id="bedrooms" type="number" min="0" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Salles de bain</Label>
                <Input id="bathrooms" type="number" min="0" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} maxLength={500} />
            </div>
            <div className="space-y-2">
              <Label>Équipements</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-border rounded-md">
                {allAmenities.map((a) => (
                  <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={form.amenities.includes(a)} onCheckedChange={() => toggleAmenity(a)} />
                    <span>{a}</span>
                  </label>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button type="submit">Ajouter le logement</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
