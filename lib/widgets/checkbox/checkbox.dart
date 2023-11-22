import 'package:flutter/material.dart';

class CheckboxListTileWidget extends StatelessWidget {
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
  Widget build(BuildContext context) {
    return CheckboxListTile(
        controlAffinity: ListTileControlAffinity.leading,
        contentPadding: EdgeInsets.zero,
        title: Text(title),
        value: value,
        onChanged: onChangedCallback);
  }
}
