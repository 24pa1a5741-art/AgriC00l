import React, { createContext, useContext, useState } from 'react';
import type { Booking, User, DeliveryTracking, StorageUnit } from '../types';
import { DEMO_USER, INITIAL_BOOKINGS, STORAGE_UNITS, INITIAL_TRACKING } from '../data/mockData';

export type ViewType = 
  | 'landing' 
  | 'how-it-works' 
  | 'book' 
  | 'pricing' 
  | 'dashboard' 
  | 'tracking' 
  | 'monitoring' 
  | 'about' 
  | 'faq' 
  | 'contact' 
  | 'admin';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoggedIn: boolean;
  loginAsDemoUser: (customUser?: Partial<User>) => void;
  logout: () => void;
  bookings: Booking[];
  activeBookingId: string;
  setActiveBookingId: (id: string) => void;
  activeBooking: Booking | undefined;
  storageUnits: StorageUnit[];
  trackingData: Record<string, DeliveryTracking>;
  createBooking: (newBooking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'storageUnit' | 'temperature' | 'humidity'>) => Booking;
  requestPickup: (bookingId: string) => void;
  requestDelivery: (bookingId: string) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USER); // Logged in as Sirisha by default for pitch simplicity
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeBookingId, setActiveBookingId] = useState<string>('AC-1024');
  const [storageUnits] = useState<StorageUnit[]>(STORAGE_UNITS);
  const [trackingData, setTrackingData] = useState<Record<string, DeliveryTracking>>(INITIAL_TRACKING);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loginAsDemoUser = (customUser?: Partial<User>) => {
    const userToSet: User = {
      ...DEMO_USER,
      ...customUser,
    };
    setCurrentUser(userToSet);
    setAuthModalOpen(false);
    showToast(`Logged in as ${userToSet.name} (${userToSet.role}, ${userToSet.location})`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out of demo session', 'info');
  };

  const createBooking = (
    data: Omit<Booking, 'id' | 'createdAt' | 'status' | 'storageUnit' | 'temperature' | 'humidity'>
  ): Booking => {
    const nextNum = 1025 + (bookings.length - INITIAL_BOOKINGS.length);
    const newId = `AC-${nextNum}`;
    
    // Assign unit based on location
    let assignedUnit = 'Unit A';
    if (data.location === 'Vijayawada') assignedUnit = 'Unit B';
    if (data.location === 'Guntur') assignedUnit = 'Unit C';
    if (data.location === 'Hyderabad') assignedUnit = 'Unit D';

    const newBooking: Booking = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'Stored Safely',
      storageUnit: assignedUnit,
      temperature: 4.0,
      humidity: 78,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingId(newId);

    // Initialize delivery tracking
    const newTracking: DeliveryTracking = {
      bookingId: newId,
      driverName: 'Ramesh Babu',
      driverPhone: '+91 94402 77119',
      vehicleNumber: 'AP 37 TB 4022',
      vehicleType: 'Solar-charged Piaggio E-Cargo Van',
      pickupTimeline: [
        {
          title: 'Pickup requested',
          subtitle: `Booking ${newId} confirmed by ${data.customerName}`,
          timestamp: 'Just now',
          status: 'completed',
        },
        {
          title: 'Request received',
          subtitle: `${data.location} Hub operations allocated solar bay`,
          timestamp: 'Just now',
          status: 'completed',
        },
        {
          title: 'Driver assigned',
          subtitle: data.pickupRequired ? 'Local electric cargo dispatch queued' : 'Self-drop scheduled at cold room',
          timestamp: 'Estimated within 30 mins',
          status: 'current',
        },
        {
          title: 'Produce picked up',
          subtitle: `${data.crates} crates of ${data.produce} inspected and tagged`,
          status: 'upcoming',
        },
        {
          title: 'Delivered to storage',
          subtitle: `Inwarded to ${assignedUnit} (4°C controlled environment)`,
          status: 'upcoming',
        },
      ],
      deliveryTimeline: [
        {
          title: 'Storage completed',
          subtitle: `${data.durationDays}-day holding period completed`,
          status: 'upcoming',
        },
        {
          title: 'Produce ready',
          subtitle: 'Produce staged in dispatch ante-room',
          status: 'upcoming',
        },
        {
          title: 'Driver assigned',
          subtitle: 'Final mile delivery partner designated',
          status: 'upcoming',
        },
        {
          title: 'Out for delivery',
          subtitle: 'Produce on transit to buyer / market stall',
          status: 'upcoming',
        },
        {
          title: 'Delivered',
          subtitle: 'Digital handover receipt issued',
          status: 'upcoming',
        },
      ],
    };

    setTrackingData((prev) => ({ ...prev, [newId]: newTracking }));
    showToast(`Booking ${newId} created successfully! Pay only for crates & days used.`, 'success');

    return newBooking;
  };

  const requestPickup = (bookingId: string) => {
    showToast(`Pickup request dispatched for ${bookingId}. Driver assigned!`, 'info');
    setTrackingData((prev) => {
      const current = prev[bookingId];
      if (!current) return prev;
      return {
        ...prev,
        [bookingId]: {
          ...current,
          pickupTimeline: current.pickupTimeline.map((step, idx) => {
            if (idx <= 2) return { ...step, status: 'completed' as const };
            if (idx === 3) return { ...step, status: 'current' as const };
            return step;
          }),
        },
      };
    });
  };

  const requestDelivery = (bookingId: string) => {
    showToast(`Outward delivery requested for ${bookingId}. Preparing crates for dispatch!`, 'info');
    setTrackingData((prev) => {
      const current = prev[bookingId];
      if (!current) return prev;
      return {
        ...prev,
        [bookingId]: {
          ...current,
          deliveryTimeline: current.deliveryTimeline.map((step, idx) => {
            if (idx <= 1) return { ...step, status: 'completed' as const };
            if (idx === 2) return { ...step, status: 'current' as const };
            return step;
          }),
        },
      };
    });
  };

  const activeBooking = bookings.find((b) => b.id === activeBookingId) || bookings[0];

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        isLoggedIn: !!currentUser,
        loginAsDemoUser,
        logout,
        bookings,
        activeBookingId,
        setActiveBookingId,
        activeBooking,
        storageUnits,
        trackingData,
        createBooking,
        requestPickup,
        requestDelivery,
        toasts,
        showToast,
        removeToast,
        authModalOpen,
        setAuthModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
