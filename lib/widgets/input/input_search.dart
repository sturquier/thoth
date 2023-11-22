import 'package:flutter/material.dart';

class InputSearchWidget extends StatefulWidget {
  final String hintText;
  final void Function(String?) onChangedCallback;
  final String? currentSearch;

  const InputSearchWidget(
      {Key? key,
      required this.hintText,
      required this.onChangedCallback,
      this.currentSearch})
      : super(key: key);

  @override
  State<InputSearchWidget> createState() => _InputSearchWidgetState();
}

class _InputSearchWidgetState extends State<InputSearchWidget> {
  late final TextEditingController _searchController;

  @override
  void initState() {
    super.initState();

    _searchController = TextEditingController(text: widget.currentSearch);
  }

  @override
  void dispose() {
    _searchController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SearchBar(
        controller: _searchController,
        hintText: widget.hintText,
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
