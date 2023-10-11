import 'package:firebase_database/firebase_database.dart';
import 'package:thoth/config/database.dart';
import 'package:thoth/models/article.dart';

Future<List<Article>> fetchArticles() async {
  final List<Article> articles = [];
  final DatabaseEvent event = await articlesReference.once();

  Iterable<DataSnapshot> snapshots = event.snapshot.children;

  for (DataSnapshot snapshot in snapshots) {
    articles.add(
        Article.fromJson(Map<String, dynamic>.from(snapshot.value as dynamic)));
  }

  return articles;
}
