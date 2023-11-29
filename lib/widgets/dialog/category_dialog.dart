import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/widgets/dropdown/dropdown.dart';
import 'package:thoth/widgets/input/input_text.dart';

enum CategoryDialogMode { creation, selection, removal }

class CategoryDialogWidget extends ConsumerStatefulWidget {
  final CategoryDialogMode mode;
  final void Function(String?) onCallback;
  final List<String> categories;

  const CategoryDialogWidget({
    Key? key,
    required this.mode,
    required this.onCallback,
    this.categories = const [],
  }) : super(key: key);

  @override
  ConsumerState<CategoryDialogWidget> createState() =>
      _CategoryDialogWidgetState();
}

class _CategoryDialogWidgetState extends ConsumerState<CategoryDialogWidget> {
  String? _categoryName;

  bool get _confirmationButtonEnabled =>
      _categoryName != null && _categoryName!.isNotEmpty;

  void _cancelDialog(BuildContext context) {
    GoRouter.of(context).pop();
  }

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
                setState(() => _categoryName = categoryName),
          )
        ])),
        actions: [
          TextButton(
              onPressed: () => _cancelDialog(context),
              child: const Text('ANNULER')),
          TextButton(
              onPressed: _confirmationButtonEnabled
                  ? () => widget.onCallback(_categoryName!)
                  : null,
              child: const Text('CONFIRMER'))
        ],
      );
    }

    if (widget.mode == CategoryDialogMode.removal) {
      return AlertDialog(
        title: const Text('Supprimer une catégorie'),
        content: const SingleChildScrollView(
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(
            'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
            style: TextStyle(fontSize: 16),
          )
        ])),
        actions: [
          TextButton(
              onPressed: () => _cancelDialog(context),
              child: const Text('ANNULER')),
          TextButton(
              onPressed: () => widget.onCallback(null),
              child: const Text('CONFIRMER'))
        ],
      );
    }

    return AlertDialog(
        title: const Text('Sélectionner une catégorie'),
        content: SingleChildScrollView(
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          widget.categories.isEmpty
              ? const Center(
                  child: Text(
                  "Aucune catégorie n'a été trouvée",
                  style: TextStyle(fontSize: 16),
                ))
              : DropdownMenuWidget(
                  width: MediaQuery.of(context).size.width * 0.6,
                  hintText: 'Sélectionner une catégorie',
                  onSelectedCallback: (String? categoryName) =>
                      setState(() => _categoryName = categoryName),
                  entries: [
                      ...widget.categories
                          .map((String categoryName) => DropdownEntry(
                              value: categoryName, label: categoryName))
                          .toList()
                    ]),
        ])),
        actions: [
          TextButton(
              onPressed: () => _cancelDialog(context),
              child: const Text('ANNULER')),
          TextButton(
              onPressed: _confirmationButtonEnabled
                  ? () => widget.onCallback(_categoryName!)
                  : null,
              child: const Text('CONFIRMER'))
        ]);
  }
}
