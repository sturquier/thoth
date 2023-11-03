import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/services/articles.dart';

final articlesProvider =
    StateNotifierProvider<ArticlesProvider, AsyncValue<List<Article>>>(
        (ref) => ArticlesProvider());

class ArticlesProvider extends StateNotifier<AsyncValue<List<Article>>> {
  ArticlesProvider() : super(const AsyncValue.loading()) {
    fetchArticlesValues();
  }

  Future<void> fetchArticlesValues() async {
    try {
      final List<Article> articles = await fetchArticles();
      state = AsyncValue.data(articles);
    } catch (e, stackTrace) {
      state = AsyncValue.error(e, stackTrace);
    }
  }
}
