import 'package:flutter_test/flutter_test.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/widgets/charts/pie_chart.dart';

import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a PieChart widget', (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      PieChart(
        articlesCountPerWebsite: {websites[0].name: 4, websites[1].name: 3},
      ),
    );

    expect(find.byType(SfCircularChart), findsOneWidget);
  });
}
