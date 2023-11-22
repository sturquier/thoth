import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/provider/articles.dart';
import 'package:thoth/widgets/charts/pie_chart.dart';

class DashboardScreen extends ConsumerStatefulWidget {
  const DashboardScreen({super.key});

  @override
  ConsumerState<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends ConsumerState<DashboardScreen> {
  Map<String, int> getArticlesCountPerWebsite(List<Article> articles) {
    Map<String, List<Article>> groupedArticles =
        groupBy(articles, (Article a) => a.website.name);

    return groupedArticles
        .map((website, articles) => MapEntry(website, articles.length));
  }

  @override
  Widget build(BuildContext context) {
    final AsyncValue<List<Article>> articlesValue = ref.watch(articlesProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard'),
      ),
      body: articlesValue.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (Object error, StackTrace _) => const Center(
          child:
              Text("Une erreur s'est produite", style: TextStyle(fontSize: 18)),
        ),
        data: (List<Article> articles) => articles.isEmpty
            ? Center(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                    const Text(
                      "Aucune donnée n'a été trouvée",
                      style: TextStyle(fontSize: 18),
                    ),
                    const SizedBox(height: 10),
                    FilledButton(
                        onPressed: () => GoRouter.of(context).go('/settings'),
                        child: const Text('Scanner les sites web'))
                  ]))
            : Container(
                padding: const EdgeInsets.symmetric(horizontal: 15),
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 20),
                      Theme(
                          data: Theme.of(context).copyWith(
                              dividerColor: Colors.transparent,
                              splashColor: Colors.transparent,
                              highlightColor: Colors.transparent),
                          child: ListTileTheme(
                              contentPadding: EdgeInsets.zero,
                              child: ExpansionTile(
                                  title: const Text(
                                    "Nombre d'articles par site web",
                                    style: TextStyle(fontSize: 18),
                                  ),
                                  initiallyExpanded: true,
                                  collapsedIconColor:
                                      Theme.of(context).primaryColor,
                                  children: [
                                    PieChart(
                                        articlesCountPerWebsite:
                                            getArticlesCountPerWebsite(
                                                articles))
                                  ])))
                    ]),
              ),
      ),
    );
  }
}
