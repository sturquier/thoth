import 'package:flutter/material.dart';

class ListTileWidget extends StatelessWidget {
  final String title;
  final List<Widget> children;
  final bool isExpanded;
  final void Function(bool) onExpansionChanged;

  const ListTileWidget(
      {Key? key,
      required this.title,
      required this.children,
      required this.isExpanded,
      required this.onExpansionChanged})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Theme(
        data: Theme.of(context).copyWith(
            dividerColor: Colors.transparent,
            splashColor: Colors.transparent,
            highlightColor: Colors.transparent),
        child: ListTileTheme(
            contentPadding: EdgeInsets.zero,
            child: ExpansionTile(
                title: Text(
                  title,
                  style: const TextStyle(fontSize: 18),
                ),
                initiallyExpanded: isExpanded,
                onExpansionChanged: onExpansionChanged,
                collapsedIconColor: Theme.of(context).primaryColor,
                children: children)));
  }
}
