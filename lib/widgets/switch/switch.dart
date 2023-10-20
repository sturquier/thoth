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
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Switch(
        value: widget.value,
        onChanged: widget.onChangedCallback,
      ),
      trailing: SizedBox(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              widget.title,
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(width: 5),
            widget.secondary,
          ],
        ),
      ),
    );
  }
}
