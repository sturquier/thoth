import 'package:flutter/material.dart';
import 'package:thoth/config/crawlers.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/models/website.dart';
import 'package:thoth/services/articles.dart';
import 'package:thoth/widgets/checkbox/checkbox.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});
  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
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
    final List<Article> existingArticles = await fetchArticles();

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
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Paramètres'),
      ),
      body: Stack(children: [
        Container(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
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
                        _checkedWebsites
                            .updateAll((key, value) => _allWebsitesChecked);
                      })),
              const SizedBox(
                height: 10,
              ),
              Expanded(
                  child: ListView.builder(
                itemCount: websites.length,
                itemBuilder: (BuildContext context, int index) {
                  final Website website = websites[index];

                  return Row(children: [
                    Expanded(
                        child: CheckboxListTileWidget(
                            title: websites[index].name,
                            value: _checkedWebsites[website] ?? false,
                            onChangedCallback: (bool? value) => setState(() {
                                  _checkedWebsites[website] = value!;
                                  _allWebsitesChecked = _checkedWebsites.values
                                      .every((element) => element);
                                }))),
                    if (_crawledWebsites[website] == CrawlingStatus.crawling)
                      const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator()),
                    if (_crawledWebsites[website] == CrawlingStatus.success)
                      const Icon(Icons.check, color: Colors.green),
                    if (_crawledWebsites[website] == CrawlingStatus.failure)
                      const Icon(Icons.close, color: Colors.red),
                  ]);
                },
              )),
            ])),
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
