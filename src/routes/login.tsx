import { useHypergraphApp } from '@graphprotocol/hypergraph-react';
import { createFileRoute } from '@tanstack/react-router';

function Login() {
  const { redirectToConnect } = useHypergraphApp();
  return (
    <div className="flex flex-1 justify-center items-center flex-col gap-4">
    </div>
  );
}

export const Route = createFileRoute('/login')({
  component: Login,
});
