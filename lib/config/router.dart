import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/screens/home/home.dart';
import 'package:thoth/screens/profile/profile.dart';
import 'package:thoth/screens/settings/settings.dart';
import 'package:thoth/widgets/navbar/navbar.dart';

enum ERoute { home, profile, settings }

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

final List<AppRoute> routes = [
  AppRoute(
    route: ERoute.home,
    path: '/',
    builder: (context, state) => const HomeScreen(),
  ),
  AppRoute(
    route: ERoute.profile,
    path: '/profile',
    builder: (context, state) => const ProfileScreen(),
  ),
  AppRoute(
    route: ERoute.settings,
    path: '/settings',
    builder: (context, state) => const SettingsScreen(),
  ),
];

final GoRouter router = GoRouter(
  initialLocation: '/',
  routes: <RouteBase>[
    ShellRoute(
      builder: (BuildContext context, GoRouterState state, Widget child) =>
          ScaffoldWithNavbarWidget(child: child),
      routes: routes
          .map((route) => GoRoute(
                path: route.path,
                builder: route.builder,
              ))
          .toList(),
    )
  ],
);
