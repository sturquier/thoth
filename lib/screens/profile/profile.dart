import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/config/authentication.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  void _logout() {
    authenticationInstance
        .signOut()
        .then((void _) => GoRouter.of(context).go('/login'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil'),
      ),
      body: Stack(children: [
        Container(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 20,
                ),
                const Text(
                  'Mes informations personnelles',
                  style: TextStyle(fontSize: 18),
                ),
                const SizedBox(
                  height: 10,
                ),
                const Divider(),
                const SizedBox(
                  height: 20,
                ),
                const Text(
                  'Adresse email',
                  style: TextStyle(fontSize: 16),
                ),
                const SizedBox(
                  height: 5,
                ),
                Text(getCurrentUser()!.email!),
              ],
            )),
        Positioned(
            bottom: 15,
            left: 15,
            right: 15,
            child: ElevatedButton(
                onPressed: _logout,
                child: const Text(
                  'Se déconnecter',
                  style: TextStyle(fontSize: 16),
                )))
      ]),
    );
  }
}
