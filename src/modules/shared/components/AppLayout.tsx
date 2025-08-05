import { Sidebar } from './headers';

export const AppLayout = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', margin: 0, padding: 0, background: '#fff', boxSizing: 'border-box' }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0, height: '100vh', background: '#fff', margin: 0, padding: 0 }} />
    </div>
  );
}; 