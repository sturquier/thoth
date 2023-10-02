import 'package:flutter/material.dart';
import 'package:thoth/config/router.dart';

void main() {
  runApp(const ThothApp());
}

class ThothApp extends StatelessWidget {
  const ThothApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: router,
    );
  }
}
