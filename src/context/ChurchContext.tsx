import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ChurchInfo,
  ServiceSchedule,
  Sermon,
  BibleVerse,
  Ministry,
  ChurchEvent,
  PrayerRequest,
  VisitorRSVP,
  CountdownConfig,
  ModuleVisibilityConfig
} from '../types';
import {
  CHURCH_INFO,
  DEFAULT_COUNTDOWN_CONFIG,
  DEFAULT_MODULE_VISIBILITY,
  SERVICES_SCHEDULE,
  SERMONS_DATA,
  DAILY_VERSES,
  MINISTRIES_DATA,
  EVENTS_DATA,
  INITIAL_PRAYER_WALL
} from '../data/churchData';

interface ChurchContextType {
  churchInfo: ChurchInfo;
  countdownConfig: CountdownConfig;
  moduleVisibility: ModuleVisibilityConfig;
  services: ServiceSchedule[];
  sermons: Sermon[];
  verses: BibleVerse[];
  ministries: Ministry[];
  events: ChurchEvent[];
  prayers: PrayerRequest[];
  rsvps: VisitorRSVP[];
  isAdminLoggedIn: boolean;

  // Admin auth
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (newPass: string) => void;

  // Church info
  updateChurchInfo: (info: ChurchInfo) => void;

  // Countdown config
  updateCountdownConfig: (config: CountdownConfig) => void;

  // Module visibility
  updateModuleVisibility: (config: ModuleVisibilityConfig) => void;
  toggleModuleVisibility: (moduleKey: keyof ModuleVisibilityConfig) => void;

  // Services
  addService: (service: Omit<ServiceSchedule, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceSchedule>) => void;
  deleteService: (id: string) => void;

  // Sermons
  addSermon: (sermon: Omit<Sermon, 'id'>) => void;
  updateSermon: (id: string, sermon: Partial<Sermon>) => void;
  deleteSermon: (id: string) => void;

  // Verses
  addVerse: (verse: Omit<BibleVerse, 'id'>) => void;
  updateVerse: (id: string, verse: Partial<BibleVerse>) => void;
  deleteVerse: (id: string) => void;

  // Events
  addEvent: (event: Omit<ChurchEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<ChurchEvent>) => void;
  deleteEvent: (id: string) => void;

  // Prayers
  addPrayer: (content: { author: string; isAnonymous: boolean; category: PrayerRequest['category']; content: string }) => void;
  incrementAmen: (id: string) => void;
  togglePrayerAnswered: (id: string) => void;
  deletePrayer: (id: string) => void;

  // RSVPs
  addVisitorRSVP: (rsvp: { name: string; count: string; date: string; phone?: string }) => void;
  updateRSVPStatus: (id: string, status: VisitorRSVP['status']) => void;
  deleteRSVP: (id: string) => void;

  // Global reset
  resetToDefaults: () => void;
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INFO: 'church_info_v2',
  COUNTDOWN: 'church_countdown_v2',
  MODULES: 'church_modules_visibility_v1',
  SERVICES: 'church_services_v1',
  SERMONS: 'church_sermons_v1',
  VERSES: 'church_verses_v1',
  EVENTS: 'church_events_v1',
  PRAYERS: 'church_prayers_v1',
  RSVPS: 'church_rsvps_v1',
  PASSWORD: 'church_admin_pwd_v1',
  AUTH: 'church_admin_auth_v1',
};

