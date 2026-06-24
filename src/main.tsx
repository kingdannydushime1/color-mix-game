import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const deb = (msg: string) => {
  const d = document.getElementById('app-debug');
  if (d) { d.textContent += '\n' + msg; d.style.display = 'block'; }
};

window.onerror = (msg, src, line, col, err) => {
  deb('err: ' + msg + ' @ ' + line + ':' + col);
};
window.onunhandledrejection = (e: PromiseRejectionEvent) => {
  deb('unhandled: ' + (e.reason?.message || String(e.reason)));
};

try {
  createRoot(document.getElementById('root')!).render(<App />);
} catch (e: any) {
  deb('react root error: ' + (e?.message || String(e)));
}
