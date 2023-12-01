import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/config/authentication.dart';
import 'package:thoth/screens/dashboard/dashboard.dart';
import 'package:thoth/screens/login/login.dart';
import 'package:thoth/screens/profile/profile.dart';
import 'package:thoth/screens/search/search.dart';
import 'package:thoth/screens/settings/settings.dart';
import 'package:thoth/widgets/navbar/navbar.dart';

enum ERoute { dashboard, search, settings, profile, login }

final class AppRoute {
  final ERoute route;
  final String path;
  final Widget Function(BuildContext, GoRouterState) builder;

  const AppRoute({
    required this.route,
    required this.path,
    required this.builder,
  });
}

final List<AppRoute> anonymousRoutes = [
  AppRoute(
    route: ERoute.login,
    path: '/login',
    builder: (BuildContext context, GoRouterState state) => const LoginScreen(),
  )
];

final List<AppRoute> authenticatedRoutes = [
  AppRoute(
    route: ERoute.dashboard,
    path: '/',
    builder: (BuildContext context, GoRouterState state) =>
        const DashboardScreen(),
  ),
  AppRoute(
    route: ERoute.search,
    path: '/search',
    builder: (BuildContext context, GoRouterState state) =>
        const SearchScreen(),
  ),
  AppRoute(
    route: ERoute.settings,
    path: '/settings',
    builder: (BuildContext context, GoRouterState state) =>
        const SettingsScreen(),
  ),
  AppRoute(
    route: ERoute.profile,
    path: '/profile',
    builder: (BuildContext context, GoRouterState state) =>
        const ProfileScreen(),
  ),
];

final GoRouter router = GoRouter(
  initialLocation: isAuthenticated ? '/' : '/login',
  routes: <RouteBase>[
    ShellRoute(
      builder: (BuildContext context, GoRouterState state, Widget child) =>
          child,
      routes: anonymousRoutes
          .map((AppRoute route) => GoRoute(
                path: route.path,
                builder: route.builder,
              ))
          .toList(),
    ),
    ShellRoute(
      builder: (BuildContext context, GoRouterState state, Widget child) =>
          ScaffoldWithNavbarWidget(child: child),
      routes: authenticatedRoutes
          .map((AppRoute route) => GoRoute(
                path: route.path,
                builder: route.builder,
              ))
          .toList(),
    )
  ],
);
