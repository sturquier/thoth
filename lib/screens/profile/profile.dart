import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/config/authentication.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/provider/articles.dart';
import 'package:thoth/provider/categories.dart';
import 'package:thoth/services/favorites.dart';
import 'package:thoth/widgets/card/card.dart';

class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();

    ref.read(articlesProvider.notifier).setApplyFilters(false);

    _tabController = TabController(length: 3, vsync: this);
    _tabController.addListener(_handleTabSelection);
  }

  @override
  void dispose() {
    _tabController.removeListener(_handleTabSelection);
    _tabController.dispose();

    super.dispose();
  }

  void _handleTabSelection() {
    if (_tabController.indexIsChanging) {
      setState(() {});
    }
  }

  void _logout() {
    authenticationInstance
        .signOut()
        .then((void _) => GoRouter.of(context).go('/login'));
  }

  void _toggleFavorite(Article article) async {
    await toggleFavorite(article);
    await ref.read(articlesProvider.notifier).fetchArticlesValues();
  }

  Widget _buildInformationsTab() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Text(
        'Mes informations personnelles',
        style: TextStyle(fontSize: 18),
      ),
      const SizedBox(
        height: 30,
      ),
      const Text(
        'Adresse email',
        style: TextStyle(fontSize: 16),
      ),
      const SizedBox(
        height: 5,
      ),
      Text(getCurrentUser()!.email!)
    ]);
  }

  Widget _buildFavoritesTab() {
    final AsyncValue<List<Article>> articlesValue = ref.watch(articlesProvider);

    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        const Text(
          'Mes articles favoris',
          style: TextStyle(fontSize: 18),
        ),
        Text(
          articlesValue.when(
              loading: () => '',
              error: (Object _, StackTrace __) => '',
              data: (List<Article> articles) {
                final favorites = articles
                    .where((Article article) => article.isFavorite)
                    .toList();

                return favorites.length > 1
                    ? '( ${favorites.length} résultats )'
                    : '( ${favorites.length} résultat )';
              }),
          style: const TextStyle(fontSize: 14, fontStyle: FontStyle.italic),
        )
      ]),
      const SizedBox(
        height: 30,
      ),
      Expanded(
        child: articlesValue.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (Object error, StackTrace stackTrace) => const Center(
                  child: Text(
                    "Une erreur s'est produite",
                    style: TextStyle(fontSize: 18),
                  ),
                ),
            data: (List<Article> articles) {
              final favorites = articles
                  .where((Article article) => article.isFavorite)
                  .toList();

              return favorites.isEmpty
                  ? const Center(
                      child: Text(
                      "Aucun favori n'a été trouvé",
                      style: TextStyle(fontSize: 18),
                    ))
                  : ListView.builder(
                      itemCount: favorites.length,
                      itemBuilder: (BuildContext context, int index) {
                        Article article = favorites[index];

                        return ArticleCardWidget(
                          article: article,
                          toggleFavoriteCallback: () =>
                              _toggleFavorite(article),
                          openCategoryDialogCallback: () => print('TODO'),
                        );
                      },
                    );
            }),
      )
    ]);
  }

  Widget _buildCategoriesTab() {
    final AsyncValue<List<String>> categoriesValue =
        ref.watch(categoriesProvider);

    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Text(
        "Mes catégories d'articles",
        style: TextStyle(fontSize: 18),
      ),
      const SizedBox(
        height: 30,
      ),
      Expanded(
        child: categoriesValue.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (Object error, StackTrace stackTrace) => const Center(
                  child: Text(
                    "Une erreur s'est produite",
                    style: TextStyle(fontSize: 18),
                  ),
                ),
            data: (List<String> categories) => categories.isEmpty
                ? const Center(
                    child: Text(
                    "Aucune catégorie n'a été trouvée",
                    style: TextStyle(fontSize: 18),
                  ))
                : ListView(
                    children: categories
                        .map((String categoryName) => Text(categoryName))
                        .toList())),
      ),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil'),
      ),
      body: Stack(children: [
        Container(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: Column(
              children: [
                TabBar(controller: _tabController, tabs: const [
                  Tab(text: 'Informations'),
                  Tab(text: 'Favoris'),
                  Tab(text: 'Catégories')
                ]),
                const SizedBox(
                  height: 20,
                ),
                Expanded(
                    child: TabBarView(controller: _tabController, children: [
                  _buildInformationsTab(),
                  _buildFavoritesTab(),
                  _buildCategoriesTab()
                ])),
              ],
            )),
        if (_tabController.index == 0) ...[
          Positioned(
              bottom: 15,
              left: 15,
              right: 15,
              child: ElevatedButton(
                  onPressed: _logout,
                  child: const Text(
                    'Se déconnecter',
                    style: TextStyle(fontSize: 16),
                  )))
        ]
      ]),
    );
  }
}
