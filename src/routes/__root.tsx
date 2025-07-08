import { useHypergraphAuth } from '@graphprotocol/hypergraph-react';
import { createRootRoute, Link, Outlet, useLayoutEffect, useRouter } from '@tanstack/react-router';
import { Logout } from '../components/logout';

const Root = () => {
  const { authenticated } = useHypergraphAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (
      router.state.location.href.startsWith('/login') ||
      router.state.location.href.startsWith('/authenticate-success')
    ) {
      return;
    }

    if (!authenticated) {
      router.navigate({
        to: '/login',
      });
    }
  }, [authenticated, router]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">My Hypergraph App</h1>
        <Link to="/">Home</Link>
        <Logout />
      </div>
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
