import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/models/route.dart';
import 'package:thoth/screens/home/home.dart';
import 'package:thoth/screens/profile/profile.dart';
import 'package:thoth/widgets/navbar/navbar.dart';

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
  // Add other route definitions as needed
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
