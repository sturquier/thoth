import 'package:firebase_database/firebase_database.dart';
import 'package:thoth/config/database.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/services/favorites.dart';

Future<List<Article>> fetchArticles() async {
  final List<Article> articles = [];
  final DatabaseEvent event = await articlesReference.once();
  final List<String> favorites = await fetchFavorites();

  Iterable<DataSnapshot> snapshots = event.snapshot.children;

  for (DataSnapshot snapshot in snapshots) {
    Article article = Article.fromJson(
        snapshot.key!, Map<String, dynamic>.from(snapshot.value as dynamic));

    if (favorites.contains(article.id)) {
      article.isFavorite = true;
    }

    articles.add(article);
  }

  articles.sort((Article a, Article b) => -a.createdAt.compareTo(b.createdAt));

  return articles;
}
