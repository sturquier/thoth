import 'package:firebase_database/firebase_database.dart';
import 'package:thoth/config/authentication.dart';
import 'package:thoth/config/database.dart';
import 'package:thoth/models/article.dart';

Future<List<String>> fetchFavorites() async {
  final List<String> favorites = [];
  final DatabaseEvent event =
      await favoritesReference.child(getCurrentUser()!.uid).once();

  Iterable<DataSnapshot> snapshots = event.snapshot.children;

  for (DataSnapshot snapshot in snapshots) {
    favorites.add(snapshot.key!);
  }

  return favorites;
}

Future<void> toggleFavorite(Article article) async {
  final DatabaseReference favoriteReference =
      favoritesReference.child(getCurrentUser()!.uid).child(article.id);

  if (article.isFavorite) {
    await favoriteReference.remove();
  } else {
    await favoriteReference.set(true);
  }
}
