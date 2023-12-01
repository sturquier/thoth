import 'package:flutter_test/flutter_test.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:thoth/widgets/charts/line_chart.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a LineChart widget', (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      LineChart(
        articlesCountPerDay: {
          DateTime(2023, 2, 12): 4,
          DateTime(2023, 2, 23): 3
        },
      ),
    );

    expect(find.byType(SfCartesianChart), findsOneWidget);
  });
}
