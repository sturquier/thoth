import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:thoth/widgets/card/card.dart';

import '../../mocks/article.dart';
import '../../utils/wrapper.dart';

void main() {
  testWidgets('finds a ArticleCardWidget widget',
      (WidgetTester widgetTester) async {
    await pumpWrappedWidget(
      widgetTester,
      ArticleCardWidget(
        article: articlesMock[0],
        toggleFavoriteCallback: () {},
        openCategorySelectionDialogCallback: () {},
        removeArticleCategoryCallback: () {},
      ),
    );

    expect(find.byType(Card), findsOneWidget);
  });
}
