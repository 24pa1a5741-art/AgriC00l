import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Booking, User, DeliveryTracking, StorageUnit, MarketplaceProduce, ActivityNotification } from '../types';
import { 
  DEMO_CREDENTIALS, 
  INITIAL_BOOKINGS, 
  STORAGE_UNITS, 
  INITIAL_TRACKING, 
  MARKETPLACE_PRODUCE, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export type ViewType = 
  | 'landing' 
  | 'how-it-works' 
  | 'book' 
  | 'pricing' 
  | 'dashboard' 
  | 'tracking' 
  | 'monitoring' 
  | 'marketplace'
  | 'about' 
  | 'faq' 
  | 'contact' 
  | 'admin';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoggedIn: boolean;
  loginWithCredentials: (identifier: string, secret: string, method: 'password' | 'otp') => { success: boolean; message: string };
  switchDemoRole: (roleKey: 'farmer' | 'operator' | 'buyer' | 'admin') => void;
  registerUser: (userData: Partial<User>) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  logout: () => void;
  bookings: Booking[];
  activeBookingId: string;
  setActiveBookingId: (id: string) => void;
  activeBooking: Booking | undefined;
  storageUnits: StorageUnit[];
  updateStorageUnit: (unitId: string, updates: Partial<StorageUnit>) => void;
  trackingData: Record<string, DeliveryTracking>;
  marketplaceItems: MarketplaceProduce[];
  placeMarketplaceBid: (itemId: string, offerPricePerKg: number, crates: number) => void;
  notifications: ActivityNotification[];
  markNotificationRead: (id: string) => void;
  createBooking: (newBooking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'storageUnit' | 'temperature' | 'humidity'>) => Booking;
  requestPickup: (bookingId: string) => void;
  requestDelivery: (bookingId: string) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  profileModalOpen: boolean;
  setProfileModalOpen: (open: boolean) => void;
  receiptModalBooking: Booking | null;
  setReceiptModalBooking: (booking: Booking | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  
  // Persistent user session
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('agricool_user_session');
      return saved ? JSON.parse(saved) : DEMO_CREDENTIALS.farmer.user;
    } catch {
      return DEMO_CREDENTIALS.farmer.user;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('agricool_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [activeBookingId, setActiveBookingId] = useState<string>('AC-1024');
  
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>(() => {
    try {
      const saved = localStorage.getItem('agricool_storage_units');
      return saved ? JSON.parse(saved) : STORAGE_UNITS;
    } catch {
      return STORAGE_UNITS;
    }
  });

  const [trackingData, setTrackingData] = useState<Record<string, DeliveryTracking>>(INITIAL_TRACKING);
  
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceProduce[]>(() => {
    try {
      const saved = localStorage.getItem('agricool_marketplace');
      return saved ? JSON.parse(saved) : MARKETPLACE_PRODUCE;
    } catch {
      return MARKETPLACE_PRODUCE;
    }
  });

  const [notifications, setNotifications] = useState<ActivityNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [receiptModalBooking, setReceiptModalBooking] = useState<Booking | null>(null);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('agricool_user_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('agricool_user_session');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('agricool_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('agricool_storage_units', JSON.stringify(storageUnits));
  }, [storageUnits]);

  useEffect(() => {
    localStorage.setItem('agricool_marketplace', JSON.stringify(marketplaceItems));
  }, [marketplaceItems]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Credential verification engine
  const loginWithCredentials = (
    identifier: string, 
    secret: string, 
    method: 'password' | 'otp'
  ): { success: boolean; message: string } => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanSecret = secret.trim();

    // Check demo credentials directory
    const matchedKey = Object.keys(DEMO_CREDENTIALS).find((key) => {
      const cred = DEMO_CREDENTIALS[key];
      const matchEmail = cred.credentials.email.toLowerCase() === cleanId;
      const matchPhone = cred.credentials.phone.replace(/\D/g, '').endsWith(cleanId.replace(/\D/g, ''));
      return matchEmail || matchPhone;
    });

    if (matchedKey) {
      const cred = DEMO_CREDENTIALS[matchedKey];
      if (method === 'password') {
        if (cleanSecret === cred.credentials.password || cleanSecret === 'agricool123' || cleanSecret === 'demo') {
          setCurrentUser(cred.user);
          setAuthModalOpen(false);
          showToast(`Welcome back, ${cred.user.name}! Authenticated as ${cred.user.role}.`, 'success');
          return { success: true, message: 'Authentication successful.' };
        } else {
          showToast('Invalid password. Try demo password or click quick login button.', 'error');
          return { success: false, message: 'Invalid password credentials.' };
        }
      } else {
        // OTP method
        if (cleanSecret === cred.credentials.otp || cleanSecret === '1234') {
          setCurrentUser(cred.user);
          setAuthModalOpen(false);
          showToast(`Mobile OTP Verified. Welcome ${cred.user.name}!`, 'success');
          return { success: true, message: 'OTP verified successfully.' };
        } else {
          showToast('Invalid OTP. Use demo OTP 1234.', 'error');
          return { success: false, message: 'Invalid OTP code.' };
        }
      }
    }

    // Allow custom login for evaluation testing
    if (cleanId.length >= 3) {
      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier.includes('@') ? identifier : `${cleanId}@agricool.demo`,
        phone: identifier.includes('@') ? '+91 98480 99999' : identifier,
        role: 'Farmer',
        location: 'Bhimavaram',
        walletBalance: 15000,
        verified: true,
        memberSince: 'Today',
      };
      setCurrentUser(newUser);
      setAuthModalOpen(false);
      showToast(`Logged in as ${newUser.name} (Custom Session)`, 'success');
      return { success: true, message: 'Session started.' };
    }

    return { success: false, message: 'Please provide valid phone or email credentials.' };
  };

  const switchDemoRole = (roleKey: 'farmer' | 'operator' | 'buyer' | 'admin') => {
    const cred = DEMO_CREDENTIALS[roleKey];
    if (cred) {
      setCurrentUser(cred.user);
      showToast(`Switched persona to: ${cred.user.name} (${cred.badge})`, 'info');
      if (roleKey === 'admin') {
        setCurrentView('admin');
      } else if (roleKey === 'operator') {
        setCurrentView('monitoring');
      } else if (roleKey === 'buyer') {
        setCurrentView('marketplace');
      } else {
        setCurrentView('dashboard');
      }
    }
  };

  const registerUser = (userData: Partial<User>) => {
    const user: User = {
      id: `usr_${Date.now()}`,
      name: userData.name || 'New Member',
      phone: userData.phone || '+91 90000 00000',
      email: userData.email || 'user@agricool.in',
      role: userData.role || 'Farmer',
      location: userData.location || 'Bhimavaram',
      farmOrBusinessName: userData.farmOrBusinessName || 'Agri Enterprise',
      walletBalance: 10000,
      verified: true,
      memberSince: 'October 2026',
    };
    setCurrentUser(user);
    setAuthModalOpen(false);
    showToast(`Account registered successfully! Welcome to AgriCool, ${user.name}.`, 'success');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    showToast('Profile and credential settings updated successfully.', 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out of session safely.', 'info');
  };

  const updateStorageUnit = (unitId: string, updates: Partial<StorageUnit>) => {
    setStorageUnits((prev) =>
      prev.map((u) => (u.id === unitId ? { ...u, ...updates } : u))
    );
    showToast(`Storage ${unitId.toUpperCase()} setpoints updated. IoT telemetry recalibrating.`, 'info');
  };

  const placeMarketplaceBid = (itemId: string, offerPricePerKg: number, crates: number) => {
    const item = marketplaceItems.find((i) => i.id === itemId);
    if (!item) return;

    showToast(`Bid of ₹${offerPricePerKg}/kg submitted for ${crates} crates of ${item.produce}! Notification sent to ${item.sellerName}.`, 'success');

    setMarketplaceItems((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? { ...i, cratesAvailable: Math.max(0, i.cratesAvailable - crates) }
          : i
      )
    );

    // Add activity notification
    const newNotif: ActivityNotification = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: `New Buy Order / Bid: ${item.produce}`,
      description: `${currentUser?.name || 'A buyer'} placed bid at ₹${offerPricePerKg}/kg (${crates} crates).`,
      type: 'market_bid',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const createBooking = (
    data: Omit<Booking, 'id' | 'createdAt' | 'status' | 'storageUnit' | 'temperature' | 'humidity'>
  ): Booking => {
    const nextNum = 1032 + (bookings.length - INITIAL_BOOKINGS.length);
    const newId = `AC-${nextNum}`;
    
    // Assign unit based on location
    let assignedUnit = 'Unit A (Solar Micro-Vault)';
    let temp = 4.0;
    let humidity = 79;
    if (data.location === 'Vijayawada') {
      assignedUnit = 'Unit B (Dual-Temp Bay)';
      temp = 3.8;
      humidity = 83;
    } else if (data.location === 'Guntur') {
      assignedUnit = 'Unit C (Misting Chamber)';
      temp = 3.5;
      humidity = 91;
    } else if (data.location === 'Hyderabad') {
      assignedUnit = 'Unit D (Deep Chill Hub)';
      temp = 2.9;
      humidity = 86;
    }

    const newBooking: Booking = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'Stored Safely',
      storageUnit: assignedUnit,
      temperature: temp,
      humidity,
      shelfLifeRemainingDays: 12,
      batchCode: `LOT-${data.location.slice(0, 3).toUpperCase()}-${data.produce.slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      notes: `Freshly inwarded to ${assignedUnit}. Optimal atmosphere sealed.`,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingId(newId);

    // Initialize delivery tracking
    const newTracking: DeliveryTracking = {
      bookingId: newId,
      driverName: 'Ramesh Babu',
      driverPhone: '+91 94402 77119',
      vehicleNumber: 'AP 37 TB 4022',
      vehicleType: 'Solar-charged Piaggio E-Cargo Van (300kg Payload)',
      currentLat: 16.5449,
      currentLng: 81.5212,
      batteryPercent: 94,
      pickupTimeline: [
        {
          title: 'Pickup requested',
          subtitle: `Booking ${newId} confirmed by ${data.customerName}`,
          timestamp: 'Just now',
          status: 'completed',
        },
        {
          title: 'Cold Bay Reserved',
          subtitle: `${data.location} Hub allocated ${assignedUnit}`,
          timestamp: 'Just now',
          status: 'completed',
        },
        {
          title: 'EV Driver Assigned',
          subtitle: data.pickupRequired ? 'Electric refrigerated cargo dispatched to farm gate' : 'Self-drop slot reserved',
          timestamp: 'Estimated 25 mins',
          status: 'current',
        },
        {
          title: 'Produce Inspected & Barcoded',
          subtitle: `${data.crates} crates of ${data.produce} quality-scanned`,
          status: 'upcoming',
        },
        {
          title: 'Safely Stored in Cold Hub',
          subtitle: `Chilled at ${temp}°C in ${assignedUnit}`,
          status: 'upcoming',
        },
      ],
      deliveryTimeline: [
        {
          title: 'Holding in Optimal Climate',
          subtitle: `${data.durationDays}-day protection cycle active`,
          status: 'upcoming',
        },
        {
          title: 'Dispatch staging',
          subtitle: 'Produce staged in ante-room for pickup or sale',
          status: 'upcoming',
        },
        {
          title: 'Delivery driver assigned',
          subtitle: 'Refrigerated van designated for last mile',
          status: 'upcoming',
        },
        {
          title: 'Delivered',
          subtitle: 'Handover complete and receipt archived',
          status: 'upcoming',
        },
      ],
    };

    setTrackingData((prev) => ({ ...prev, [newId]: newTracking }));
    
    // Add activity notification
    const newNotif: ActivityNotification = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: `Booking Confirmed (${newId})`,
      description: `${data.crates} crates of ${data.produce} reserved at ${data.location} Hub (${assignedUnit}).`,
      type: 'booking',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`Booking ${newId} created! Reserved ${data.crates} crates at ₹500/crate-day.`, 'success');

    return newBooking;
  };

  const requestPickup = (bookingId: string) => {
    showToast(`Refrigerated EV cargo dispatched for ${bookingId}. Driver Ramesh Babu is on the way!`, 'info');
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
    showToast(`Outward delivery scheduled for ${bookingId}. Preparing crates in ante-room!`, 'info');
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
        loginWithCredentials,
        switchDemoRole,
        registerUser,
        updateUserProfile,
        logout,
        bookings,
        activeBookingId,
        setActiveBookingId,
        activeBooking,
        storageUnits,
        updateStorageUnit,
        trackingData,
        marketplaceItems,
        placeMarketplaceBid,
        notifications,
        markNotificationRead,
        createBooking,
        requestPickup,
        requestDelivery,
        toasts,
        showToast,
        removeToast,
        authModalOpen,
        setAuthModalOpen,
        profileModalOpen,
        setProfileModalOpen,
        receiptModalBooking,
        setReceiptModalBooking,
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
