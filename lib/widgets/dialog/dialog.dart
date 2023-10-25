import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/models/website.dart';
import 'package:thoth/provider/filters.dart';
import 'package:thoth/widgets/date_picker/date_picker.dart';
import 'package:thoth/widgets/dropdown/dropdown.dart';
import 'package:thoth/widgets/switch/switch.dart';

class ArticleDialogWidget extends StatefulWidget {
  const ArticleDialogWidget({Key? key}) : super(key: key);

  @override
  State<ArticleDialogWidget> createState() => _ArticleDialogWidgetState();
}

class _ArticleDialogWidgetState extends State<ArticleDialogWidget> {
  ArticleFilters? _filters;

  void _resetFilters(BuildContext context, WidgetRef ref) {
    final ArticleFilters currentFilters = ref.read(filtersProvider);
    final FiltersProvider provider = ref.read(filtersProvider.notifier);

    final ArticleFilters updatedFilters = ArticleFilters(
        search: currentFilters.search,
        websiteName: null,
        date: null,
        favorite: false);

    setState(() => _filters = ArticleFilters());
    provider.updateFilters(updatedFilters);
  }

  void _applyFilters(BuildContext context, WidgetRef ref) {
    final ArticleFilters currentFilters = ref.read(filtersProvider);
    final FiltersProvider provider = ref.read(filtersProvider.notifier);

    final ArticleFilters updatedFilters = ArticleFilters(
        search: currentFilters.search,
        websiteName: _filters!.websiteName,
        date: _filters!.date,
        favorite: _filters!.favorite);

    provider.updateFilters(updatedFilters);

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Consumer(
        builder: (BuildContext context, WidgetRef ref, Widget? child) {
      _filters ??= ref.read(filtersProvider);

      return AlertDialog(
        title: const Text('Filtrer'),
        content: SingleChildScrollView(
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Icon(Icons.business, color: Theme.of(context).primaryColor),
            const SizedBox(
              width: 5,
            ),
            const Text(
              'Par site web',
              style: TextStyle(fontSize: 18),
            )
          ]),
          const SizedBox(height: 5),
          DropdownMenuWidget(
              width: MediaQuery.of(context).size.width * 0.6,
              hintText: 'Sélectionner un site',
              initialSelection: _filters!.websiteName ?? '',
              onSelectedCallback: (String? websiteName) =>
                  setState(() => _filters!.websiteName = websiteName),
              entries: [
                '',
                ...websites.map((Website website) => website.name).toList()
              ]),
          const SizedBox(height: 40),
          Row(children: [
            Icon(Icons.event, color: Theme.of(context).primaryColor),
            const SizedBox(
              width: 5,
            ),
            const Text(
              'Par date',
              style: TextStyle(fontSize: 18),
            )
          ]),
          const SizedBox(height: 5),
          SizedBox(
              width: MediaQuery.of(context).size.width * 0.6,
              child: DatePickerWidget(
                  hintText: 'Sélectionner une date',
                  initialDate: _filters!.date != null
                      ? DateFormat('dd/MM/yyyy').parse(_filters!.date!)
                      : null,
                  onTapCallback: (String date) =>
                      setState(() => _filters!.date = date))),
          const SizedBox(height: 40),
          Row(children: [
            Icon(Icons.favorite, color: Theme.of(context).primaryColor),
            const SizedBox(
              width: 5,
            ),
            const Text(
              'Par favoris',
              style: TextStyle(fontSize: 18),
            )
          ]),
          const SizedBox(height: 5),
          SizedBox(
              width: MediaQuery.of(context).size.width * 0.6,
              child: SwitchListTileWidget(
                  title: _filters!.favorite == true
                      ? 'Mes articles favoris'
                      : 'Tous les articles',
                  value: _filters!.favorite ?? false,
                  onChangedCallback: (bool? favorite) =>
                      setState(() => _filters!.favorite = favorite))),
        ])),
        actions: [
          TextButton(
              onPressed: () => _resetFilters(context, ref),
              child: const Text('RÉINITIALISER')),
          TextButton(
              onPressed: () => _applyFilters(context, ref),
              child: const Text('CONFIRMER'))
        ],
      );
    });
  }
}
