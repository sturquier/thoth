import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/widgets/dialog/chart_dialog.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a ChartDialogWidget widget',
      (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      ChartDialogWidget(
        title: websites[0].name,
        articlesCount: 3,
      ),
    );

    expect(find.byType(AlertDialog), findsOneWidget);
  });
}
