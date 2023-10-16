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
        leading: const Icon(Icons.search),
        trailing: _searchController.text.isNotEmpty
            ? [
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () {
                    _searchController.clear();
                    widget.onChangedCallback(null);
                  },
                )
              ]
            : [],
        padding: const MaterialStatePropertyAll(
            EdgeInsets.symmetric(horizontal: 15)),
        onChanged: widget.onChangedCallback);
  }
}
