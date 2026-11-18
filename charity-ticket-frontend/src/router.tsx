import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import {
  CheckoutRouteView,
  LandingRouteView,
  PassesRouteView,
  RootLayout,
} from '@/components/layout/AppLayout';
import type { CheckoutStep } from '@/features/checkout/CheckoutProgressHeader';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingRouteView,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  validateSearch: (search: Record<string, unknown>): { step: CheckoutStep } => {
    const raw = Number(search.step);
    const validStep: CheckoutStep =
      raw === 1 || raw === 2 || raw === 3 || raw === 4 ? raw : 1;
    return { step: validStep };
  },
  component: CheckoutRouteView,
});

const passesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/passes',
  component: PassesRouteView,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  checkoutRoute,
  passesRoute,
]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: LandingRouteView,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
