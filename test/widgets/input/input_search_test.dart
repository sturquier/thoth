import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thoth/widgets/input/input_search.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a InputSearchWidget widget',
      (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      InputSearchWidget(
        hintText: 'Un titre, une description',
        onChangedCallback: (String? _) {},
      ),
    );

    expect(find.byType(SearchBar), findsOneWidget);
  });
}
