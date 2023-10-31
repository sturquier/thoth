import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/config/authentication.dart';
import 'package:thoth/widgets/input/input_text.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String? _email;
  String? _password;

  bool get _buttonEnabled =>
      _email != null &&
      _email!.isNotEmpty &&
      _password != null &&
      _password!.isNotEmpty;

  void _login() async {
    FocusManager.instance.primaryFocus?.unfocus();

    try {
      await authenticationInstance.signInWithEmailAndPassword(
          email: _email!, password: _password!);
      // ignore: use_build_context_synchronously
      GoRouter.of(context).go('/');
    } on FirebaseAuthException catch (e) {
      Fluttertoast.showToast(msg: getErrorMessage(getErrorType(e)));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Se connecter'),
        centerTitle: true,
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 15),
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Adresse email *',
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(
                height: 5,
              ),
              InputTextWidget(
                  hintText: 'Saisissez une adresse email',
                  prefixIcon: const Icon(Icons.mail_outline),
                  onChangedCallback: (String? email) =>
                      setState(() => _email = email)),
              const SizedBox(
                height: 20,
              ),
              const Text(
                'Mot de passe *',
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(
                height: 5,
              ),
              InputTextWidget(
                  hintText: 'Saisissez un mot de passe',
                  prefixIcon: const Icon(Icons.lock_outline),
                  isPassword: true,
                  onChangedCallback: (String? password) =>
                      setState(() => _password = password)),
              const SizedBox(
                height: 40,
              ),
              Center(
                  child: FilledButton(
                onPressed: _buttonEnabled ? () => _login() : null,
                child: const Text('Se connecter'),
              ))
            ]),
      ),
    );
  }
}
