import '@/styles/NotFound.css';
import '@/styles/globals.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title gradient-text">404</h1>
      <p className="not-found__message gradient-text">Page not found</p>
    </div>
  );
}