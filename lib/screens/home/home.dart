import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/provider/filters.dart';
import 'package:thoth/services/articles.dart';
import 'package:thoth/widgets/card/card.dart';
import 'package:thoth/widgets/dialog/dialog.dart';
import 'package:thoth/widgets/input/input_search.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<List<Article>> _articles;

  @override
  void initState() {
    super.initState();

    _articles = fetchArticles();
  }

  List<Article> _filteredArticles(List<Article> articles, WidgetRef ref) {
    final ArticleFilters filters = ref.watch(filtersProvider);

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
      print(filters.favorite);
    }

    return articles;
  }

  void _handleSearch(String? search, WidgetRef ref) {
    final ArticleFilters currentFilters = ref.read(filtersProvider);
    final FiltersProvider provider = ref.read(filtersProvider.notifier);

    final ArticleFilters updatedFilters = ArticleFilters(
        search: search,
        websiteName: currentFilters.websiteName,
        date: currentFilters.date,
        favorite: currentFilters.favorite);

    provider.updateFilters(updatedFilters);
  }

  void _openFiltersList(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) => const ArticleDialogWidget());
  }

  @override
  Widget build(BuildContext context) {
    return Consumer(
        builder: (BuildContext context, WidgetRef ref, Widget? child) =>
            Scaffold(
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
                                          _handleSearch(search, ref))),
                              Stack(children: [
                                IconButton(
                                    icon: const Icon(Icons.filter_list),
                                    onPressed: () => _openFiltersList(context)),
                                Positioned(
                                    top: 3,
                                    right: 3,
                                    child: Badge(
                                      backgroundColor:
                                          Theme.of(context).primaryColor,
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
                    child: FutureBuilder<List<Article>>(
                      future: _articles,
                      builder: (BuildContext context,
                          AsyncSnapshot<List<Article>> snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return const Center(
                              child: CircularProgressIndicator());
                        } else if (!snapshot.hasData ||
                            snapshot.data!.isEmpty) {
                          return Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text(
                                  "Aucun article n'a été trouvé",
                                  style: TextStyle(fontSize: 18),
                                ),
                                const SizedBox(height: 10),
                                FilledButton(
                                    onPressed: () =>
                                        GoRouter.of(context).go('/settings'),
                                    child: const Text('Scanner des sites web'))
                              ]);
                        } else {
                          List<Article> filteredArticles =
                              _filteredArticles(snapshot.data!, ref);

                          if (filteredArticles.isEmpty) {
                            return Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  const Text(
                                    "Aucun article n'a été trouvé",
                                    style: TextStyle(fontSize: 18),
                                  ),
                                  const SizedBox(height: 10),
                                  FilledButton(
                                      onPressed: () =>
                                          _openFiltersList(context),
                                      child: const Text('Modifier les filtres'))
                                ]);
                          }

                          return ListView.builder(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            itemCount: filteredArticles.length,
                            itemBuilder: (BuildContext context, int index) {
                              Article article = filteredArticles[index];

                              return ArticleCardWidget(article: article);
                            },
                          );
                        }
                      },
                    ),
                  ),
                ],
              ),
            ));
  }
}
