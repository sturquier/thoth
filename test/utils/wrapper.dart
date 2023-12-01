import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:network_image_mock/network_image_mock.dart';

pumpWrappedWidget(WidgetTester widgetTester, Widget child) async {
  return await mockNetworkImagesFor(
    () => widgetTester.pumpWidget(
      Localizations(
        delegates: const [
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate
        ],
        locale: const Locale('fr', 'FR'),
        child: child,
      ),
    ),
  );
}
