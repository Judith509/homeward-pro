import { Link } from "react-router-dom";
import { Search, MapPin, Users, Star, CalendarDays, Building, Globe, SmilePlus } from "lucide-react";
import { properties, reviews } from "@/data/sampleData";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/hero-landing.jpg";

const typeLabels: Record<string, string> = { apartment: "Appartement", villa: "Villa", studio: "Studio", house: "Maison" };

const getAvgRating = (propId: string) => {
  const r = reviews.filter((rev) => rev.propertyId === propId);
  if (!r.length) return null;
  return (r.reduce((s, rev) => s + rev.rating, 0) / r.length).toFixed(1);
};

const stats = [
  { icon: Building, value: "500+", label: "Logements disponibles" },
  { icon: SmilePlus, value: "1 000+", label: "Voyageurs satisfaits" },
  { icon: Globe, value: "50+", label: "Villes couvertes" },
  { icon: Star, value: "4.8/5", label: "Note moyenne" },
];

export default function LandingPage() {
  const popularProperties = properties.filter((p) => p.status === "active");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="RentEasy" className="w-9 h-9 rounded-lg" />
            <span className="text-xl font-bold text-foreground">RentEasy</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Se connecter
            </Link>
            <Link to="/register" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16">
        <div className="relative h-[520px] sm:h-[600px] overflow-hidden">
          <img src={heroImg} alt="Villa de vacances" className="w-full h-full object-cover" width={1920} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
              Trouvez le logement <span className="text-primary-foreground">idéal</span> pour votre séjour
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-xl">
              Appartements, villas et studios dans les plus belles villes de France
            </p>

            {/* Search Bar */}
            <div className="mt-8 w-full max-w-3xl bg-card rounded-2xl p-3 shadow-xl flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-xl">
                <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                <input placeholder="Destination" className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-xl">
                <CalendarDays className="w-5 h-5 text-muted-foreground shrink-0" />
                <input placeholder="Dates" className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-xl">
                <Users className="w-5 h-5 text-muted-foreground shrink-0" />
                <input placeholder="Voyageurs" className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground" />
              </div>
              <Link to="/login" className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shrink-0">
                <Search className="w-4 h-4" /> Rechercher
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Logements populaires</h2>
          <p className="text-muted-foreground mt-2">Nos logements les mieux notés par les voyageurs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProperties.map((p) => {
            const rating = getAvgRating(p.id);
            return (
              <div key={p.id} className="glass-card overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-card/90 backdrop-blur-sm rounded-md text-xs font-medium text-foreground">
                    {typeLabels[p.type]}
                  </span>
                  {rating && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-card/90 backdrop-blur-sm rounded-md text-xs font-medium text-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-warning text-warning" /> {rating}
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-3.5 h-3.5" /> {p.city}, {p.country}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="text-lg font-bold text-primary">
                      €{p.price}<span className="text-sm font-normal text-muted-foreground">/nuit</span>
                    </div>
                    <Link to="/login" className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity">
                      Réserver
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="w-8 h-8 text-primary-foreground/70 mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-extrabold text-primary-foreground">{s.value}</div>
                <div className="text-sm text-primary-foreground/70 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="RentEasy" className="w-8 h-8 rounded-lg" />
                <span className="text-lg font-bold text-foreground">RentEasy</span>
              </div>
              <p className="text-sm text-muted-foreground">La plateforme de location courte durée simple et moderne.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Découvrir</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/login" className="hover:text-primary transition-colors">Logements</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Destinations</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Avis voyageurs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Propriétaires</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/register" className="hover:text-primary transition-colors">Devenir hôte</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Gestion des logements</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Aide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Suivez-nous</h4>
              <div className="flex gap-3">
                {["Facebook", "Instagram", "Twitter"].map((social) => (
                  <span key={social} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    {social[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
            © 2026 RentEasy. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
