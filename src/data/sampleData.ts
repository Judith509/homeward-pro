import propertyParis from "@/assets/property-paris.jpg";
import propertyNice from "@/assets/property-nice.jpg";
import propertyLyon from "@/assets/property-lyon.jpg";

export type UserRole = "admin" | "owner" | "client";

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  price: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  type: "apartment" | "villa" | "studio" | "house";
  status: "active" | "inactive";
  image: string;
  photos: string[];
  description: string;
  amenities: string[];
  cleaningIncluded: boolean;
  ownerId: string;
}

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestId: string;
  propertyId: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  guests: number;
  bookingDate: string;
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

export interface Review {
  id: string;
  propertyId: string;
  propertyName: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
}

export const allAmenities = [
  "Wi-Fi", "Cuisine", "Four", "Machine à laver", "Sèche-linge",
  "Climatisation", "Chauffage", "Cafetière", "Télévision",
  "Jardin", "Ascenseur", "Animaux acceptés", "Piscine", "Parking", "BBQ",
];

export const properties: Property[] = [
  {
    id: "p1",
    name: "Appartement Haussmannien",
    address: "15 Rue de Rivoli",
    city: "Paris",
    country: "France",
    price: 185,
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    surface: 75,
    type: "apartment",
    status: "active",
    image: propertyParis,
    photos: [propertyParis],
    description: "Magnifique appartement au cœur de Paris avec vue sur les toits. Idéalement situé dans le 8ème arrondissement.",
    amenities: ["Wi-Fi", "Cuisine", "Machine à laver", "Climatisation", "Télévision", "Ascenseur"],
    cleaningIncluded: true,
    ownerId: "owner1",
  },
  {
    id: "p2",
    name: "Villa Méditerranée",
    address: "42 Promenade des Anglais",
    city: "Nice",
    country: "France",
    price: 320,
    capacity: 8,
    bedrooms: 4,
    bathrooms: 3,
    surface: 200,
    type: "villa",
    status: "active",
    image: propertyNice,
    photos: [propertyNice],
    description: "Villa spacieuse avec piscine privée et vue mer sur la Côte d'Azur.",
    amenities: ["Wi-Fi", "Piscine", "Cuisine", "Parking", "Jardin", "BBQ", "Climatisation"],
    cleaningIncluded: true,
    ownerId: "owner1",
  },
  {
    id: "p3",
    name: "Studio Presqu'île",
    address: "8 Place Bellecour",
    city: "Lyon",
    country: "France",
    price: 95,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    surface: 30,
    type: "studio",
    status: "inactive",
    image: propertyLyon,
    photos: [propertyLyon],
    description: "Studio cosy idéalement situé en plein centre de Lyon.",
    amenities: ["Wi-Fi", "Cuisine", "Machine à laver", "Télévision"],
    cleaningIncluded: false,
    ownerId: "owner1",
  },
];

export const reservations: Reservation[] = [
  { id: "r1", guestName: "Sophie Martin", guestEmail: "sophie@email.com", guestId: "client1", propertyId: "p1", propertyName: "Appartement Haussmannien", checkIn: "2026-04-02", checkOut: "2026-04-06", totalPrice: 740, status: "confirmed", guests: 2, bookingDate: "2026-03-15" },
  { id: "r2", guestName: "James Wilson", guestEmail: "james@email.com", guestId: "client2", propertyId: "p2", propertyName: "Villa Méditerranée", checkIn: "2026-04-05", checkOut: "2026-04-12", totalPrice: 2240, status: "pending", guests: 6, bookingDate: "2026-03-20" },
  { id: "r3", guestName: "Marie Dupont", guestEmail: "marie@email.com", guestId: "client1", propertyId: "p1", propertyName: "Appartement Haussmannien", checkIn: "2026-04-10", checkOut: "2026-04-13", totalPrice: 555, status: "confirmed", guests: 3, bookingDate: "2026-03-22" },
  { id: "r4", guestName: "Tom Anderson", guestEmail: "tom@email.com", guestId: "client3", propertyId: "p3", propertyName: "Studio Presqu'île", checkIn: "2026-03-28", checkOut: "2026-03-31", totalPrice: 285, status: "completed", guests: 1, bookingDate: "2026-03-10" },
  { id: "r5", guestName: "Elena Rossi", guestEmail: "elena@email.com", guestId: "client1", propertyId: "p2", propertyName: "Villa Méditerranée", checkIn: "2026-04-15", checkOut: "2026-04-20", totalPrice: 1600, status: "cancelled", guests: 4, bookingDate: "2026-03-18" },
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

export const reviews: Review[] = [
  { id: "rev1", propertyId: "p1", propertyName: "Appartement Haussmannien", clientId: "client1", clientName: "Sophie Martin", rating: 5, comment: "Superbe appartement, très bien situé. La vue est magnifique ! Tout était propre et conforme à l'annonce.", date: "2026-03-20" },
  { id: "rev2", propertyId: "p2", propertyName: "Villa Méditerranée", clientId: "client3", clientName: "Tom Anderson", rating: 4, comment: "Très belle villa, piscine agréable. Un peu loin du centre-ville mais le cadre est exceptionnel.", date: "2026-03-15" },
  { id: "rev3", propertyId: "p3", propertyName: "Studio Presqu'île", clientId: "client3", clientName: "Tom Anderson", rating: 3, comment: "Studio correct mais un peu petit. Bien situé en revanche.", date: "2026-04-01" },
  { id: "rev4", propertyId: "p1", propertyName: "Appartement Haussmannien", clientId: "client2", clientName: "James Wilson", rating: 5, comment: "Amazing stay! The apartment is even better than the photos. Will definitely come back.", date: "2026-03-25" },
];
