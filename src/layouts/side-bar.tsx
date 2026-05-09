import { Link } from '@tanstack/react-router';
import { CircleUserRound, House, Info, Menu } from 'lucide-react';

import { SIDEBAR_STORAGE_KEY } from '../constants/storage-keys';
import { useLocalStorage } from '../hooks/use-local-storage';

const menuItems = [
  { to: '/', label: 'Home', icon: House },
  { to: '/about', label: 'About', icon: Info },
  { to: '/profile', label: 'Profile', icon: CircleUserRound },
] as const;

export function SideBar() {
  const [isOpen, setIsOpen] = useLocalStorage<boolean>(
    SIDEBAR_STORAGE_KEY,
    false,
  );
  const sidebarWidthClass = isOpen ? 'w-56' : 'w-16';
  const labelVisibilityClass = isOpen ? 'opacity-100' : 'opacity-0';
  const handleToggle = () => setIsOpen((current) => !current);

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-zinc-200 bg-white transition-[width] duration-300 ${sidebarWidthClass}`}
      aria-label="Site navigation">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-5">
        <span
          className={`overflow-hidden whitespace-nowrap text-base font-semibold tracking-tight text-zinc-900 transition-opacity duration-200 ${labelVisibilityClass}`}>
          App Menu
        </span>
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isOpen}
          className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900">
          <Menu className="h-5 w-5 shrink-0" aria-hidden="true" />
        </button>
      </div>
      <nav className="flex flex-col gap-1 p-2" aria-label="Primary">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 [&.active]:bg-blue-50 [&.active]:text-blue-700">
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span
                className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${labelVisibilityClass}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
