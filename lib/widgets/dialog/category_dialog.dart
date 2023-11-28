import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:thoth/provider/categories.dart';
import 'package:thoth/widgets/dropdown/dropdown.dart';
import 'package:thoth/widgets/input/input_text.dart';

enum CategoryDialogMode { creation, selection, removal }

class CategoryDialogWidget extends ConsumerStatefulWidget {
  final CategoryDialogMode mode;
  final void Function(String?) onCallback;

  const CategoryDialogWidget({
    Key? key,
    required this.mode,
    required this.onCallback,
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
    final AsyncValue<List<String>> categoriesValue =
        ref.watch(categoriesProvider);

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
          categoriesValue.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (Object error, StackTrace stackTrace) => const Center(
                    child: Text(
                      "Une erreur s'est produite",
                      style: TextStyle(fontSize: 16),
                    ),
                  ),
              data: (List<String> categories) => categories.isEmpty
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
                          ...categories
                              .map((String categoryName) => DropdownEntry(
                                  value: categoryName, label: categoryName))
                              .toList()
                        ])),
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
