import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class LineChart extends StatelessWidget {
  final Map<DateTime, int> articlesCountPerDay;

  const LineChart({Key? key, required this.articlesCountPerDay})
      : super(key: key);

  List<MapEntry<DateTime, int>> get dataSource {
    return articlesCountPerDay.entries
        .where((MapEntry<DateTime, int> entry) => entry.value > 0)
        .toList();
  }

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
            dataSource: dataSource,
            xValueMapper: (MapEntry<DateTime, int> data, _) => data.key,
            yValueMapper: (MapEntry<DateTime, int> data, _) => data.value,
            dataLabelSettings: DataLabelSettings(
                isVisible: true,
                color: Colors.transparent,
                builder: (dynamic data, dynamic point, dynamic series,
                        int pointIndex, int seriesIndex) =>
                    Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: Theme.of(context).primaryColorLight,
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: Text(data.value.toString()),
                    )),
            color: Theme.of(context).primaryColor),
        ScatterSeries<MapEntry<DateTime, int>, DateTime>(
            dataSource: dataSource,
            xValueMapper: (MapEntry<DateTime, int> data, _) => data.key,
            yValueMapper: (MapEntry<DateTime, int> data, _) => data.value,
            markerSettings: MarkerSettings(
                isVisible: true,
                color: Theme.of(context).primaryColorLight,
                borderColor: Theme.of(context).primaryColorLight))
      ],
    );
  }
}
