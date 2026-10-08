import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import './pages/company.css';
import './pages/business.css';
const pages: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
 '/gallery':lazy(()=>import('./gallery/Gallery')),
 '/about':lazy(()=>import('./pages/About')),
 '/client-journey':lazy(()=>import('./pages/ClientJourney')),
 '/customization-brief':lazy(()=>import('./pages/CustomizationBrief')),
};
const Industry=lazy(()=>import('./pages/Industry'));
const Page=window.location.pathname.startsWith('/industries/')?Industry:pages[window.location.pathname.replace(/\/$/,'')]||App;
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Suspense fallback={<div className="gallery-loading">Loading JD Jackets…</div>}><Page/></Suspense></React.StrictMode>);
