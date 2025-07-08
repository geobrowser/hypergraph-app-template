import { Button } from '@/components/ui/button';
import { useHypergraphApp, useHypergraphAuth } from '@graphprotocol/hypergraph-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { authenticated } = useHypergraphAuth();
  const { redirectToConnect } = useHypergraphApp();

  const handleSignIn = () => {
    redirectToConnect({
      storage: localStorage,
      connectUrl: 'https://hypergraph-connect.vercel.app/',
      successUrl: `${window.location.origin}/authenticate-success`,
      appId: '93bb8907-085a-4a0e-83dd-62b0dc98e793',
      redirectFn: (url: URL) => {
        window.location.href = url.toString();
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <img src="/hypergraph.svg" alt="Hypergraph Logo" className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Hypergraph
        </h1>

        <p className="text-lg text-muted-foreground">Your web3 app template powered by Hypergraph</p>
      </div>

      {!authenticated && (
        <div className="text-center mb-8">
          <Button onClick={handleSignIn} className="bg-primary hover:bg-primary/90">
            Sign in with Geo Connect
          </Button>
        </div>
      )}
    </div>
  );
}
