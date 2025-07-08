import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useHypergraphApp, useHypergraphAuth } from '@graphprotocol/hypergraph-react';
import { Link, useRouter } from '@tanstack/react-router';

export function Navbar() {
  const { authenticated } = useHypergraphAuth();
  const { redirectToConnect, logout } = useHypergraphApp();
  const router = useRouter();

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

  const handleLogout = () => {
    logout();
    router.navigate({
      to: '/login',
    });
  };

  return (
    <TooltipProvider>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold">
                My Hypergraph App
              </Link>
            </div>

            {/* Navigation Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <NavigationMenuTrigger disabled={!authenticated}>My Spaces</NavigationMenuTrigger>
                      </div>
                    </TooltipTrigger>
                    {!authenticated && (
                      <TooltipContent>
                        <p>Sign in to access your private and public spaces</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">My Private Spaces</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Access your private spaces
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">My Public Spaces</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Access your public spaces
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Button */}
            <div className="flex items-center space-x-4">
              {authenticated ? (
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              ) : (
                <Button onClick={handleSignIn}>Sign in with Geo Connect</Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
