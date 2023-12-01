import 'package:flutter_test/flutter_test.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:thoth/widgets/charts/bar_chart.dart';

import '../../mocks/category.dart';
import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a BarChart widget', (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      BarChart(
        articlesCountPerCategory: {categoriesMock[0]: 4, categoriesMock[1]: 3},
      ),
    );

    expect(find.byType(SfCartesianChart), findsOneWidget);
  });
}
