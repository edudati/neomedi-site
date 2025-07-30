import { Outlet } from 'react-router-dom';
import { AppHeader } from './headers';
import { AppFooter } from './footers';

export const AppLayout = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />
      <main 
        className="flex-grow-1 container-fluid py-4"
        style={{ 
          paddingTop: 'calc(4rem + 1.5rem)', // 4rem do AppHeader + 1.5rem do py-4
          paddingBottom: 'calc(4rem + 1.5rem)' // 4rem do AppFooter + 1.5rem do py-4
        }}
      >
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}; 