import 'package:firebase_database/firebase_database.dart';
import 'package:thoth/config/authentication.dart';
import 'package:thoth/config/database.dart';

Future<List<String>> fetchCategories() async {
  final List<String> categories = [];
  final DatabaseEvent event =
      await categoriesReference.child(getCurrentUser()!.uid).once();

  Iterable<DataSnapshot> snapshots = event.snapshot.children;

  for (DataSnapshot snapshot in snapshots) {
    categories.add(snapshot.key!);
  }

  return categories;
}
