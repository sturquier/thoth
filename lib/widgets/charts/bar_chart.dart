import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:thoth/widgets/dialog/chart_dialog.dart';

class BarChart extends StatelessWidget {
  final Map<String, int> articlesCountPerCategory;

  const BarChart({Key? key, required this.articlesCountPerCategory})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SfCartesianChart(
      primaryXAxis: CategoryAxis(),
      primaryYAxis: NumericAxis(),
      series: <ChartSeries>[
        BarSeries<MapEntry<String, int>, String>(
          dataSource: articlesCountPerCategory.entries.toList(),
          xValueMapper: (MapEntry<String, int> data, _) => data.key,
          yValueMapper: (MapEntry<String, int> data, _) => data.value,
          color: Theme.of(context).primaryColor,
          dataLabelSettings: DataLabelSettings(
            isVisible: true,
            color: Theme.of(context).primaryColorLight,
          ),
          onPointTap: (ChartPointDetails details) {
            final MapEntry<String, int> tappedPoint =
                articlesCountPerCategory.entries.toList()[details.pointIndex!];
            final String categoryName = tappedPoint.key;
            final int articlesCount = tappedPoint.value;

            showDialog(
                context: context,
                builder: (BuildContext context) => ChartDialogWidget(
                      title: categoryName,
                      articlesCount: articlesCount,
                    ));
          },
        )
      ],
    );
  }
}
