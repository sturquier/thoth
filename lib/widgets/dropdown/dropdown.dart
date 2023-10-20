import 'package:flutter/material.dart';

class DropdownMenuWidget extends StatefulWidget {
  final double width;
  final String hintText;
  final List<String> entries;

  const DropdownMenuWidget(
      {Key? key,
      required this.width,
      required this.hintText,
      required this.entries})
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
        dropdownMenuEntries: widget.entries
            .map<DropdownMenuEntry<String>>(
                (String entry) => DropdownMenuEntry(value: entry, label: entry))
            .toList());
  }
}
