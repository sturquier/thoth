import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/provider/articles.dart';
import 'package:thoth/provider/filters.dart';
import 'package:thoth/services/favorites.dart';
import 'package:thoth/widgets/card/card.dart';
import 'package:thoth/widgets/dialog/dialog.dart';
import 'package:thoth/widgets/input/input_search.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  List<Article> _filteredArticles(List<Article> articles) {
    final Filters filters = ref.watch(filtersProvider);

    if (filters.search != null) {
      articles = articles.where((Article article) {
        final String search = filters.search!.toLowerCase();

        return article.title.toLowerCase().contains(search) ||
            (article.description?.toLowerCase() ?? '').contains(search);
      }).toList();
    }

    if (filters.websiteName != null) {
      articles = articles
          .where(
              (Article article) => article.website.name == filters.websiteName)
          .toList();
    }

    if (filters.date != null) {
      articles = articles
          .where((Article article) =>
              DateFormat('dd/MM/yyyy', 'fr_fr').format(article.createdAt) ==
              filters.date)
          .toList();
    }

    if (filters.favorite == true) {
      articles = articles
          .where((Article article) => article.isFavorite == true)
          .toList();
    }

    return articles;
  }

  void _handleSearch(String? search) {
    final Filters currentFilters = ref.read(filtersProvider);
    final FiltersProvider provider = ref.read(filtersProvider.notifier);

    final Filters updatedFilters = Filters(
        search: search,
        websiteName: currentFilters.websiteName,
        date: currentFilters.date,
        favorite: currentFilters.favorite);

    provider.updateFilters(updatedFilters);
  }

  void _openFiltersList(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) => ArticleDialogWidget(ref: ref));
  }

  void _toggleFavorite(Article article) async {
    await toggleFavorite(article);
    await ref.read(articlesProvider.notifier).fetchArticlesValues();
  }

  @override
  Widget build(BuildContext context) {
    final AsyncValue<List<Article>> articlesValue = ref.watch(articlesProvider);

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
                    const Text(
                      'Rechercher des articles',
                      style: TextStyle(fontSize: 18),
                    ),
                    const SizedBox(
                      height: 5,
                    ),
                    Row(mainAxisSize: MainAxisSize.min, children: [
                      Expanded(
                          child: InputSearchWidget(
                              hintText: 'Un titre, une description',
                              onChangedCallback: (String? search) =>
                                  _handleSearch(search))),
                      Stack(children: [
                        IconButton(
                            icon: const Icon(Icons.filter_list),
                            onPressed: () => _openFiltersList(context)),
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
                error: (Object error, StackTrace stackTrace) => const Center(
                      child: Text(
                        "Une erreur s'est produite",
                        style: TextStyle(fontSize: 18),
                      ),
                    ),
                data: (List<Article> articles) => _filteredArticles(articles)
                        .isEmpty
                    ? Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                            const Text(
                              "Aucun article n'a été trouvé",
                              style: TextStyle(fontSize: 18),
                            ),
                            const SizedBox(height: 10),
                            FilledButton(
                                onPressed: () => _openFiltersList(context),
                                child: const Text('Modifier les filtres'))
                          ])
                    : ListView.builder(
                        padding: const EdgeInsets.symmetric(horizontal: 15),
                        itemCount: _filteredArticles(articles).length,
                        itemBuilder: (BuildContext context, int index) {
                          Article article = _filteredArticles(articles)[index];

                          return ArticleCardWidget(
                              article: article,
                              toggleFavoriteCallback: () =>
                                  _toggleFavorite(article));
                        },
                      )),
          ),
        ],
      ),
    );
  }
}
