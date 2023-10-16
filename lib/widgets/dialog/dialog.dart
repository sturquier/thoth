import 'package:flutter/material.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/models/website.dart';
import 'package:thoth/widgets/dropdown/dropdown.dart';
import 'package:thoth/widgets/switch/switch.dart';

class ArticleDialogWidget extends StatelessWidget {
  const ArticleDialogWidget({Key? key}) : super(key: key);

  void _applyFilters(BuildContext context) {
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Filtrer'),
      content: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text(
          'Site web',
          style: TextStyle(fontSize: 18),
        ),
        DropdownMenuWidget(
            width: MediaQuery.of(context).size.width * 0.6,
            entries: websites.map((Website website) => website.name).toList()),
        SwitchListTileWidget(
            title: 'Favoris',
            value: false,
            onChangedCallback: (bool? value) => print('TODO'),
            secondary: const Icon(
              Icons.favorite,
              color: Colors.pink,
            )),
        const Text('TODO'),
      ]),
      actions: [
        TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('ANNULER')),
        TextButton(
            onPressed: () => _applyFilters(context),
            child: const Text('CONFIRMER'))
      ],
    );
  }
}
