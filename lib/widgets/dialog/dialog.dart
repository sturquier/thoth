import 'package:flutter/material.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/models/website.dart';
import 'package:thoth/widgets/date_picker/date_picker.dart';
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
      content: SingleChildScrollView(
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text(
          'Par site web',
          style: TextStyle(fontSize: 18),
        ),
        const SizedBox(height: 5),
        DropdownMenuWidget(
            width: MediaQuery.of(context).size.width * 0.6,
            hintText: 'Sélectionner un site',
            entries: [
              '',
              ...websites.map((Website website) => website.name).toList()
            ]),
        const SizedBox(height: 40),
        const Text(
          'Par date',
          style: TextStyle(fontSize: 18),
        ),
        const SizedBox(height: 5),
        SizedBox(
            width: MediaQuery.of(context).size.width * 0.6,
            child: DatePickerWidget(
                hintText: 'Sélectionner une date',
                onTapCallback: (String date) => print('TODO'))),
        const SizedBox(height: 40),
        const Text(
          'Par favoris',
          style: TextStyle(fontSize: 18),
        ),
        const SizedBox(height: 5),
        SizedBox(
            width: MediaQuery.of(context).size.width * 0.6,
            child: SwitchListTileWidget(
                title: 'Par favoris',
                value: false,
                onChangedCallback: (bool? value) => print('TODO'),
                secondary: const Icon(
                  Icons.favorite,
                  color: Colors.pink,
                ))),
      ])),
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
