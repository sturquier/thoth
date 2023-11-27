import 'package:flutter/material.dart';

class InputTextWidget extends StatefulWidget {
  final String hintText;
  final void Function(String?) onChangedCallback;
  final Icon? prefixIcon;
  final bool isPassword;

  const InputTextWidget({
    Key? key,
    required this.hintText,
    required this.onChangedCallback,
    this.prefixIcon,
    this.isPassword = false,
  }) : super(key: key);

  @override
  State<InputTextWidget> createState() => _InputTextWidgetState();
}

class _InputTextWidgetState extends State<InputTextWidget> {
  final TextEditingController _inputController = TextEditingController();

  bool _obscureText = false;

  @override
  void initState() {
    super.initState();

    if (widget.isPassword) setState(() => _obscureText = true);
  }

  @override
  void dispose() {
    _inputController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
        controller: _inputController,
        decoration: InputDecoration(
            border: const OutlineInputBorder(),
            hintText: widget.hintText,
            prefixIcon: widget.prefixIcon,
            suffixIcon: widget.isPassword
                ? IconButton(
                    onPressed: () =>
                        setState(() => _obscureText = !_obscureText),
                    icon: _obscureText
                        ? const Icon(Icons.visibility_off)
                        : const Icon(Icons.visibility))
                : null),
        obscureText: widget.isPassword ? _obscureText : false,
        onChanged: widget.onChangedCallback);
  }
}
