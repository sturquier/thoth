import 'package:firebase_database/firebase_database.dart';
import 'package:thoth/config/authentication.dart';
import 'package:thoth/config/database.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/services/categories.dart';
import 'package:thoth/services/favorites.dart';

Future<List<Article>> fetchArticles() async {
  final List<Article> articles = [];
  final DatabaseEvent event = await articlesReference.once();
  final List<String> favorites = await fetchFavorites();
  final Map<String, String> articleCategoryMap = await fetchCategoriesMap();

  Iterable<DataSnapshot> snapshots = event.snapshot.children;

  for (DataSnapshot snapshot in snapshots) {
    Article article = Article.fromJson(
        snapshot.key!, Map<String, dynamic>.from(snapshot.value as dynamic));

    if (favorites.contains(article.id)) {
      article.isFavorite = true;
    }

    article.categoryName = articleCategoryMap[article.id];

    articles.add(article);
  }

  articles.sort((Article a, Article b) => -a.createdAt.compareTo(b.createdAt));

  return articles;
}

Future<void> createArticle(Article article) async {
  await articlesReference.push().set(article.toJson());
}

Future<void> setArticleCategory(String categoryName, String articleId) async {
  final DatabaseReference categoryArticleReference = categoriesReference
      .child(getCurrentUser()!.uid)
      .child(categoryName)
      .child(articleId);

  await categoryArticleReference.set(true);
}

Future<void> removeArticleCategory(
    String categoryName, String articleId) async {
  final DatabaseReference categoryArticleReference = categoriesReference
      .child(getCurrentUser()!.uid)
      .child(categoryName)
      .child(articleId);

  await categoryArticleReference.remove();
}
