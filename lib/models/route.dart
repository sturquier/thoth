import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

enum ERoute { home, profile, settings }

class AppRoute {
  final ERoute route;
  final String path;
  final Widget Function(BuildContext, GoRouterState) builder;

  const AppRoute({
    required this.route,
    required this.path,
    required this.builder,
  });
}
