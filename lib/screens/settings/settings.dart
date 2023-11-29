import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:thoth/config/crawlers.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/models/website.dart';
import 'package:thoth/provider/articles.dart';
import 'package:thoth/widgets/checkbox/checkbox.dart';

class SettingsScreen extends ConsumerStatefulWidget {
  const SettingsScreen({super.key});

  @override
  ConsumerState<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends ConsumerState<SettingsScreen> {
  bool _allWebsitesChecked = false;

  final Map<Website, bool> _checkedWebsites = {
    for (Website website in websites) website: false
  };
  final Map<Website, CrawlingStatus> _crawledWebsites = {
    for (Website website in websites) website: CrawlingStatus.notCrawled
  };

  bool get _buttonEnabled =>
      _checkedWebsites.values.any((bool checked) => checked) &&
      !_crawledWebsites.values
          .any((status) => status == CrawlingStatus.crawling);

  void _crawlWebsites() async {
    final List<Article> existingArticles =
        ref.read(articlesProvider).value ?? [];
    int crawledWebsitesCount = 0;

    for (Website website in websites) {
      if (_checkedWebsites[website] == true) {
        setState(() {
          _crawledWebsites[website] = CrawlingStatus.crawling;
        });

        if (crawlers.containsKey(website.name)) {
          bool success = await crawlers[website.name]!(existingArticles);
          setState(() {
            _crawledWebsites[website] =
                success ? CrawlingStatus.success : CrawlingStatus.failure;
          });

          if (success) {
            crawledWebsitesCount++;
          }
        }
      }
    }

    if (crawledWebsitesCount ==
        _checkedWebsites.values.where((b) => b).length) {
      Fluttertoast.showToast(
          msg: 'Tous les sites web ont été scannés avec succès');
      await ref.read(articlesProvider.notifier).fetchArticlesValues();
    } else {
      Fluttertoast.showToast(
          msg:
              "Une erreur s'est produite lors du scan d'un ou plusieurs sites web");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Paramètres'),
      ),
      body: Stack(children: [
        SingleChildScrollView(
            child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 15),
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(
                        height: 20,
                      ),
                      const Text(
                        'Scanner les sites web',
                        style: TextStyle(fontSize: 18),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      const Divider(),
                      CheckboxListTileWidget(
                          title: 'Tout sélectionner',
                          value: _allWebsitesChecked,
                          onChangedCallback: (bool? value) => setState(() {
                                _allWebsitesChecked = value!;
                                _checkedWebsites.updateAll(
                                    (key, value) => _allWebsitesChecked);
                              })),
                      const SizedBox(
                        height: 10,
                      ),
                      Column(
                          children: websites
                              .map((Website website) => Row(children: [
                                    Expanded(
                                        child: CheckboxListTileWidget(
                                            title: website.name,
                                            value: _checkedWebsites[website] ??
                                                false,
                                            onChangedCallback: (bool? value) =>
                                                setState(() {
                                                  _checkedWebsites[website] =
                                                      value!;
                                                  _allWebsitesChecked =
                                                      _checkedWebsites.values
                                                          .every((element) =>
                                                              element);
                                                }))),
                                    if (_crawledWebsites[website] ==
                                        CrawlingStatus.crawling)
                                      const SizedBox(
                                          height: 20,
                                          width: 20,
                                          child: CircularProgressIndicator()),
                                    if (_crawledWebsites[website] ==
                                        CrawlingStatus.success)
                                      const Icon(Icons.check,
                                          color: Colors.green),
                                    if (_crawledWebsites[website] ==
                                        CrawlingStatus.failure)
                                      const Icon(Icons.close,
                                          color: Colors.red),
                                  ]))
                              .toList()),
                      const SizedBox(
                        height: 80,
                      )
                    ]))),
        Positioned(
            bottom: 15,
            left: 15,
            right: 15,
            child: FilledButton(
              onPressed: _buttonEnabled ? () => _crawlWebsites() : null,
              child: const Text('Scanner'),
            ))
      ]),
    );
  }
}
