import { Address, NewsStory } from '@/schema';
import { HypergraphSpaceProvider, useQuery, useSpace } from '@graphprotocol/hypergraph-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/public-space/$space-id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { 'space-id': spaceId } = Route.useParams();

  return (
    <>
      <HypergraphSpaceProvider space={spaceId}>
        <PublicSpace />
      </HypergraphSpaceProvider>
      <HypergraphSpaceProvider space="27af9116-ddb6-4baa-b4f0-c54f0774d346">
        <ListNewsStories />
      </HypergraphSpaceProvider>
    </>
  );
}

function ListNewsStories() {
  const { data: newsStories } = useQuery(NewsStory, { mode: 'public' });
  return (
    <ul>
      {newsStories?.map((newsStory) => (
        <li key={newsStory.id}>{newsStory.name}</li>
      ))}
    </ul>
  );
}

function PublicSpace() {
  const { ready, name } = useSpace({ mode: 'public' });
  const { data: addresses } = useQuery(Address, { mode: 'public' });

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold">{name}</h1>
      <ul>
        {addresses?.map((address) => (
          <li key={address.id}>{address.name}</li>
        ))}
      </ul>
    </div>
  );
}
