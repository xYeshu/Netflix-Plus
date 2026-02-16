import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => (
  <div className="min-h-screen bg-netflix-bg text-white">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);
