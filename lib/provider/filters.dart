import 'package:flutter_riverpod/flutter_riverpod.dart';

class Filters {
  String? search;
  String? websiteName;
  String? date;
  bool? favorite;

  Filters({this.search, this.websiteName, this.date, this.favorite});

  int get activeFiltersCount {
    int count = 0;

    if (websiteName != null && websiteName!.isNotEmpty) count++;
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
