import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/config/dashboard.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/provider/articles.dart';
import 'package:thoth/widgets/charts/line_chart.dart';
import 'package:thoth/widgets/charts/pie_chart.dart';
import 'package:thoth/widgets/list_tile/list_tile.dart';

class DashboardScreen extends ConsumerStatefulWidget {
  const DashboardScreen({super.key});

  @override
  ConsumerState<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends ConsumerState<DashboardScreen> {
  ChartType? _expandedChartType = ChartType.countPerWebsite;

  @override
  void initState() {
    super.initState();

    ref.read(articlesProvider.notifier).setApplyFilters(false);
  }

  Map<String, int> _getArticlesCountPerWebsite(List<Article> articles) {
    Map<String, List<Article>> groupedArticles =
        groupBy(articles, (Article a) => a.website.name);

    return groupedArticles
        .map((website, articles) => MapEntry(website, articles.length));
  }

  Map<DateTime, int> _getArticlesCountPerDay(List<Article> articles) {
    DateTime now = DateTime.now();
    DateTime oneWeekAgo = now.subtract(const Duration(days: 7));

    Map<DateTime, int> countPerDay = {};

    for (int i = 0; i <= 7; i++) {
      countPerDay[oneWeekAgo.add(Duration(days: i))] = 0;
    }

    for (Article article in articles) {
      DateTime articleDate = DateTime(article.createdAt.year,
          article.createdAt.month, article.createdAt.day);
      if (articleDate.isAfter(oneWeekAgo) && articleDate.isBefore(now)) {
        countPerDay.update(articleDate, (value) => value + 1,
            ifAbsent: () => 1);
      }
    }

    return countPerDay;
  }

  Widget _buildChartTile(ChartType chartType, String title, Widget chart) {
    return ListTileWidget(
      key: UniqueKey(),
      title: title,
      isExpanded: _expandedChartType == chartType,
      onExpansionChanged: (bool expanded) {
        setState(() {
          if (expanded) {
            _expandedChartType = chartType;
          } else {
            _expandedChartType = null;
          }
        });
      },
      children: [chart],
    );
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
            : SingleChildScrollView(
                child: Column(children: [
                const SizedBox(height: 20),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 15),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildChartTile(
                            ChartType.countPerWebsite,
                            "Répartition du nombre d'articles par site web",
                            PieChart(
                                articlesCountPerWebsite:
                                    _getArticlesCountPerWebsite(articles))),
                        _buildChartTile(
                            ChartType.evolLast7Days,
                            "Évolution du nombre d'articles au cours des 7 derniers jours",
                            LineChart(
                                articlesCountPerDay:
                                    _getArticlesCountPerDay(articles)))
                      ]),
                )
              ])),
      ),
    );
  }
}
