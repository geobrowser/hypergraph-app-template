import { useHypergraphApp } from '@graphprotocol/hypergraph-react';
import { createFileRoute } from '@tanstack/react-router';

function Login() {
  const { redirectToConnect } = useHypergraphApp();
  return (
    <div className="flex flex-1 justify-center items-center flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Hypergraph App</h1>
      <p className="text-muted-foreground mb-6">Sign in to access your spaces and start building.</p>
      <button
        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        onClick={() => {
          redirectToConnect({
            storage: localStorage,
            // connectUrl: 'http://localhost:5180',
            connectUrl: 'https://hypergraph-connect.vercel.app/',
            successUrl: `${window.location.origin}/authenticate-success`,
            // hardcoded appId for testing
            appId: '93bb8907-085a-4a0e-83dd-62b0dc98e793',
            redirectFn: (url: URL) => {
              window.location.href = url.toString();
            },
          });
        }}
      >
        Authenticate with Connect
      </button>
    </div>
  );
}

export const Route = createFileRoute('/login')({
  component: Login,
});
