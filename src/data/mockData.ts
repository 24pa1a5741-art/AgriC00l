import type { Booking, StorageUnit, DeliveryTracking, User } from '../types';

export const DEMO_USER: User = {
  id: 'usr_sirisha_01',
  name: 'Sirisha',
  phone: '+91 98480 23456',
  email: 'sirisha.farmer@agricool.demo',
  role: 'Farmer',
  location: 'Bhimavaram',
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'AC-1024',
    customerName: 'Sirisha',
    phone: '+91 98480 23456',
    location: 'Bhimavaram',
    produce: 'Tomato',
    crates: 8,
    durationDays: 3,
    pickupRequired: true,
    deliveryRequired: false,
    pickupAddress: 'Farm Gate, Undi Road, Bhimavaram Rural',
    crateRate: 500,
    logisticsFee: 0, // In user spec: 8 crates × 3 days × ₹500 = ₹12,000
    totalAmount: 12000,
    status: 'Stored Safely',
    createdAt: '2026-10-14T09:15:00Z',
    storageUnit: 'Unit A',
    temperature: 4.0,
    humidity: 78,
    notes: 'Grade A country tomatoes harvested this morning. Ripe, require 4°C to prevent softening.',
  },
  {
    id: 'AC-1018',
    customerName: 'Venkata Rao',
    phone: '+91 94401 54321',
    location: 'Vijayawada',
    produce: 'Banana',
    crates: 15,
    durationDays: 4,
    pickupRequired: true,
    deliveryRequired: true,
    pickupAddress: 'Gollapudi Wholesale Yard',
    deliveryAddress: 'Kaleswara Rao Market',
    crateRate: 500,
    logisticsFee: 400,
    totalAmount: 30400,
    status: 'Stored Safely',
    createdAt: '2026-10-13T11:00:00Z',
    storageUnit: 'Unit B',
    temperature: 13.5,
    humidity: 85,
    notes: 'Robusta green bananas. Chilling injury prevention protocol active.',
  },
  {
    id: 'AC-0992',
    customerName: 'Lakshmi Devi',
    phone: '+91 99890 12890',
    location: 'Guntur',
    produce: 'Leafy vegetables',
    crates: 12,
    durationDays: 2,
    pickupRequired: false,
    deliveryRequired: true,
    deliveryAddress: 'Brodipet Rythu Bazaar Stall #14',
    crateRate: 500,
    logisticsFee: 200,
    totalAmount: 12200,
    status: 'Completed',
    createdAt: '2026-10-10T08:00:00Z',
    storageUnit: 'Unit C',
    temperature: 3.5,
    humidity: 92,
    notes: 'Spinach and coriander. Kept fresh for weekend peak market sale.',
  },
];

export const STORAGE_UNITS: StorageUnit[] = [
  {
    id: 'unit-a',
    name: 'Unit A',
    hub: 'Bhimavaram',
    capacityCrates: 100,
    occupiedCrates: 62,
    temperature: 4.0,
    humidity: 78,
    solarStatus: 'Solar Active',
    status: 'Normal',
  },
  {
    id: 'unit-b',
    name: 'Unit B',
    hub: 'Vijayawada',
    capacityCrates: 100,
    occupiedCrates: 84,
    temperature: 3.8,
    humidity: 82,
    solarStatus: 'Solar Active',
    status: 'Near Capacity',
  },
  {
    id: 'unit-c',
    name: 'Unit C',
    hub: 'Guntur',
    capacityCrates: 100,
    occupiedCrates: 45,
    temperature: 4.2,
    humidity: 79,
    solarStatus: 'Hybrid',
    status: 'Normal',
  },
  {
    id: 'unit-d',
    name: 'Unit D',
    hub: 'Hyderabad',
    capacityCrates: 120,
    occupiedCrates: 58,
    temperature: 4.1,
    humidity: 77,
    solarStatus: 'Solar Active',
    status: 'Normal',
  },
];

