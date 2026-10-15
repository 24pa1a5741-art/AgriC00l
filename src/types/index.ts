export type LocationHub = 'Bhimavaram' | 'Vijayawada' | 'Guntur' | 'Hyderabad' | 'Other';

export type ProduceType = 'Tomato' | 'Mango' | 'Banana' | 'Leafy vegetables' | 'Chili' | 'Papaya' | 'Other';

export type UserRole = 'Farmer' | 'Operator' | 'Vendor' | 'Aggregator' | 'Admin';

export interface UserCredentials {
  email: string;
  password?: string;
  phone: string;
  pin?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  location: LocationHub;
  farmOrBusinessName?: string;
  aadhaarOrGst?: string;
  walletBalance: number; // in INR
  verified: boolean;
  memberSince: string;
  avatarUrl?: string;
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
  shelfLifeRemainingDays?: number;
  notes?: string;
  batchCode?: string;
}

export interface StorageUnit {
  id: string;
  name: string;
  hub: LocationHub;
  capacityCrates: number;
  occupiedCrates: number;
  temperature: number;
  targetTemp: number;
  humidity: number;
  ethylenePpm: number;
  solarPowerKw: number;
  batteryReserveKwh: number;
  solarStatus: 'Solar Active' | 'Battery Active' | 'Hybrid';
  coolingStatus: 'Optimal' | 'Chilling' | 'Defrosting' | 'Standby';
  doorSensor: 'Closed' | 'Open';
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
  currentLat?: number;
  currentLng?: number;
  distanceKmRemaining?: number;
  etaMinutes?: number;
  batteryPercent?: number;
  pickupTimeline: TrackingStep[];
  deliveryTimeline: TrackingStep[];
}

export interface MarketplaceProduce {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerRole: UserRole;
  hub: LocationHub;
  produce: ProduceType;
  variety: string;
  cratesAvailable: number;
  estWeightKg: number;
  grade: 'Grade A Export' | 'Grade A Premium' | 'Grade B Commercial';
  askingPricePerKg: number;
  marketBenchmarkPricePerKg: number;
  coldStoredHours: number;
  coolingTemp: number;
  verifiedChillSeal: boolean;
  harvestDate: string;
  image: string;
}

export interface ActivityNotification {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'temp_alert' | 'booking' | 'logistics' | 'market_bid' | 'solar';
  read: boolean;
}
