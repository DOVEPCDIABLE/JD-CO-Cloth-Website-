import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { lazy, Suspense } from 'react';
const Gallery=lazy(()=>import('./gallery/Gallery'));
const galleryRoute=/^\/gallery\/?$/.test(window.location.pathname);
import './styles.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>{galleryRoute?<Suspense fallback={<div className="gallery-loading">Loading the jacket gallery…</div>}><Gallery/></Suspense>:<App/>}</React.StrictMode>);
