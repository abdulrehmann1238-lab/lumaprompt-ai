import { useApp } from '../context/AppContext';

export function useProfile() {
  const { profile, updateProfile, resetProfileToDefault } = useApp();
  return { profile, updateProfile, resetProfileToDefault };
}

