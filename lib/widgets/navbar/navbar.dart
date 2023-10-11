import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/config/router.dart';

class ScaffoldWithNavbarWidget extends StatefulWidget {
  final Widget child;

  const ScaffoldWithNavbarWidget({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  State<ScaffoldWithNavbarWidget> createState() =>
      _ScaffoldWithNavbarWidgetState();
}

class _ScaffoldWithNavbarWidgetState extends State<ScaffoldWithNavbarWidget> {
  final List<BottomNavigationBarItem> tabs = [
    const BottomNavigationBarItem(icon: Icon(Icons.home), label: ''),
    const BottomNavigationBarItem(icon: Icon(Icons.account_circle), label: ''),
    const BottomNavigationBarItem(icon: Icon(Icons.settings), label: ''),
  ];

  int _calculateSelectedIndex(BuildContext context) {
    final String location = GoRouterState.of(context).uri.toString();
    final int index = routes.indexWhere((route) => route.path == location);

    return index != -1 ? index : 0;
  }

  void _onItemTapped(int index, BuildContext context) {
    if (index >= 0 && index < routes.length) {
      GoRouter.of(context).go(routes[index].path);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: widget.child,
        bottomNavigationBar: BottomNavigationBar(
            type: BottomNavigationBarType.fixed,
            iconSize: 30,
            showSelectedLabels: false,
            showUnselectedLabels: false,
            items: tabs,
            currentIndex: _calculateSelectedIndex(context),
            onTap: (int idx) => _onItemTapped(idx, context)));
  }
}
