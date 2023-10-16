import 'package:flutter/material.dart';

class DropdownMenuWidget extends StatefulWidget {
  final double width;
  final List<String> entries;

  const DropdownMenuWidget(
      {Key? key, required this.width, required this.entries})
      : super(key: key);

  @override
  State<DropdownMenuWidget> createState() => _DropdownMenuWidgetState();
}

class _DropdownMenuWidgetState extends State<DropdownMenuWidget> {
  @override
  Widget build(BuildContext context) {
    return DropdownMenu(
        width: widget.width,
        dropdownMenuEntries: widget.entries
            .map<DropdownMenuEntry<String>>(
                (String entry) => DropdownMenuEntry(value: entry, label: entry))
            .toList());
  }
}
