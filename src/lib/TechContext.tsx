import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { technologies, getTechById, type TechSection } from './navigation';

interface TechContextValue {
  activeTech: TechSection | null;
  setActiveTechId: (id: string) => void;
}

const TechContext = createContext<TechContextValue>({
  activeTech: null,
  setActiveTechId: () => {},
});

export function useTech() {
  return useContext(TechContext);
}

/** Reads :techId from the URL and keeps context in sync. */
function TechSyncer({ setActiveTechId }: { setActiveTechId: (id: string) => void }) {
  const { techId } = useParams<{ techId: string }>();
  useEffect(() => {
    if (techId) setActiveTechId(techId);
  }, [techId, setActiveTechId]);
  return null;
}

export function TechProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  // Derive initial tech from URL on first render
  const initialId = (() => {
    const m = location.pathname.match(/\/(?:technologies|technology|interview-prep)\/([^/]+)/);
    return m ? m[1] : 'aem';
  })();

  const [activeTechId, setActiveTechId] = useState<string>(initialId);

  // Also keep in sync whenever the pathname changes (e.g. back/forward)
  useEffect(() => {
    const m = location.pathname.match(/\/(?:technologies|technology|interview-prep)\/([^/]+)/);
    if (m && m[1] !== activeTechId) setActiveTechId(m[1]);
  }, [activeTechId, location.pathname]);

  const activeTech = getTechById(activeTechId) ?? technologies[0];

  return (
    <TechContext.Provider value={{ activeTech, setActiveTechId }}>
      {children}
    </TechContext.Provider>
  );
}
