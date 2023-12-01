import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thoth/widgets/date_picker/date_picker.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a DatePickerWidget widget',
      (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      DatePickerWidget(
        hintText: 'Sélectionner une date',
        initialDate: DateTime(2024, 1, 1),
        onTapCallback: (String? _) {},
      ),
    );

    expect(find.byType(TextField), findsOneWidget);
  });
}
