import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class DatePickerWidget extends StatefulWidget {
  final String hintText;
  final DateTime? initialDate;
  final void Function(String?) onTapCallback;

  const DatePickerWidget(
      {Key? key,
      required this.hintText,
      this.initialDate,
      required this.onTapCallback})
      : super(key: key);

  @override
  State<DatePickerWidget> createState() => _DatePickerWidgetState();
}

class _DatePickerWidgetState extends State<DatePickerWidget> {
  final TextEditingController _datePickerController = TextEditingController();

  @override
  void initState() {
    super.initState();

    _updateDatePickerText();
  }

  @override
  void didUpdateWidget(DatePickerWidget oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (oldWidget.initialDate != widget.initialDate) {
      _updateDatePickerText();
    }
  }

  @override
  void dispose() {
    _datePickerController.dispose();

    super.dispose();
  }

  void _updateDatePickerText() {
    if (widget.initialDate != null) {
      _datePickerController.text =
          DateFormat('dd/MM/yyyy').format(widget.initialDate!);
    } else {
      _datePickerController.clear();
    }
  }

  void _resetDate() {
    _datePickerController.clear();
    widget.onTapCallback(null);
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
        controller: _datePickerController,
        decoration: InputDecoration(
            hintText: widget.hintText,
            suffixIcon: _datePickerController.text.isNotEmpty
                ? IconButton(
                    onPressed: _resetDate, icon: const Icon(Icons.close))
                : null),
        readOnly: true,
        onTap: () async {
          DateTime? pickedDate = await showDatePicker(
              context: context,
              locale: const Locale('fr', 'FR'),
              initialEntryMode: DatePickerEntryMode.calendarOnly,
              initialDate: widget.initialDate ?? DateTime.now(),
              firstDate: DateTime(1900),
              lastDate: DateTime.now());

          if (pickedDate != null) {
            String formattedDate = DateFormat('dd/MM/yyyy').format(pickedDate);

            setState(() => _datePickerController.text = formattedDate);
            widget.onTapCallback(formattedDate);
          }
        });
  }
}
