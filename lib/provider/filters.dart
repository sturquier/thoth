import 'package:flutter_riverpod/flutter_riverpod.dart';

class ArticleFilters {
  String? search;
  String? websiteName;
  String? date;
  bool? favorite;

  ArticleFilters({this.search, this.websiteName, this.date, this.favorite});

  int get activeFiltersCount {
    int count = 0;

    if (websiteName != null && websiteName!.isNotEmpty) count++;
    if (date != null && date!.isNotEmpty) count++;
    if (favorite == true) count++;

    return count;
  }
}

final filtersProvider = StateNotifierProvider<FiltersProvider, ArticleFilters>(
    (ref) => FiltersProvider());

class FiltersProvider extends StateNotifier<ArticleFilters> {
  FiltersProvider() : super(ArticleFilters());

  void updateFilters(ArticleFilters filters) {
    state = filters;
  }

  int get activeFiltersCount => state.activeFiltersCount;
}
