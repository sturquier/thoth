import 'package:flutter/material.dart';

class InputSearchWidget extends StatefulWidget {
  final void Function(String?) onChangedCallback;

  const InputSearchWidget({Key? key, required this.onChangedCallback})
      : super(key: key);

  @override
  State<InputSearchWidget> createState() => _InputSearchWidgetState();
}

class _InputSearchWidgetState extends State<InputSearchWidget> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SearchBar(
      controller: _searchController,
      onChanged: widget.onChangedCallback,
    );
  }
}