export const ChurchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Church Info
  const [churchInfo, setChurchInfo] = useState<ChurchInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      if (saved) {
        const parsed = JSON.parse(saved);
        // If old church name exists in storage, migrate to the new name
        if (parsed.name && parsed.name.includes('恩典之光')) {
          return CHURCH_INFO;
        }
        return parsed;
      }
      return CHURCH_INFO;
    } catch {
      return CHURCH_INFO;
    }
  });

  // 1.1 Countdown Config
  const [countdownConfig, setCountdownConfig] = useState<CountdownConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUNTDOWN);
      return saved ? JSON.parse(saved) : DEFAULT_COUNTDOWN_CONFIG;
    } catch {
      return DEFAULT_COUNTDOWN_CONFIG;
    }
  });

  // 1.2 Module Visibility Config
  const [moduleVisibility, setModuleVisibility] = useState<ModuleVisibilityConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MODULES);
      if (saved) {
        return { ...DEFAULT_MODULE_VISIBILITY, ...JSON.parse(saved) };
      }
      return DEFAULT_MODULE_VISIBILITY;
    } catch {
      return DEFAULT_MODULE_VISIBILITY;
    }
  });

  // 2. Services
  const [services, setServices] = useState<ServiceSchedule[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : SERVICES_SCHEDULE;
    } catch {
      return SERVICES_SCHEDULE;
    }
  });

  // 3. Sermons
  const [sermons, setSermons] = useState<Sermon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERMONS);
      return saved ? JSON.parse(saved) : SERMONS_DATA;
    } catch {
      return SERMONS_DATA;
    }
  });

  // 4. Verses
  const [verses, setVerses] = useState<BibleVerse[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VERSES);
      return saved ? JSON.parse(saved) : DAILY_VERSES;
    } catch {
      return DAILY_VERSES;
    }
  });

  // 5. Ministries
  const [ministries] = useState<Ministry[]>(MINISTRIES_DATA);

  // 6. Events
  const [events, setEvents] = useState<ChurchEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : EVENTS_DATA;
    } catch {
      return EVENTS_DATA;
    }
  });

  // 7. Prayers
  const [prayers, setPrayers] = useState<PrayerRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRAYERS);
      return saved ? JSON.parse(saved) : INITIAL_PRAYER_WALL;
    } catch {
      return INITIAL_PRAYER_WALL;
    }
  });

  // 8. Visitor RSVPs
  const [rsvps, setRsvps] = useState<VisitorRSVP[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RSVPS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'rsvp-init-1',
          name: '陈先生',
          count: '2 人',
          date: '本周日早堂 09:00',
          phone: '138-0011-2233',
          createdAt: '今天 08:30',
          status: '待联系'
        },
        {
          id: 'rsvp-init-2',
          name: '林女士一家',
          count: '3-4 人',
          date: '本周日午堂 11:00',
          phone: '189-9988-7766',
          createdAt: '昨天 16:20',
          status: '已安排接待'
        }
      ];
    } catch {
      return [];
    }
  });

  // 9. Admin Password (default: grace2026)
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.PASSWORD) || 'grace2026';
  });

  // 10. Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(churchInfo));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [churchInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COUNTDOWN, JSON.stringify(countdownConfig));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [countdownConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(moduleVisibility));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [moduleVisibility]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERMONS, JSON.stringify(sermons));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [sermons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VERSES, JSON.stringify(verses));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [verses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(prayers));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [prayers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(rsvps));
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [rsvps]);

  // Auth methods
  const loginAdmin = (password: string): boolean => {
    if (password === adminPassword || password === 'admin') {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const changeAdminPassword = (newPass: string) => {
    setAdminPassword(newPass);
    localStorage.setItem(STORAGE_KEYS.PASSWORD, newPass);
  };

  // Mutators
  const updateChurchInfo = (newInfo: ChurchInfo) => {
    setChurchInfo(newInfo);
  };

  const updateCountdownConfig = (newConfig: CountdownConfig) => {
    setCountdownConfig(newConfig);
  };

  const updateModuleVisibility = (newConfig: ModuleVisibilityConfig) => {
    setModuleVisibility(newConfig);
    // Keep countdownConfig.enabled in sync if countdown visibility was adjusted
    if (newConfig.countdown !== countdownConfig.enabled) {
      setCountdownConfig((prev) => ({ ...prev, enabled: newConfig.countdown }));
    }
  };

  const toggleModuleVisibility = (moduleKey: keyof ModuleVisibilityConfig) => {
    setModuleVisibility((prev) => {
      const nextState = {
        ...prev,
        [moduleKey]: !prev[moduleKey]
      };
      if (moduleKey === 'countdown') {
        setCountdownConfig((c) => ({ ...c, enabled: nextState.countdown }));
      }
      return nextState;
    });
  };

  const addService = (serviceData: Omit<ServiceSchedule, 'id'>) => {
    const newService: ServiceSchedule = {
      ...serviceData,
      id: `service-${Date.now()}`
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, updated: Partial<ServiceSchedule>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addSermon = (sermonData: Omit<Sermon, 'id'>) => {
    const newSermon: Sermon = {
      ...sermonData,
      id: `sermon-${Date.now()}`
    };
    setSermons((prev) => [newSermon, ...prev]);
  };

  const updateSermon = (id: string, updated: Partial<Sermon>) => {
    setSermons((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteSermon = (id: string) => {
    setSermons((prev) => prev.filter((s) => s.id !== id));
  };

  const addVerse = (verseData: Omit<BibleVerse, 'id'>) => {
    const newVerse: BibleVerse = {
      ...verseData,
      id: `verse-${Date.now()}`
    };
    setVerses((prev) => [...prev, newVerse]);
  };

  const updateVerse = (id: string, updated: Partial<BibleVerse>) => {
    setVerses((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
  };

  const deleteVerse = (id: string) => {
    setVerses((prev) => prev.filter((v) => v.id !== id));
  };

  const addEvent = (eventData: Omit<ChurchEvent, 'id'>) => {
    const newEvent: ChurchEvent = {
      ...eventData,
      id: `event-${Date.now()}`
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, updated: Partial<ChurchEvent>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const addPrayer = (prayerData: {
    author: string;
    isAnonymous: boolean;
    category: PrayerRequest['category'];
    content: string;
  }) => {
    const newPrayer: PrayerRequest = {
      id: `prayer-${Date.now()}`,
      author: prayerData.author,
      isAnonymous: prayerData.isAnonymous,
      category: prayerData.category,
      content: prayerData.content,
      amenCount: 1,
      createdAt: '刚刚'
    };
    setPrayers((prev) => [newPrayer, ...prev]);
  };

  const incrementAmen = (id: string) => {
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, amenCount: p.amenCount + 1 } : p))
    );
  };

  const togglePrayerAnswered = (id: string) => {
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isAnswered: !p.isAnswered } : p))
    );
  };

  const deletePrayer = (id: string) => {
    setPrayers((prev) => prev.filter((p) => p.id !== id));
  };

  const addVisitorRSVP = (rsvpData: { name: string; count: string; date: string; phone?: string }) => {
    const newRsvp: VisitorRSVP = {
      id: `rsvp-${Date.now()}`,
      name: rsvpData.name,
      count: rsvpData.count,
      date: rsvpData.date,
      phone: rsvpData.phone,
      createdAt: '刚刚',
      status: '待联系'
    };
    setRsvps((prev) => [newRsvp, ...prev]);
  };

  const updateRSVPStatus = (id: string, status: VisitorRSVP['status']) => {
    setRsvps((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const deleteRSVP = (id: string) => {
    setRsvps((prev) => prev.filter((r) => r.id !== id));
  };

  const resetToDefaults = () => {
    setChurchInfo(CHURCH_INFO);
    setCountdownConfig(DEFAULT_COUNTDOWN_CONFIG);
    setModuleVisibility(DEFAULT_MODULE_VISIBILITY);
    setServices(SERVICES_SCHEDULE);
    setSermons(SERMONS_DATA);
    setVerses(DAILY_VERSES);
    setEvents(EVENTS_DATA);
    setPrayers(INITIAL_PRAYER_WALL);
    setAdminPassword('grace2026');
    localStorage.clear();
  };

  return (
    <ChurchContext.Provider
      value={{
        churchInfo,
        countdownConfig,
        moduleVisibility,
        services,
        sermons,
        verses,
        ministries,
        events,
        prayers,
        rsvps,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        updateChurchInfo,
        updateCountdownConfig,
        updateModuleVisibility,
        toggleModuleVisibility,
        addService,
        updateService,
        deleteService,
        addSermon,
        updateSermon,
        deleteSermon,
        addVerse,
        updateVerse,
        deleteVerse,
        addEvent,
        updateEvent,
        deleteEvent,
        addPrayer,
        incrementAmen,
        togglePrayerAnswered,
        deletePrayer,
        addVisitorRSVP,
        updateRSVPStatus,
        deleteRSVP,
        resetToDefaults
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
};
