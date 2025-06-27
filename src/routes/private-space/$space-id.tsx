import { Address, City } from '@/schema';
import { HypergraphSpaceProvider, useCreateEntity, useQuery, useSpace } from '@graphprotocol/hypergraph-react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/private-space/$space-id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { 'space-id': spaceId } = Route.useParams();

  return (
    <HypergraphSpaceProvider space={spaceId}>
      <PrivateSpace />
    </HypergraphSpaceProvider>
  );
}

function PrivateSpace() {
  const { name, ready } = useSpace({ mode: 'private' });
  const { data: addresses } = useQuery(Address, { mode: 'private', include: { city: { include: { name: true } } } });
  const createCity = useCreateEntity(City);
  const createAddress = useCreateEntity(Address);
  const [cityName, setCityName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');

  if (!ready) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id: cityId } = createCity({ name: cityName, description: 'Beautiful city' });
    createAddress({ name: addressLine1, city: [cityId], addressLine1 });
    setCityName('');
    setAddressLine1('');
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold">{name}</h1>
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span className="text-sm font-bold">City</span>
          <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold">Address</span>
          <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
        </label>
        <button type="submit">Create Address</button>
      </form>

      {addresses?.map((address) => (
        <div key={address.id}>
          {address.name}, {address.city[0].name}
        </div>
      ))}
    </div>
  );
}
