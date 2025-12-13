import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// A11y-friendly, responsive error page component
export default function ErrorPage({
  status = 404,
  title = 'Page not found',
  message = "Sorry, we couldn't find the page you’re looking for.",
  actionLabel = 'Go home',
  actionTo = '/',
  showSupport = true,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${status} | ${title}`;
  }, [status, title]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(actionTo);
    }
  };

  return (
    <main
      role="main"
      aria-labelledby="error-title"
      className="min-h-screen grid place-items-center px-6 py-12"
      style={{
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        background: 'radial-gradient(1200px 600px at 100% -20%, rgba(59,130,246,0.08), transparent 60%), radial-gradient(800px 400px at -20% 110%, rgba(16,185,129,0.08), transparent 60%)',
        color: '#0f172a',
      }}
    >
      <section
        className="w-full max-w-2xl"
        style={{
          background: 'white',
          borderRadius: 16,
          boxShadow:
            '0 10px 15px -3px rgba(2,6,23,.1), 0 4px 6px -4px rgba(2,6,23,.1), inset 0 1px 0 0 rgba(255,255,255,.6)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
        }}
      >
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(15,23,42,0.08)' }}>
          <span
            aria-hidden
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 10px',
              borderRadius: 9999,
              background: 'rgba(244,63,94,0.08)',
              color: '#be123c',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
            }}
          >
            <DotBadge color="#f43f5e" />
            Error {status}
          </span>

          <h1
            id="error-title"
            style={{
              margin: '14px 0 6px',
              fontSize: 28,
              lineHeight: 1.2,
              letterSpacing: -0.2,
              fontWeight: 750,
            }}
          >
            {title}
          </h1>

          <p style={{ color: '#475569', fontSize: 15 }}>{message}</p>
        </div>

        <div style={{ padding: 24, display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Button
              onClick={() => navigate(actionTo)}
              variant="primary"
              aria-label={actionLabel}
            >
              {actionLabel}
            </Button>

            <Button onClick={handleBack} variant="ghost" aria-label="Go back">
              Go back
            </Button>

            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              aria-label="Reload page"
            >
              Reload
            </Button>
          </div>

          {showSupport && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#64748b',
              fontSize: 14,
              marginTop: 8,
            }}>
              <InfoIcon />
              <span>
                If this keeps happening, contact support at
                <a
                  href="mailto:support@example.com"
                  style={{ color: '#0ea5e9', textDecoration: 'none', marginLeft: 6 }}
                >
                  support@example.com
                </a>
              </span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Button({ children, onClick, variant = 'primary', ...props }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '10px 14px',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    outline: 'none',
    border: '1px solid transparent',
    transition: 'transform 120ms ease, box-shadow 160ms ease, background 160ms ease',
    boxShadow: '0 1px 2px rgba(2,6,23,0.06), 0 1px 1px rgba(2,6,23,0.04)',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(180deg, #3b82f6, #2563eb)',
      color: 'white',
      borderColor: 'rgba(37,99,235,0.8)',
    },
    outline: {
      background: 'white',
      color: '#0f172a',
      borderColor: 'rgba(2,6,23,0.12)',
    },
    ghost: {
      background: 'transparent',
      color: '#0f172a',
      borderColor: 'transparent',
    },
  };

  const style = { ...base, ...variants[variant] };

  return (
    <button
      onClick={onClick}
      style={style}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(1px) scale(0.99)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'none')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
      {...props}
    >
      {children}
    </button>
  );
}

function DotBadge({ color = '#22c55e', size = 8 }) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: 9999,
        display: 'inline-block',
        boxShadow: '0 0 0 3px rgba(244, 63, 94, 0.12)',
      }}
    />
  );
}

function InfoIcon({ size = 18, color = '#64748b' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      style={{
        flex: '0 0 auto',
      }}
    >
      <path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-14a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm1.25 9h-2.5a.75.75 0 0 1 0-1.5h.25V12.5h-.25a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75v4.25h.25a.75.75 0 0 1 0 1.5Z"
        fill={color}
      />
    </svg>
  );
}
