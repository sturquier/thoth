import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/provider/filters.dart';
import 'package:thoth/services/articles.dart';

final articlesProvider =
    StateNotifierProvider<ArticlesProvider, AsyncValue<List<Article>>>((ref) =>
        ArticlesProvider(ref.watch(filtersProvider), applyFilters: true));

class ArticlesProvider extends StateNotifier<AsyncValue<List<Article>>> {
  final Filters _filters;
  bool _applyFilters;

  ArticlesProvider(this._filters, {bool applyFilters = true})
      : _applyFilters = applyFilters,
        super(const AsyncValue.loading()) {
    fetchArticlesValues();
  }

  void setApplyFilters(bool value) {
    _applyFilters = value;
    fetchArticlesValues();
  }

  Future<void> fetchArticlesValues() async {
    try {
      final List<Article> articles = await fetchArticles();
      final List<Article> filteredArticles =
          _applyFilters ? _filterArticles(articles, _filters) : articles;

      state = AsyncValue.data(filteredArticles);
    } catch (e, stackTrace) {
      state = AsyncValue.error(e, stackTrace);
    }
  }

  List<Article> _filterArticles(List<Article> articles, Filters filters) {
    return articles.where((Article article) {
      final bool matchesSearch = filters.search == null ||
          article.title.toLowerCase().contains(filters.search!.toLowerCase()) ||
          (article.description?.toLowerCase() ?? '')
              .contains(filters.search!.toLowerCase());

      final bool matchesWebsite = filters.website == null ||
          filters.website == 'all' ||
          article.website.name == filters.website;

      final bool matchesDate = filters.date == null ||
          DateFormat('dd/MM/yyyy', 'fr_fr').format(article.createdAt) ==
              filters.date;

      final bool matchesFavorite =
          filters.favorite == null || article.isFavorite == filters.favorite;

      return matchesSearch && matchesWebsite && matchesDate && matchesFavorite;
    }).toList();
  }
}
