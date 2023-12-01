import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thoth/widgets/input/input_text.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a InputTextWidget widget',
      (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      InputTextWidget(
        hintText: 'Saisissez une adresse email',
        onChangedCallback: (String? _) {},
      ),
    );

    expect(find.byType(TextField), findsOneWidget);
  });
}
