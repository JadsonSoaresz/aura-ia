import { useState, useEffect } from "react";
import { SessionProfile, ActivityHistory } from "@/types/profile";

const DEFAULT_PROFILE: SessionProfile = {
  format: "texto",
  difficulty: "médio",
  needsSupport: false,
  interests: [],
  highContrast: false,
  fontSize: "médio",
  ttsEnabled: false,
  keyboardOnly: false,
};

export const useSessionProfile = () => {
  const [profile, setProfile] = useState<SessionProfile>(() => {
    const stored = localStorage.getItem("edutech_profile");
    return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
  });

  const [history, setHistory] = useState<ActivityHistory[]>(() => {
    const stored = localStorage.getItem("edutech_history");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("edutech_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("edutech_history", JSON.stringify(history));
  }, [history]);

  const updateProfile = (updates: Partial<SessionProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addActivity = (activity: Omit<ActivityHistory, "id" | "completedAt">) => {
    const newActivity: ActivityHistory = {
      ...activity,
      id: crypto.randomUUID(),
      completedAt: new Date(),
    };
    setHistory(prev => [newActivity, ...prev].slice(0, 50)); // Keep last 50
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    setHistory([]);
  };

  return {
    profile,
    history,
    updateProfile,
    addActivity,
    clearHistory,
    resetProfile,
  };
};