export const INITIAL_TRACKING: Record<string, DeliveryTracking> = {
  'AC-1024': {
    bookingId: 'AC-1024',
    driverName: 'Ramesh Babu',
    driverPhone: '+91 94402 77119',
    vehicleNumber: 'AP 37 TB 4022',
    vehicleType: 'Solar-charged Piaggio E-Cargo Van',
    pickupTimeline: [
      {
        title: 'Pickup requested',
        subtitle: 'Digital booking confirmed by Sirisha',
        timestamp: '14 Oct, 09:15 AM',
        status: 'completed',
      },
      {
        title: 'Request received',
        subtitle: 'Bhimavaram Hub operations acknowledged',
        timestamp: '14 Oct, 09:22 AM',
        status: 'completed',
      },
      {
        title: 'Driver assigned',
        subtitle: 'Ramesh Babu (Piaggio E-Cargo) en route to farm',
        timestamp: '14 Oct, 09:40 AM',
        status: 'completed',
      },
      {
        title: 'Produce picked up',
        subtitle: '8 crates loaded and barcoded at farm gate',
        timestamp: '14 Oct, 10:15 AM',
        status: 'completed',
      },
      {
        title: 'Delivered to storage',
        subtitle: 'Inwarded into Unit A (4°C, 78% RH)',
        timestamp: '14 Oct, 10:45 AM',
        status: 'completed',
      },
    ],
    deliveryTimeline: [
      {
        title: 'Storage completed',
        subtitle: '3-day cold holding cycle nearing conclusion',
        timestamp: 'Expected 17 Oct, 08:00 AM',
        status: 'completed',
      },
      {
        title: 'Produce ready',
        subtitle: 'Inspection cleared, crates staged for outward dispatch',
        timestamp: 'Scheduled 17 Oct, 08:30 AM',
        status: 'current',
      },
      {
        title: 'Driver assigned',
        subtitle: 'Local delivery partner will be designated',
        timestamp: 'Pending dispatch time',
        status: 'upcoming',
      },
      {
        title: 'Out for delivery',
        subtitle: 'Produce on final mile transit to Rythu Bazaar / buyer',
        timestamp: 'Scheduled 17 Oct, 09:15 AM',
        status: 'upcoming',
      },
      {
        title: 'Delivered',
        subtitle: 'Final handover verified via digital signature',
        timestamp: 'Scheduled 17 Oct, 10:00 AM',
        status: 'upcoming',
      },
    ],
  },
};

export const SENSOR_TELEMETRY_HOURLY = [
  { time: '06:00', temp: 4.2, humidity: 76, solarWatts: 450 },
  { time: '08:00', temp: 4.0, humidity: 77, solarWatts: 1800 },
  { time: '10:00', temp: 3.9, humidity: 78, solarWatts: 3400 },
  { time: '12:00', temp: 4.0, humidity: 78, solarWatts: 4600 },
  { time: '14:00', temp: 4.1, humidity: 77, solarWatts: 4200 },
  { time: '16:00', temp: 4.0, humidity: 79, solarWatts: 2500 },
  { time: '18:00', temp: 3.9, humidity: 80, solarWatts: 600 },
  { time: '20:00', temp: 4.0, humidity: 78, solarWatts: 0 },
];

export const FAQ_ITEMS = [
  {
    q: 'What is AgriCool?',
    a: 'AgriCool is a decentralized, solar-powered modular cold storage and local logistics service built specifically for smallholder farmers and small produce vendors. Instead of spending lakhs to build your own cold room or getting locked into large commercial warehouses far away, AgriCool lets you rent clean, temperature-controlled cold storage by the crate, right near your agricultural market.',
  },
  {
    q: 'Who can use AgriCool?',
    a: 'Smallholder farmers looking to hold harvested vegetables or fruits during temporary mandi price dips; local vegetable/fruit vendors needing safe overnight storage; collection centers and aggregators who assemble crates from multiple small farms before transport; and urban retail vendors seeking reliable cold-holding.',
  },
  {
    q: 'How does pay-per-crate pricing work?',
    a: 'You pay strictly for the number of crates you store and the number of days you store them. In this prototype demonstration, the rate is ₹500 per crate-day. For example: 8 crates stored for 3 days = 8 × 3 × ₹500 = ₹12,000. There are zero seasonal lock-ins, zero minimum annual guarantees, and zero capital expenditure.',
  },
  {
    q: 'What produce can be stored?',
    a: 'AgriCool units accommodate perishable horticultural produce including tomatoes, mangoes, bananas (at controlled chilling-safe temperatures), leafy greens (spinach, coriander, mint), okra (bhindi), chillies, capsicum, guava, and seasonal fruits.',
  },
  {
    q: 'How long can I store produce?',
    a: 'Storage duration is completely flexible—from as little as 1 day (e.g. overnight storage between market days) up to 14–21 days depending on produce respiration and shelf-life requirements.',
  },
  {
    q: 'Is pickup and delivery available?',
    a: 'Yes! AgriCool operates small, eco-friendly local logistics vehicles (such as electric cargo three-wheelers) to collect crates directly from your farm gate or mandi stall and transport them directly to the cold storage pod. When you are ready to sell, we deliver back to the market stall or to your designated buyer.',
  },
  {
    q: 'How is temperature monitored?',
    a: 'In our planned IoT architecture, each modular cold room is fitted with precision digital temperature and relative humidity sensors. Customers receive live visibility through the AgriCool dashboard, along with automated WhatsApp/SMS alerts if conditions shift or when your storage period is nearing completion.',
  },
  {
    q: 'Is AgriCool currently available everywhere?',
    a: 'AgriCool is currently operating as a validation prototype focused on key agricultural and horticultural clusters in Andhra Pradesh and Telangana, including Bhimavaram, Vijayawada, Guntur, and Hyderabad market peripheries.',
  },
  {
    q: 'Is the pricing final?',
    a: 'No. The ₹500 per crate-day figure is a prototype validation price shown for demonstration and feedback. Commercial pricing will be calibrated by produce commodity, seasonal harvest volumes, local hub power logistics, and crate dimensions.',
  },
];
