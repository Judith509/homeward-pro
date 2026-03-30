import { Star } from "lucide-react";
import { reviews } from "@/data/sampleData";

// Reviews by client1 (Sophie Martin)
const myReviews = reviews.filter((r) => r.clientId === "client1");

export default function MyReviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mes avis</h1>
        <p className="text-muted-foreground text-sm mt-1">{myReviews.length} avis laissé(s)</p>
      </div>

      {myReviews.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">Aucun avis</p>
          <p className="text-sm mt-1">Vous pourrez laisser un avis après votre séjour.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myReviews.map((rev) => (
            <div key={rev.id} className="glass-card p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{rev.propertyName}</h3>
                <span className="text-xs text-muted-foreground">{rev.date}</span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < rev.rating ? "text-warning fill-warning" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{rev.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
