import 'package:flutter/material.dart';

class ArticleDialogWidget extends StatelessWidget {
  const ArticleDialogWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Filtrer'),
      content: const Column(children: [
        Text('TODO'),
        Text('TODO'),
        Text('TODO'),
      ]),
      actions: [
        TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('ANNULER')),
        TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('CONFIRMER'))
      ],
    );
  }
}
