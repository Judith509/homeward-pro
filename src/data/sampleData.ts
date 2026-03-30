import propertyParis from "@/assets/property-paris.jpg";
import propertyNice from "@/assets/property-nice.jpg";
import propertyLyon from "@/assets/property-lyon.jpg";

export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  capacity: number;
  status: "active" | "inactive";
  image: string;
  description: string;
  amenities: string[];
}

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  propertyId: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  guests: number;
}

export interface CleaningTask {
  id: string;
  propertyId: string;
  propertyName: string;
  reservationId: string;
  assignee: string;
  scheduledDate: string;
  status: "todo" | "in_progress" | "done";
}

export interface Message {
  id: string;
  title: string;
  body: string;
  type: "check-in" | "welcome" | "checkout" | "custom";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "cleaner";
  avatar: string;
  status: "active" | "inactive";
}

export const properties: Property[] = [
  {
    id: "p1",
    name: "Appartement Haussmannien",
    location: "Paris, 8ème",
    price: 185,
    capacity: 4,
    status: "active",
    image: propertyParis,
    description: "Magnifique appartement au cœur de Paris avec vue sur les toits.",
    amenities: ["WiFi", "Kitchen", "Washer", "AC", "TV", "Elevator"],
  },
  {
    id: "p2",
    name: "Villa Méditerranée",
    location: "Nice, Côte d'Azur",
    price: 320,
    capacity: 8,
    status: "active",
    image: propertyNice,
    description: "Villa spacieuse avec piscine privée et vue mer.",
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Garden", "BBQ"],
  },
  {
    id: "p3",
    name: "Studio Presqu'île",
    location: "Lyon, 2ème",
    price: 95,
    capacity: 2,
    status: "inactive",
    image: propertyLyon,
    description: "Studio cosy idéalement situé en plein centre de Lyon.",
    amenities: ["WiFi", "Kitchen", "Washer", "TV"],
  },
];

export const reservations: Reservation[] = [
  { id: "r1", guestName: "Sophie Martin", guestEmail: "sophie@email.com", propertyId: "p1", propertyName: "Appartement Haussmannien", checkIn: "2026-04-02", checkOut: "2026-04-06", totalPrice: 740, status: "confirmed", guests: 2 },
  { id: "r2", guestName: "James Wilson", guestEmail: "james@email.com", propertyId: "p2", propertyName: "Villa Méditerranée", checkIn: "2026-04-05", checkOut: "2026-04-12", totalPrice: 2240, status: "pending", guests: 6 },
  { id: "r3", guestName: "Marie Dupont", guestEmail: "marie@email.com", propertyId: "p1", propertyName: "Appartement Haussmannien", checkIn: "2026-04-10", checkOut: "2026-04-13", totalPrice: 555, status: "confirmed", guests: 3 },
  { id: "r4", guestName: "Tom Anderson", guestEmail: "tom@email.com", propertyId: "p3", propertyName: "Studio Presqu'île", checkIn: "2026-03-28", checkOut: "2026-03-31", totalPrice: 285, status: "completed", guests: 1 },
  { id: "r5", guestName: "Elena Rossi", guestEmail: "elena@email.com", propertyId: "p2", propertyName: "Villa Méditerranée", checkIn: "2026-04-15", checkOut: "2026-04-20", totalPrice: 1600, status: "cancelled", guests: 4 },
];

export const cleaningTasks: CleaningTask[] = [
  { id: "c1", propertyId: "p1", propertyName: "Appartement Haussmannien", reservationId: "r1", assignee: "Claire Petit", scheduledDate: "2026-04-06", status: "todo" },
  { id: "c2", propertyId: "p3", propertyName: "Studio Presqu'île", reservationId: "r4", assignee: "Marc Leroy", scheduledDate: "2026-03-31", status: "done" },
  { id: "c3", propertyId: "p2", propertyName: "Villa Méditerranée", reservationId: "r2", assignee: "Claire Petit", scheduledDate: "2026-04-12", status: "todo" },
  { id: "c4", propertyId: "p1", propertyName: "Appartement Haussmannien", reservationId: "r3", assignee: "Marc Leroy", scheduledDate: "2026-04-13", status: "in_progress" },
];

export const messageTemplates: Message[] = [
  { id: "m1", title: "Instructions d'arrivée", body: "Bonjour ! Voici les instructions pour votre arrivée. Le code d'entrée est 4589B. Les clés se trouvent dans la boîte à clés à gauche de la porte.", type: "check-in" },
  { id: "m2", title: "Message de bienvenue", body: "Bienvenue dans votre logement ! Nous espérons que vous passerez un excellent séjour. N'hésitez pas à nous contacter pour toute question.", type: "welcome" },
  { id: "m3", title: "Rappel de départ", body: "Votre séjour se termine demain. Merci de laisser les clés sur la table et de sortir avant 11h. Merci et à bientôt !", type: "checkout" },
];

export const users: User[] = [
  { id: "u1", name: "Jean Dupont", email: "jean@renteasy.com", role: "admin", avatar: "JD", status: "active" },
  { id: "u2", name: "Claire Petit", email: "claire@renteasy.com", role: "cleaner", avatar: "CP", status: "active" },
  { id: "u3", name: "Marc Leroy", email: "marc@renteasy.com", role: "cleaner", avatar: "ML", status: "active" },
  { id: "u4", name: "Anne Martin", email: "anne@renteasy.com", role: "manager", avatar: "AM", status: "inactive" },
];
