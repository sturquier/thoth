import 'package:flutter/material.dart';

final class DropdownEntry {
  final String value;
  final String label;

  DropdownEntry({required this.value, required this.label});
}

class DropdownMenuWidget extends StatelessWidget {
  final double width;
  final String hintText;
  final String initialSelection;
  final List<DropdownEntry> entries;
  final void Function(String?) onSelectedCallback;

  const DropdownMenuWidget(
      {Key? key,
      required this.width,
      required this.hintText,
      required this.initialSelection,
      required this.entries,
      required this.onSelectedCallback})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return DropdownMenu(
        width: width,
        hintText: hintText,
        initialSelection: initialSelection,
        onSelected: onSelectedCallback,
        dropdownMenuEntries: entries
            .map<DropdownMenuEntry<String>>((DropdownEntry entry) =>
                DropdownMenuEntry(value: entry.value, label: entry.label))
            .toList());
  }
}
