import { useHypergraphApp, useHypergraphAuth } from '@graphprotocol/hypergraph-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

function Login() {
  const { redirectToConnect } = useHypergraphApp();
  const { authenticated } = useHypergraphAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to home page
    if (authenticated) {
      navigate({ to: '/' });
    }
  }, [authenticated, navigate]);

  // Don't render the login form if user is already authenticated
  if (authenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 p-8 text-center">
        <p className="text-muted-foreground text-lg">Sign in to access your spaces and start building.</p>
        <button
          className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-base"
          onClick={() => {
            redirectToConnect({
              storage: localStorage,
              // connectUrl: 'http://localhost:5180',
              connectUrl: 'https://hypergraph-connect.vercel.app/',
              successUrl: `${window.location.origin}/authenticate-success`,
              redirectFn: (url: URL) => {
                window.location.href = url.toString();
              },
            });
          }}
        >
          Sign in with Geo Connect
        </button>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/login')({
  component: Login,
});
