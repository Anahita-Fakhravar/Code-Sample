import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { SideBar } from '../layouts/side-bar';

export function Root() {
  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  );
}
