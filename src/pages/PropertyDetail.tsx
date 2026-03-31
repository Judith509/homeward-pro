import { useState } from "react";
import { ArrowLeft, MapPin, Users, Bed, Bath, Maximize2, Star, Check, CalendarDays, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Property } from "@/data/sampleData";
import { reviews } from "@/data/sampleData";

interface Props {
  property: Property;
  onBack: () => void;
}

export default function PropertyDetail({ property, onBack }: Props) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [booked, setBooked] = useState(false);

  const propReviews = reviews.filter((r) => r.propertyId === property.id);
  const avgRating = propReviews.length > 0 ? (propReviews.reduce((s, r) => s + r.rating, 0) / propReviews.length).toFixed(1) : null;

  const nights = checkIn && checkOut ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 0;
  const total = nights * property.price;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-primary hover:opacity-80">
        <ArrowLeft className="w-4 h-4" /> Retour aux résultats
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl overflow-hidden h-72">
            <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{property.name}</h1>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                  <MapPin className="w-4 h-4" /> {property.address}, {property.city}
                </div>
              </div>
              {avgRating && (
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="w-4 h-4 text-warning fill-warning" /> {avgRating} ({propReviews.length} avis)
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {property.bedrooms} chambres</span>
              <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {property.bathrooms} SDB</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {property.capacity} voyageurs</span>
              <span className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4" /> {property.surface}m²</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{property.description}</p>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Équipements</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-success" /> {a}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {propReviews.length > 0 && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Avis ({propReviews.length})</h2>
              <div className="space-y-4">
                {propReviews.map((rev) => (
                  <div key={rev.id} className="pb-4 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                        {rev.clientName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{rev.clientName}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? "text-warning fill-warning" : "text-muted"}`} />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">{rev.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Booking */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <div className="text-2xl font-bold text-primary mb-1">€{property.price}<span className="text-sm font-normal text-muted-foreground">/nuit</span></div>
            {property.cleaningIncluded && <p className="text-xs text-success mb-4">Ménage inclus</p>}

            {booked ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-success" />
                </div>
                <p className="text-lg font-semibold text-foreground">Réservation confirmée !</p>
                <p className="text-sm text-muted-foreground mt-1">Un email de confirmation vous a été envoyé.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Arrivée</label>
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full px-3 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Départ</label>
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full px-3 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Voyageurs</label>
                  <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full px-3 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground">
                    {Array.from({ length: property.capacity }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} voyageur{i > 0 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>

                {nights > 0 && (
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">€{property.price} × {nights} nuits</span>
                      <span className="text-foreground">€{total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frais de service</span>
                      <span className="text-foreground">€{Math.round(total * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border">
                      <span>Total</span>
                      <span>€{total + Math.round(total * 0.1)}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setBooked(true)}
                  disabled={nights <= 0}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CalendarDays className="w-4 h-4" /> Réserver
                </button>
                <button
                  onClick={() => navigate(`/client-messages?property=${property.id}`)}
                  className="w-full py-3 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors border border-border flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Contacter le propriétaire
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
