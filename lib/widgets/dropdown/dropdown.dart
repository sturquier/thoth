import 'package:flutter/material.dart';

class DropdownMenuWidget extends StatefulWidget {
  final double width;
  final String hintText;
  final String initialSelection;
  final List<String> entries;
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
  State<DropdownMenuWidget> createState() => _DropdownMenuWidgetState();
}

class _DropdownMenuWidgetState extends State<DropdownMenuWidget> {
  @override
  Widget build(BuildContext context) {
    return DropdownMenu(
        width: widget.width,
        hintText: widget.hintText,
        initialSelection: widget.initialSelection,
        onSelected: widget.onSelectedCallback,
        dropdownMenuEntries: widget.entries
            .map<DropdownMenuEntry<String>>(
                (String entry) => DropdownMenuEntry(value: entry, label: entry))
            .toList());
  }
}
