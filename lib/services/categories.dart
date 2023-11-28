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

Future<Map<String, String>> fetchCategoriesMap() async {
  final Map<String, String> articleCategory = {};
  final DatabaseEvent event =
      await categoriesReference.child(getCurrentUser()!.uid).once();

  Iterable<DataSnapshot> snapshots = event.snapshot.children;

  for (DataSnapshot snapshot in snapshots) {
    String categoryName = snapshot.key!;
    for (DataSnapshot articleSnapshot in snapshot.children) {
      articleCategory[articleSnapshot.key!] = categoryName;
    }
  }

  return articleCategory;
}

Future<void> createCategory(String categoryName) async {
  final DatabaseReference categoryReference =
      categoriesReference.child(getCurrentUser()!.uid).child(categoryName);

  await categoryReference.set(true);
}

Future<void> removeCategory(String categoryName) async {
  final DatabaseReference categoryReference =
      categoriesReference.child(getCurrentUser()!.uid).child(categoryName);

  await categoryReference.remove();
}

Future<bool> existsCategory(String categoryName) async {
  final DatabaseReference categoryReference =
      categoriesReference.child(getCurrentUser()!.uid).child(categoryName);

  DatabaseEvent event = await categoryReference.once();

  return event.snapshot.exists;
}
