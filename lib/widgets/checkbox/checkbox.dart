import 'package:flutter/material.dart';

class CheckboxListTileWidget extends StatefulWidget {
  final String title;
  final bool value;
  final void Function(bool?) onChangedCallback;

  const CheckboxListTileWidget(
      {Key? key,
      required this.title,
      required this.value,
      required this.onChangedCallback})
      : super(key: key);

  @override
  State<CheckboxListTileWidget> createState() => _CheckboxListTileWidgetState();
}

class _CheckboxListTileWidgetState extends State<CheckboxListTileWidget> {
  @override
  Widget build(BuildContext context) {
    return CheckboxListTile(
        controlAffinity: ListTileControlAffinity.leading,
        contentPadding: EdgeInsets.zero,
        title: Text(widget.title),
        value: widget.value,
        onChanged: widget.onChangedCallback);
  }
}
