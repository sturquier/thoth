import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:thoth/widgets/dialog/pie_chart_dialog.dart';

class PieChart extends StatelessWidget {
  final Map<String, int> articlesCountPerWebsite;

  const PieChart({Key? key, required this.articlesCountPerWebsite})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SfCircularChart(series: <CircularSeries>[
      PieSeries<MapEntry<String, int>, String>(
        dataSource: articlesCountPerWebsite.entries.toList(),
        xValueMapper: (MapEntry<String, int> data, _) => data.key,
        yValueMapper: (MapEntry<String, int> data, _) => data.value,
        dataLabelSettings: DataLabelSettings(
            isVisible: true, color: Theme.of(context).primaryColor),
        onPointTap: (ChartPointDetails details) {
          final MapEntry<String, int> tappedPoint =
              articlesCountPerWebsite.entries.toList()[details.pointIndex!];
          final String websiteName = tappedPoint.key;
          final int articlesCount = tappedPoint.value;

          showDialog(
              context: context,
              builder: (BuildContext context) => PieChartDialogWidget(
                    websiteName: websiteName,
                    articlesCount: articlesCount,
                  ));
        },
      )
    ]);
  }
}
