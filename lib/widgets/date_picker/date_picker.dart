import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class DatePickerWidget extends StatefulWidget {
  final String hintText;
  final void Function(String) onTapCallback;

  const DatePickerWidget(
      {Key? key, required this.hintText, required this.onTapCallback})
      : super(key: key);

  @override
  State<DatePickerWidget> createState() => _DatePickerWidgetState();
}

class _DatePickerWidgetState extends State<DatePickerWidget> {
  final TextEditingController _datePickerController = TextEditingController();

  @override
  void dispose() {
    _datePickerController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
        controller: _datePickerController,
        decoration: InputDecoration(hintText: widget.hintText),
        readOnly: true,
        onTap: () async {
          DateTime? pickedDate = await showDatePicker(
              context: context,
              locale: const Locale('fr', 'FR'),
              initialEntryMode: DatePickerEntryMode.calendarOnly,
              initialDate: DateTime.now(),
              firstDate: DateTime(1900),
              lastDate: DateTime(2100));

          if (pickedDate != null) {
            String formattedDate = DateFormat('dd/MM/yyyy').format(pickedDate);

            setState(() => _datePickerController.text = formattedDate);
            widget.onTapCallback(formattedDate);
          }
        });
  }
}
