import { useState } from "react";
import { Search, ChevronDown, ChevronRight, ShieldBan, Trash2, X, AlertTriangle } from "lucide-react";
import { owners, properties, type Owner } from "@/data/sampleData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type StatusFilter = "all" | "active" | "blocked" | "deleted";

const statusBadge: Record<Owner["status"], { label: string; className: string }> = {
  active: { label: "Actif", className: "bg-success/15 text-success border-success/30" },
  blocked: { label: "Bloqué", className: "bg-warning/15 text-warning border-warning/30" },
  deleted: { label: "Supprimé", className: "bg-destructive/15 text-destructive border-destructive/30" },
};

const propertyStatusLabel: Record<string, { label: string; className: string }> = {
  active: { label: "Disponible", className: "bg-success/15 text-success" },
  inactive: { label: "Inactif", className: "bg-muted text-muted-foreground" },
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [ownerList, setOwnerList] = useState(owners);

  // Block modal
  const [blockTarget, setBlockTarget] = useState<Owner | null>(null);
  const [blockReason, setBlockReason] = useState("");
  const [blockDuration, setBlockDuration] = useState("7");

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<Owner | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");

  const filtered = ownerList.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        `${o.firstName} ${o.lastName}`.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleBlock = () => {
    if (!blockTarget) return;
    setOwnerList((prev) =>
      prev.map((o) =>
        o.id === blockTarget.id
          ? { ...o, status: "blocked" as const, blockReason, blockUntil: `+${blockDuration}j` }
          : o
      )
    );
    setBlockTarget(null);
    setBlockReason("");
    setBlockDuration("7");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setOwnerList((prev) =>
      prev.map((o) => (o.id === deleteTarget.id ? { ...o, status: "deleted" as const } : o))
    );
    setDeleteTarget(null);
    setDeleteConfirmName("");
  };

  const getOwnerProperties = (propertyIds: string[]) =>
    propertyIds.map((pid) => properties.find((p) => p.id === pid)).filter(Boolean);

  const counts = {
    all: ownerList.length,
    active: ownerList.filter((o) => o.status === "active").length,
    blocked: ownerList.filter((o) => o.status === "blocked").length,
    deleted: ownerList.filter((o) => o.status === "deleted").length,
  };

  const filters: { key: StatusFilter; label: string }[] = [
    { key: "all", label: `Tous (${counts.all})` },
    { key: "active", label: `Actifs (${counts.active})` },
    { key: "blocked", label: `Bloqués (${counts.blocked})` },
    { key: "deleted", label: `Supprimés (${counts.deleted})` },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gestion des propriétaires</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Supervisez et gérez tous les propriétaires inscrits sur la plateforme
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email ou ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.key)}
              className="text-xs"
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-10"></TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Propriétaire</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Téléphone</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-center">Logements</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Inscription</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Statut</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  Aucun propriétaire trouvé
                </TableCell>
              </TableRow>
            )}
            {filtered.map((owner) => {
              const isExpanded = expandedId === owner.id;
              const ownerProps = getOwnerProperties(owner.propertyIds);
              const badge = statusBadge[owner.status];

              return (
                <>
                  <TableRow
                    key={owner.id}
                    className="cursor-pointer group"
                    onClick={() => setExpandedId(isExpanded ? null : owner.id)}
                  >
                    <TableCell className="w-10">
                      {ownerProps.length > 0 ? (
                        isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )
                      ) : null}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{owner.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {owner.firstName} {owner.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{owner.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                      {owner.phone}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {owner.propertyIds.length}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">
                      {new Date(owner.registrationDate).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${badge.className}`}>
                        {badge.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        {owner.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 border-warning/40 text-warning hover:bg-warning/10 hover:text-warning"
                            onClick={() => setBlockTarget(owner)}
                          >
                            <ShieldBan className="w-3.5 h-3.5 mr-1" />
                            Bloquer
                          </Button>
                        )}
                        {owner.status !== "deleted" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => setDeleteTarget(owner)}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Supprimer
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded property details */}
                  {isExpanded && ownerProps.length > 0 && (
                    <TableRow key={`${owner.id}-details`} className="hover:bg-transparent">
                      <TableCell colSpan={8} className="p-0">
                        <div className="bg-muted/30 border-t border-border px-8 py-4">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Logements de {owner.firstName} {owner.lastName}
                          </p>
                          <div className="grid gap-2">
                            {ownerProps.map((p) => {
                              if (!p) return null;
                              const pStatus = propertyStatusLabel[p.status] || propertyStatusLabel.inactive;
                              return (
                                <div
                                  key={p.id}
                                  className="flex items-center justify-between bg-card rounded-lg px-4 py-3 border border-border"
                                >
                                  <div className="flex items-center gap-4">
                                    <span className="font-mono text-xs text-muted-foreground">{p.id}</span>
                                    <div>
                                      <p className="text-sm font-medium text-foreground">{p.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {p.address}, {p.city}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <span className="text-xs text-muted-foreground capitalize">{p.type}</span>
                                    <span className="text-sm font-semibold text-foreground">€{p.price}/nuit</span>
                                    <Badge variant="outline" className={`text-xs ${pStatus.className}`}>
                                      {pStatus.label}
                                    </Badge>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Block Modal */}
      <Dialog open={!!blockTarget} onOpenChange={() => setBlockTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldBan className="w-5 h-5 text-warning" />
              Bloquer {blockTarget?.firstName} {blockTarget?.lastName}
            </DialogTitle>
            <DialogDescription>
              Le propriétaire ne pourra plus se connecter ni gérer ses logements pendant la durée du blocage.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Raison du blocage</label>
              <Textarea
                placeholder="Décrivez la raison du blocage..."
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Durée du blocage</label>
              <Select value={blockDuration} onValueChange={setBlockDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 jour</SelectItem>
                  <SelectItem value="7">1 semaine</SelectItem>
                  <SelectItem value="30">1 mois</SelectItem>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockTarget(null)}>
              Annuler
            </Button>
            <Button
              onClick={handleBlock}
              disabled={!blockReason.trim()}
              className="bg-warning text-warning-foreground hover:bg-warning/90"
            >
              Confirmer le blocage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Supprimer définitivement
            </DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Toutes les données liées à{" "}
              <strong>
                {deleteTarget?.firstName} {deleteTarget?.lastName}
              </strong>{" "}
              seront supprimées.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Saisissez «{" "}
              <span className="font-bold">
                {deleteTarget?.firstName} {deleteTarget?.lastName}
              </span>{" "}
              » pour confirmer
            </label>
            <Input
              value={deleteConfirmName}
              onChange={(e) => setDeleteConfirmName(e.target.value)}
              placeholder="Nom complet du propriétaire"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={
                deleteConfirmName !== `${deleteTarget?.firstName} ${deleteTarget?.lastName}`
              }
            >
              Confirmer la suppression
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
