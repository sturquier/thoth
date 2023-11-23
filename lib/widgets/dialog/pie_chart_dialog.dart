import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class PieChartDialogWidget extends StatelessWidget {
  final String websiteName;
  final int articlesCount;

  const PieChartDialogWidget(
      {Key? key, required this.websiteName, required this.articlesCount})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(websiteName),
      content: articlesCount > 1
          ? Text(
              '$articlesCount articles',
              style: const TextStyle(fontSize: 18),
            )
          : Text(
              '$articlesCount article',
              style: const TextStyle(fontSize: 18),
            ),
      actions: <Widget>[
        TextButton(
          child: const Text('FERMER'),
          onPressed: () => GoRouter.of(context).pop(),
        ),
      ],
    );
  }
}
