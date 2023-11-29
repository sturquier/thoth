import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/config/authentication.dart';
import 'package:thoth/extensions/format.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/provider/articles.dart';
import 'package:thoth/provider/categories.dart';
import 'package:thoth/services/articles.dart';
import 'package:thoth/services/categories.dart';
import 'package:thoth/services/favorites.dart';
import 'package:thoth/widgets/card/card.dart';
import 'package:thoth/widgets/dialog/category_dialog.dart';

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

  Future<void> _createCategory(String categoryName) async {
    String formattedCategoryName =
        categoryName.isLowerCase() ? categoryName.capitalize() : categoryName;

    if (await existsCategory(formattedCategoryName)) {
      Fluttertoast.showToast(msg: 'Cette catégorie existe déjà');
      return;
    }

    await createCategory(formattedCategoryName);
    await ref.read(categoriesProvider.notifier).fetchCategoriesValues();

    // ignore: use_build_context_synchronously
    GoRouter.of(context).pop();
  }

  Future<void> _removeCategory(String categoryName) async {
    await removeCategory(categoryName);

    await ref.read(categoriesProvider.notifier).fetchCategoriesValues();
    await ref.read(articlesProvider.notifier).fetchArticlesValues();

    // ignore: use_build_context_synchronously
    GoRouter.of(context).pop();
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

  void _openCategoryCreationDialog(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) => CategoryDialogWidget(
              mode: CategoryDialogMode.creation,
              onCallback: (String? categoryName) async =>
                  await _createCategory(categoryName!),
            ));
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

  void _openCategoryRemovalDialog(BuildContext context, String categoryName) {
    showDialog(
        context: context,
        builder: (BuildContext context) => CategoryDialogWidget(
              mode: CategoryDialogMode.removal,
              onCallback: (String? _) async =>
                  await _removeCategory(categoryName),
            ));
  }

  void _reorderCategoriesList(
      int oldIndex, int newIndex, List<String> categories) {
    if (oldIndex < newIndex) {
      int i = 0;
      int end = newIndex - 1;
      int localIndex = oldIndex;
      String startItem = categories[oldIndex];

      do {
        categories[localIndex] = categories[++localIndex];
        i++;
      } while (i < end - oldIndex);

      categories[end] = startItem;
    } else if (oldIndex > newIndex) {
      String startItem = categories[oldIndex];

      for (int i = oldIndex; i > newIndex; i--) {
        categories[i] = categories[i - 1];
      }

      categories[newIndex] = startItem;
    }
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
    final AsyncValue<List<String>> categoriesValue =
        ref.watch(categoriesProvider);

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
                            openCategorySelectionDialogCallback: () =>
                                _openCategorySelectionDialog(context, article,
                                    categoriesValue.asData!.value),
                            removeArticleCategoryCallback: () =>
                                _removeArticleCategory(
                                    article.categoryName!, article.id));
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
      Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        const Text(
          "Mes catégories d'articles",
          style: TextStyle(fontSize: 18),
        ),
        IconButton(
          icon: Icon(
            Icons.create_new_folder_outlined,
            color: Theme.of(context).primaryColor,
          ),
          onPressed: () => _openCategoryCreationDialog(context),
        )
      ]),
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
                : ReorderableListView.builder(
                    onReorder: (int oldIndex, int newIndex) =>
                        _reorderCategoriesList(oldIndex, newIndex, categories),
                    itemCount: categories.length,
                    itemBuilder: (BuildContext context, int index) {
                      final String categoryName = categories[index];

                      return Container(
                          key: ValueKey(index),
                          padding: const EdgeInsets.only(bottom: 10),
                          child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(children: [
                                  ReorderableDragStartListener(
                                    index: index,
                                    child: Icon(
                                      Icons.drag_indicator,
                                      color: Theme.of(context).primaryColor,
                                    ),
                                  ),
                                  const SizedBox(
                                    width: 5,
                                  ),
                                  Text(
                                    categoryName,
                                    style: const TextStyle(fontSize: 16),
                                  )
                                ]),
                                IconButton(
                                    onPressed: () => _openCategoryRemovalDialog(
                                        context, categoryName),
                                    icon: const Icon(
                                      Icons.delete,
                                      color: Colors.red,
                                    ))
                              ]));
                    })),
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
                TabBar(
                  controller: _tabController,
                  tabs: const [
                    Tab(text: 'Informations'),
                    Tab(text: 'Favoris'),
                    Tab(text: 'Catégories')
                  ],
                  labelPadding: const EdgeInsets.symmetric(horizontal: 8),
                ),
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
