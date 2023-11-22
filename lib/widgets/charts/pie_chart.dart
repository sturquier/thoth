import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class PieChart extends StatefulWidget {
  final Map<String, int> articlesCountPerWebsite;

  const PieChart({Key? key, required this.articlesCountPerWebsite})
      : super(key: key);

  @override
  State<PieChart> createState() => _PieChartState();
}

class _PieChartState extends State<PieChart> {
  @override
  Widget build(BuildContext context) {
    return SfCircularChart(series: <CircularSeries>[
      PieSeries<MapEntry<String, int>, String>(
        dataSource: widget.articlesCountPerWebsite.entries.toList(),
        xValueMapper: (MapEntry<String, int> data, _) => data.key,
        yValueMapper: (MapEntry<String, int> data, _) => data.value,
        dataLabelSettings: DataLabelSettings(
            isVisible: true, color: Theme.of(context).primaryColor),
        onPointTap: (ChartPointDetails details) {
          final MapEntry<String, int> tappedPoint = widget
              .articlesCountPerWebsite.entries
              .toList()[details.pointIndex!];
          final String websiteName = tappedPoint.key;
          final int articlesCount = tappedPoint.value;

          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text(websiteName),
                content: articlesCount > 1
                    ? Text(
                        '$articlesCount articles',
                        style: const TextStyle(fontSize: 18),
                      )
                    : Text(
                        '$articlesCount article',
                        style: const TextStyle(fontSize: 18),
                      ),
                actions: <Widget>[
                  TextButton(
                    child: const Text('FERMER'),
                    onPressed: () => GoRouter.of(context).pop(),
                  ),
                ],
              );
            },
          );
        },
      )
    ]);
  }
}
