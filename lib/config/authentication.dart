import 'package:firebase_auth/firebase_auth.dart';

final FirebaseAuth authenticationInstance = FirebaseAuth.instance;

User? getCurrentUser() {
  return authenticationInstance.currentUser;
}

bool get isAuthenticated {
  return getCurrentUser() != null;
}

bool get isAnonymous {
  return getCurrentUser() == null;
}

enum AuthErrorType { invalidEmail, invalidLoginCredentials, unknown }

AuthErrorType getErrorType(FirebaseAuthException e) {
  switch (e.code) {
    case 'invalid-email':
      return AuthErrorType.invalidEmail;
    case 'INVALID_LOGIN_CREDENTIALS':
      return AuthErrorType.invalidLoginCredentials;
    default:
      return AuthErrorType.unknown;
  }
}

String getErrorMessage(AuthErrorType errorType) {
  switch (errorType) {
    case AuthErrorType.invalidEmail:
    case AuthErrorType.invalidLoginCredentials:
      return 'Adresse email ou mot de passe invalide';

    default:
      return "Une erreur s'est produite";
  }
}
