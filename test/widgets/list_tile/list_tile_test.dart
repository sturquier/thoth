import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thoth/widgets/list_tile/list_tile.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a ListTileWidget widget',
      (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      ListTileWidget(
        title: "Répartition des articles par site web",
        isExpanded: false,
        onExpansionChanged: (bool _) {},
        children: const [],
      ),
    );

    expect(find.byType(ExpansionTile), findsOneWidget);
  });
}
