import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/models/website.dart';
import 'package:thoth/provider/filters.dart';
import 'package:thoth/widgets/date_picker/date_picker.dart';
import 'package:thoth/widgets/dropdown/dropdown.dart';
import 'package:thoth/widgets/switch/switch.dart';

class ArticleDialogWidget extends StatefulWidget {
  final WidgetRef ref;

  const ArticleDialogWidget({Key? key, required this.ref}) : super(key: key);

  @override
  State<ArticleDialogWidget> createState() => _ArticleDialogWidgetState();
}

class _ArticleDialogWidgetState extends State<ArticleDialogWidget> {
  Filters? _filters;

  void _resetFilters(BuildContext context) {
    final Filters currentFilters = widget.ref.read(filtersProvider);
    final FiltersProvider provider = widget.ref.read(filtersProvider.notifier);

    final Filters updatedFilters = Filters(
        search: currentFilters.search,
        website: 'all',
        date: null,
        favorite: null);

    setState(() => _filters = Filters());
    provider.updateFilters(updatedFilters);
  }

  void _applyFilters(BuildContext context) {
    final Filters currentFilters = widget.ref.read(filtersProvider);
    final FiltersProvider provider = widget.ref.read(filtersProvider.notifier);

    final Filters updatedFilters = Filters(
        search: currentFilters.search,
        website: _filters!.website,
        date: _filters!.date,
        favorite: _filters!.favorite);

    provider.updateFilters(updatedFilters);

    GoRouter.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    _filters ??= widget.ref.read(filtersProvider);

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
            initialSelection: _filters!.website ?? 'all',
            onSelectedCallback: (String? website) =>
                setState(() => _filters!.website = website),
            entries: [
              DropdownEntry(value: 'all', label: 'Tous les sites'),
              ...websites
                  .map((Website website) =>
                      DropdownEntry(value: website.name, label: website.name))
                  .toList()
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
                onTapCallback: (String? date) =>
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
            onPressed: () => _resetFilters(context),
            child: const Text('RÉINITIALISER')),
        TextButton(
            onPressed: () => _applyFilters(context),
            child: const Text('CONFIRMER'))
      ],
    );
  }
}
