import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class LineChart extends StatelessWidget {
  final Map<DateTime, int> articlesCountPerDay;

  const LineChart({Key? key, required this.articlesCountPerDay})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SfCartesianChart(
      primaryXAxis: DateTimeAxis(
          intervalType: DateTimeIntervalType.days,
          dateFormat: DateFormat('dd/MM'),
          majorGridLines: const MajorGridLines(width: 0),
          labelIntersectAction: AxisLabelIntersectAction.rotate45,
          interval: 1),
      primaryYAxis: NumericAxis(
        edgeLabelPlacement: EdgeLabelPlacement.shift,
        interval: 1,
        majorGridLines: const MajorGridLines(width: 0),
      ),
      series: <ChartSeries>[
        LineSeries<MapEntry<DateTime, int>, DateTime>(
            dataSource: articlesCountPerDay.entries
                .where((MapEntry<DateTime, int> entry) => entry.value > 0)
                .toList(),
            xValueMapper: (MapEntry<DateTime, int> data, _) => data.key,
            yValueMapper: (MapEntry<DateTime, int> data, _) => data.value,
            dataLabelSettings: const DataLabelSettings(isVisible: true),
            color: Theme.of(context).primaryColor),
      ],
    );
  }
}
