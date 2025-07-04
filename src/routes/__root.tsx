import { useHypergraphApp, useHypergraphAuth } from '@graphprotocol/hypergraph-react';
import { createRootRoute, Link, Outlet, useLayoutEffect, useRouter } from '@tanstack/react-router';
import { Logout } from '../components/logout';

const Root = () => {
  const { authenticated } = useHypergraphAuth();
  const { redirectToConnect } = useHypergraphApp();
  const router = useRouter();

  const handleConnect = () => {
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
          {authenticated ? (
            <Logout />
          ) : (
            <button type="button" className="btn" onClick={handleConnect}>
              Connect
            </button>
          )}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
