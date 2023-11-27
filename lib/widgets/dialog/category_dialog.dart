import 'package:flutter/material.dart';
import 'package:thoth/widgets/input/input_text.dart';

enum CategoryDialogMode { creation, selection }

class CategoryDialogWidget extends StatefulWidget {
  final CategoryDialogMode mode;
  final void Function(String)? onCreateCategoryCallback;

  const CategoryDialogWidget(
      {Key? key, required this.mode, this.onCreateCategoryCallback})
      : super(key: key);

  @override
  State<CategoryDialogWidget> createState() => _CategoryDialogWidgetState();
}

class _CategoryDialogWidgetState extends State<CategoryDialogWidget> {
  String? _createdCategoryName;

  bool get _creationButtonEnabled =>
      _createdCategoryName != null && _createdCategoryName!.isNotEmpty;

  @override
  Widget build(BuildContext context) {
    if (widget.mode == CategoryDialogMode.creation) {
      return AlertDialog(
        title: const Text('Créer une catégorie'),
        content: SingleChildScrollView(
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text(
            'Nom *',
            style: TextStyle(fontSize: 16),
          ),
          const SizedBox(
            height: 5,
          ),
          InputTextWidget(
            hintText: 'Saisissez un nom',
            onChangedCallback: (String? categoryName) =>
                setState(() => _createdCategoryName = categoryName),
          )
        ])),
        actions: [
          TextButton(
              onPressed: _creationButtonEnabled
                  ? () =>
                      widget.onCreateCategoryCallback!(_createdCategoryName!)
                  : null,
              child: const Text('CRÉER'))
        ],
      );
    }

    return const AlertDialog(
      title: Text('Sélectionner une catégorie'),
      content: SingleChildScrollView(
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(
          'TODO *',
          style: TextStyle(fontSize: 16),
        ),
      ])),
    );
  }
}
