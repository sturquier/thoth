import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thoth/widgets/switch/switch.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a SwitchListTileWidget widget',
      (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      SwitchListTileWidget(
        title: 'Tous les articles',
        value: false,
        onChangedCallback: (bool? _) {},
      ),
    );

    expect(find.byType(SwitchListTile), findsOneWidget);
  });
}
