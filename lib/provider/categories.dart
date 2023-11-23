import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:thoth/services/categories.dart';

final categoriesProvider =
    StateNotifierProvider<CategoriesProvider, AsyncValue<List<String>>>(
        (ref) => CategoriesProvider());

class CategoriesProvider extends StateNotifier<AsyncValue<List<String>>> {
  CategoriesProvider() : super(const AsyncValue.loading()) {
    fetchCategoriesValues();
  }

  Future<void> fetchCategoriesValues() async {
    try {
      final List<String> categories = await fetchCategories();

      state = AsyncValue.data(categories);
    } catch (e, stackTrace) {
      state = AsyncValue.error(e, stackTrace);
    }
  }
}
