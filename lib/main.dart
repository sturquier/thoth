import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:thoth/config/firebase_options.dart';
import 'package:thoth/config/router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const ThothApp());
}

class ThothApp extends StatelessWidget {
  const ThothApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      theme: ThemeData.light(useMaterial3: true),
      routerConfig: router,
    );
  }
}
