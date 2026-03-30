import { Star } from "lucide-react";
import { reviews, properties } from "@/data/sampleData";

// All reviews for owner's properties
const ownerPropertyIds = properties.filter((p) => p.ownerId === "owner1").map((p) => p.id);
const ownerReviews = reviews.filter((r) => ownerPropertyIds.includes(r.propertyId));
const avgRating = ownerReviews.length > 0 ? (ownerReviews.reduce((s, r) => s + r.rating, 0) / ownerReviews.length).toFixed(1) : "—";

export default function OwnerReviews() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Avis reçus</h1>
          <p className="text-muted-foreground text-sm mt-1">{ownerReviews.length} avis • Note moyenne : {avgRating}/5</p>
        </div>
      </div>

      <div className="space-y-4">
        {ownerReviews.map((rev) => (
          <div key={rev.id} className="glass-card p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{rev.propertyName}</h3>
                <p className="text-sm text-muted-foreground">{rev.clientName} • {rev.date}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < rev.rating ? "text-warning fill-warning" : "text-muted"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
