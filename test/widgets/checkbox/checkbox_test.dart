import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thoth/widgets/checkbox/checkbox.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a CheckboxListTileWidget widget',
      (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      CheckboxListTileWidget(
        title: 'Tout sélectionner',
        value: false,
        onChangedCallback: (bool? _) {},
      ),
    );

    expect(find.byType(CheckboxListTile), findsOneWidget);
  });
}
