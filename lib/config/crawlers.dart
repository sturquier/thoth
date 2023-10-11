import 'package:thoth/models/article.dart';
import 'package:thoth/services/crawlers.dart';

enum CrawlingStatus { notCrawled, crawling, success, failure }

final Map<String, Future<bool> Function(List<Article> existingArticles)>
    crawlers = {
  'LogRocket': crawlLogRocket,
};
