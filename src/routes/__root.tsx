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
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="flex justify-between items-center">
          <Link to="/">My Hypergraph App</Link>
          <Logout />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
