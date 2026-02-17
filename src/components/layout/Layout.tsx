import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => (
  <div className="min-h-screen min-h-[100dvh] bg-brand-bg text-brand-text">
    <Header />
    <main className="animate-fade-in">
      <Outlet />
    </main>

    {/* Bottom gradient fade for polish */}
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-8 bg-gradient-to-t from-brand-bg to-transparent" />
  </div>
);
