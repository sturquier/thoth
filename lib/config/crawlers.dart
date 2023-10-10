import 'package:thoth/services/crawlers.dart';

enum CrawlingStatus { notCrawled, crawling, success, failure }

final Map<String, Future<bool> Function()> crawlers = {
  'LogRocket': crawlLogRocket,
};
