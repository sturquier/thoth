import 'package:flutter_riverpod/flutter_riverpod.dart';

class Filters {
  String? search;
  String? website;
  String? categoryName;
  String? date;
  bool? favorite;

  Filters(
      {this.search, this.website, this.categoryName, this.date, this.favorite});

  int get activeFiltersCount {
    int count = 0;

    if (website != null && website != 'all') count++;
    if (categoryName != null && categoryName != 'all') count++;
    if (date != null && date!.isNotEmpty) count++;
    if (favorite == true) count++;

    return count;
  }
}

final filtersProvider =
    StateNotifierProvider<FiltersProvider, Filters>((ref) => FiltersProvider());

class FiltersProvider extends StateNotifier<Filters> {
  FiltersProvider() : super(Filters());

  void updateFilters(Filters filters) {
    state = filters;
  }

  int get activeFiltersCount => state.activeFiltersCount;
}
