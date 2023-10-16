import 'package:flutter/material.dart';

class SwitchListTileWidget extends StatefulWidget {
  final String title;
  final bool value;
  final void Function(bool?) onChangedCallback;
  final Widget secondary;

  const SwitchListTileWidget(
      {Key? key,
      required this.title,
      required this.value,
      required this.onChangedCallback,
      required this.secondary})
      : super(key: key);

  @override
  State<SwitchListTileWidget> createState() => _SwitchListTileWidgetState();
}

class _SwitchListTileWidgetState extends State<SwitchListTileWidget> {
  @override
  Widget build(BuildContext context) {
    return SwitchListTile(
      contentPadding: EdgeInsets.zero,
      title: Text(widget.title),
      value: widget.value,
      onChanged: widget.onChangedCallback,
      secondary: widget.secondary,
    );
  }
}
