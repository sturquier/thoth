import 'package:flutter/material.dart';

class SwitchListTileWidget extends StatelessWidget {
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
  Widget build(BuildContext context) {
    return SwitchListTile(
      contentPadding: EdgeInsets.zero,
      controlAffinity: ListTileControlAffinity.leading,
      title: title != null
          ? Text(
              title!,
              style: const TextStyle(fontSize: 12),
            )
          : null,
      value: value,
      onChanged: onChangedCallback,
    );
  }
}
