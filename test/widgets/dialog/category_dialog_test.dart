import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thoth/widgets/dialog/category_dialog.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a CategoryDialogWidget widget',
      (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      CategoryDialogWidget(
        mode: CategoryDialogMode.selection,
        onCallback: (String? _) {},
        categories: const [],
      ),
    );

    expect(find.byType(AlertDialog), findsOneWidget);
  });
}
