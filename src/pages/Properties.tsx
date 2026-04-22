import { useState, useRef } from "react";
import { MapPin, Users, Plus, Eye, ToggleLeft, ToggleRight, Bed, Bath, Maximize2, Upload, X, Link as LinkIcon, Pencil } from "lucide-react";
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
  photos: [] as string[],
};

const MAX_PHOTOS = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function Properties() {
  const [items, setItems] = useState<Property[]>(initialProperties);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm(emptyForm);
    setImageUrl("");
    setEditingId(null);
  };

  const openCreate = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (p: Property) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      address: p.address || "",
      city: p.city,
      country: p.country,
      price: String(p.price),
      capacity: String(p.capacity),
      bedrooms: String(p.bedrooms),
      bathrooms: String(p.bathrooms),
      surface: String(p.surface),
      type: p.type,
      description: p.description || "",
      amenities: [...p.amenities],
      photos: [...(p.photos || [p.image])],
    });
    setImageUrl("");
    setOpen(true);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.price) {
      toast.error("Merci de remplir les champs obligatoires");
      return;
    }
    const photos = form.photos.length > 0 ? form.photos : [propertyParis];
    const base = {
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
      image: photos[0],
      photos,
      description: form.description.trim(),
      amenities: form.amenities,
    };

    if (editingId) {
      setItems((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...base } : p)));
      toast.success("Logement mis à jour");
    } else {
      const newProperty: Property = {
        id: `p${Date.now()}`,
        ...base,
        status: "active",
        cleaningIncluded: true,
        ownerId: "owner1",
      };
      setItems((prev) => [newProperty, ...prev]);
      toast.success("Logement ajouté avec succès");
    }
    handleOpenChange(false);
  };

  const toggleAmenity = (a: string) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = MAX_PHOTOS - form.photos.length;
    if (remaining <= 0) {
      toast.error(`Maximum ${MAX_PHOTOS} photos`);
      return;
    }
    const selected = Array.from(files).slice(0, remaining);
    const readers = selected.map((file) => {
      return new Promise<string | null>((resolve) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} n'est pas une image`);
          return resolve(null);
        }
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name} dépasse 5 Mo`);
          return resolve(null);
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      const valid = results.filter((r): r is string => !!r);
      if (valid.length > 0) {
        setForm((f) => ({ ...f, photos: [...f.photos, ...valid] }));
      }
    });
  };

  const addImageUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    try {
      new URL(url);
    } catch {
      toast.error("URL invalide");
      return;
    }
    if (form.photos.length >= MAX_PHOTOS) {
      toast.error(`Maximum ${MAX_PHOTOS} photos`);
      return;
    }
    setForm((f) => ({ ...f, photos: [...f.photos, url] }));
    setImageUrl("");
  };

  const removePhoto = (index: number) => {
    setForm((f) => ({ ...f, photos: f.photos.filter((_, i) => i !== index) }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Logements</h1>
          <p className="text-muted-foreground text-sm mt-1">{items.length} logements gérés</p>
        </div>
        <button
          onClick={openCreate}
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
              <div className="flex items-center justify-between mt-4">
                <button className="flex items-center gap-2 text-sm text-primary font-medium hover:opacity-80 transition-opacity">
                  <Eye className="w-4 h-4" /> Voir détails
                </button>
                <button
                  onClick={() => openEdit(p)}
                  className="flex items-center gap-2 text-sm text-foreground font-medium px-3 py-1.5 rounded-md border border-border hover:bg-accent transition-colors"
                >
                  <Pencil className="w-4 h-4" /> Modifier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Modifier le logement" : "Ajouter un logement"}</DialogTitle>
            <DialogDescription>{editingId ? "Mettez à jour les informations de votre logement." : "Renseignez les informations de votre nouveau logement."}</DialogDescription>
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
              <Label>Photos ({form.photos.length}/{MAX_PHOTOS})</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                  disabled={form.photos.length >= MAX_PHOTOS}
                >
                  <Upload className="w-4 h-4 mr-2" /> Importer des images
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    handleFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="https://exemple.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addImageUrl();
                      }
                    }}
                    className="pl-9"
                  />
                </div>
                <Button type="button" variant="secondary" onClick={addImageUrl} disabled={form.photos.length >= MAX_PHOTOS}>
                  Ajouter
                </Button>
              </div>
              {form.photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                  {form.photos.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-md overflow-hidden border border-border group">
                      <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                      {i === 0 && (
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-[10px] rounded">
                          Principale
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Supprimer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">La première photo est utilisée comme image principale. Max 5 Mo par fichier.</p>
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
