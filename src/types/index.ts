export type LocationHub = 'Bhimavaram' | 'Vijayawada' | 'Guntur' | 'Hyderabad' | 'Other';

export type ProduceType = 'Tomato' | 'Mango' | 'Banana' | 'Leafy vegetables' | 'Other';

export type UserRole = 'Farmer' | 'Vendor' | 'Aggregator' | 'Other';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  location: LocationHub;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  location: LocationHub;
  produce: ProduceType;
  customProduce?: string;
  crates: number;
  durationDays: number;
  pickupRequired: boolean;
  deliveryRequired: boolean;
  pickupAddress?: string;
  deliveryAddress?: string;
  crateRate: number; // ₹500
  logisticsFee: number;
  totalAmount: number;
  status: 'Stored Safely' | 'Ready for Pickup' | 'In Transit' | 'Completed';
  createdAt: string;
  storageUnit: string;
  temperature: number; // e.g. 4.0
  humidity: number; // e.g. 78
  notes?: string;
}

export interface StorageUnit {
  id: string;
  name: string;
  hub: LocationHub;
  capacityCrates: number;
  occupiedCrates: number;
  temperature: number;
  humidity: number;
  solarStatus: 'Solar Active' | 'Battery Active' | 'Hybrid';
  status: 'Normal' | 'Near Capacity' | 'Maintenance';
}

export interface TrackingStep {
  title: string;
  subtitle: string;
  timestamp?: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface DeliveryTracking {
  bookingId: string;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  vehicleType?: string;
  pickupTimeline: TrackingStep[];
  deliveryTimeline: TrackingStep[];
}
