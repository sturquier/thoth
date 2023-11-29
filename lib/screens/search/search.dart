import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/provider/articles.dart';
import 'package:thoth/provider/categories.dart';
import 'package:thoth/provider/filters.dart';
import 'package:thoth/services/articles.dart';
import 'package:thoth/services/favorites.dart';
import 'package:thoth/widgets/card/card.dart';
import 'package:thoth/widgets/dialog/category_dialog.dart';
import 'package:thoth/widgets/dialog/filters_dialog.dart';
import 'package:thoth/widgets/input/input_search.dart';

class SearchScreen extends ConsumerStatefulWidget {
  const SearchScreen({super.key});

  @override
  ConsumerState<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends ConsumerState<SearchScreen> {
  @override
  void initState() {
    super.initState();

    ref.read(articlesProvider.notifier).setApplyFilters(true);
  }

  void _handleSearch(String? search) {
    final Filters currentFilters = ref.read(filtersProvider);
    final FiltersProvider provider = ref.read(filtersProvider.notifier);

    final Filters updatedFilters = Filters(
        search: search,
        website: currentFilters.website,
        date: currentFilters.date,
        favorite: currentFilters.favorite);

    provider.updateFilters(updatedFilters);
  }

  void _openFiltersList(BuildContext context, List<String> categories) {
    showDialog(
        context: context,
        builder: (BuildContext context) =>
            FiltersDialogWidget(ref: ref, categories: categories));
  }

  Future<void> _toggleFavorite(Article article) async {
    await toggleFavorite(article);
    await ref.read(articlesProvider.notifier).fetchArticlesValues();
  }

  Future<void> _setArticleCategory(
      String categoryName, String articleId) async {
    await setArticleCategory(categoryName, articleId);

    await ref.read(categoriesProvider.notifier).fetchCategoriesValues();
    await ref.read(articlesProvider.notifier).fetchArticlesValues();

    // ignore: use_build_context_synchronously
    GoRouter.of(context).pop();
  }

  Future<void> _removeArticleCategory(
      String categoryName, String articleId) async {
    await removeArticleCategory(categoryName, articleId);

    await ref.read(categoriesProvider.notifier).fetchCategoriesValues();
    await ref.read(articlesProvider.notifier).fetchArticlesValues();
  }

  void _openCategorySelectionDialog(
      BuildContext context, Article article, List<String> categories) {
    showDialog(
        context: context,
        builder: (BuildContext context) => CategoryDialogWidget(
              mode: CategoryDialogMode.selection,
              categories: categories,
              onCallback: (String? categoryName) =>
                  _setArticleCategory(categoryName!, article.id),
            ));
  }

  @override
  Widget build(BuildContext context) {
    final AsyncValue<List<Article>> articlesValue = ref.watch(articlesProvider);
    final AsyncValue<List<String>> categoriesValue =
        ref.watch(categoriesProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Articles')),
      body: Column(
        children: [
          Container(
              padding: const EdgeInsets.symmetric(horizontal: 15),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(
                      height: 20,
                    ),
                    Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Rechercher des articles',
                            style: TextStyle(fontSize: 18),
                          ),
                          Text(
                            articlesValue.when(
                              loading: () => '',
                              error: (Object _, StackTrace __) => '',
                              data: (List<Article> articles) =>
                                  articles.length > 1
                                      ? '( ${articles.length} résultats )'
                                      : '( ${articles.length} résultat )',
                            ),
                            style: const TextStyle(
                                fontSize: 14, fontStyle: FontStyle.italic),
                          ),
                        ]),
                    const SizedBox(
                      height: 20,
                    ),
                    Row(mainAxisSize: MainAxisSize.min, children: [
                      Expanded(
                          child: InputSearchWidget(
                        hintText: 'Un titre, une description',
                        onChangedCallback: (String? search) =>
                            _handleSearch(search),
                        currentSearch: ref.watch(filtersProvider).search,
                      )),
                      Stack(children: [
                        IconButton(
                            icon: const Icon(Icons.filter_list),
                            onPressed: () => _openFiltersList(
                                context, categoriesValue.asData!.value)),
                        Positioned(
                            top: 3,
                            right: 3,
                            child: Badge(
                              backgroundColor: Theme.of(context).primaryColor,
                              label: Text(ref
                                  .watch(filtersProvider)
                                  .activeFiltersCount
                                  .toString()),
                            ))
                      ])
                    ]),
                    const SizedBox(
                      height: 5,
                    ),
                    const Divider(),
                  ])),
          Expanded(
            child: articlesValue.when(
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (Object error, StackTrace _) => const Center(
                      child: Text(
                        "Une erreur s'est produite",
                        style: TextStyle(fontSize: 18),
                      ),
                    ),
                data: (List<Article> articles) => articles.isEmpty
                    ? Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                            const Text(
                              "Aucun article n'a été trouvé",
                              style: TextStyle(fontSize: 18),
                            ),
                            const SizedBox(height: 10),
                            FilledButton(
                                onPressed: () => _openFiltersList(
                                    context, categoriesValue.asData!.value),
                                child: const Text('Modifier les filtres'))
                          ])
                    : ListView.builder(
                        padding: const EdgeInsets.symmetric(horizontal: 15),
                        itemCount: articles.length,
                        itemBuilder: (BuildContext context, int index) {
                          Article article = articles[index];

                          return ArticleCardWidget(
                            article: article,
                            toggleFavoriteCallback: () =>
                                _toggleFavorite(article),
                            openCategorySelectionDialogCallback: () =>
                                _openCategorySelectionDialog(context, article,
                                    categoriesValue.asData!.value),
                            removeArticleCategoryCallback: () =>
                                _removeArticleCategory(
                                    article.categoryName!, article.id),
                          );
                        },
                      )),
          ),
        ],
      ),
    );
  }
}
