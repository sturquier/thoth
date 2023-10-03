import 'package:flutter/material.dart';
import 'package:thoth/config/website.dart';
import 'package:thoth/models/website.dart';
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
  final Map<Website, bool> _fetchingWebsites = {
    for (Website website in websites) website: false
  };

  bool get _buttonEnabled =>
      _checkedWebsites.values.any((bool checked) => checked) &&
      !_fetchingWebsites.values.any((bool checked) => checked);

  void _crawlWebsites() {
    for (Website website in websites) {
      if (_checkedWebsites[website] == true) {
        setState(() {
          _fetchingWebsites[website] = true;
        });
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
                'Sélectionnez les sites web à scanner',
                style: TextStyle(fontSize: 18),
              ),
              const SizedBox(
                height: 5,
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
                  final website = websites[index];

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
                    if (_fetchingWebsites[website] == true)
                      const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator()),
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
