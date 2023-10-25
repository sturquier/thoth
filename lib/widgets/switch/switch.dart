import 'package:flutter/material.dart';

class SwitchListTileWidget extends StatefulWidget {
  final String? title;
  final bool value;
  final void Function(bool?) onChangedCallback;

  const SwitchListTileWidget(
      {Key? key,
      this.title,
      required this.value,
      required this.onChangedCallback})
      : super(key: key);

  @override
  State<SwitchListTileWidget> createState() => _SwitchListTileWidgetState();
}

class _SwitchListTileWidgetState extends State<SwitchListTileWidget> {
  @override
  Widget build(BuildContext context) {
    return SwitchListTile(
      contentPadding: EdgeInsets.zero,
      controlAffinity: ListTileControlAffinity.leading,
      title: widget.title != null
          ? Text(
              widget.title!,
              style: const TextStyle(fontSize: 12),
            )
          : null,
      value: widget.value,
      onChanged: widget.onChangedCallback,
    );
  }
}
