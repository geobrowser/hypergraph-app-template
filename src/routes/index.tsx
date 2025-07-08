import { Button } from '@/components/ui/button';
import { useSpaces } from '@graphprotocol/hypergraph-react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: publicSpaces, isPending: publicSpacesPending } = useSpaces({ mode: 'public' });
  const { data: privateSpaces, isPending: privateSpacesPending } = useSpaces({ mode: 'private' });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <img src="/hypergraph.svg" alt="Hypergraph Logo" className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Welcome to Hypergraph</h1>
        <p className="text-lg text-muted-foreground">Your web3 app template powered by Hypergraph</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Public Spaces</h2>
          <div className="bg-card border rounded-lg p-4">
            {publicSpacesPending && <p className="text-muted-foreground">Loading public spaces...</p>}
            {!publicSpacesPending && publicSpaces?.length === 0 && (
              <p className="text-muted-foreground">No public spaces found</p>
            )}
            {publicSpaces && publicSpaces.length > 0 && (
              <ul className="space-y-2">
                {publicSpaces.map((space) => (
                  <li key={space.id}>
                    <Link
                      to="/public-space/$space-id"
                      params={{ 'space-id': space.id }}
                      className="text-primary hover:underline"
                    >
                      {space.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Private Spaces</h2>
          <div className="bg-card border rounded-lg p-4">
            {privateSpacesPending && <p className="text-muted-foreground">Loading private spaces...</p>}
            {!privateSpacesPending && privateSpaces?.length === 0 && (
              <p className="text-muted-foreground">No private spaces found</p>
            )}
            {privateSpaces && privateSpaces.length > 0 && (
              <ul className="space-y-2">
                {privateSpaces.map((space) => (
                  <li key={space.id}>
                    <Link
                      to="/private-space/$space-id"
                      params={{ 'space-id': space.id }}
                      className="text-primary hover:underline"
                    >
                      {space.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
      </div>
    </div>
  );
}
