import 'package:thoth/config/websites.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/services/crawlers/crawler_it_next.dart';
import 'package:thoth/services/crawlers/crawler_log_rocket.dart';
import 'package:thoth/services/crawlers/crawler_octo_talks.dart';
import 'package:thoth/services/crawlers/crawler_towards_data_science.dart';

enum CrawlingStatus { notCrawled, crawling, success, failure }

final Map<String, Future<bool> Function(List<Article> existingArticles)>
    crawlers = {
  EWebsite.itnext.name: crawlITNext,
  EWebsite.logRocket.name: crawlLogRocket,
  EWebsite.octoTalks.name: crawlOctoTalks,
  EWebsite.towardsDataScience.name: crawlTowardsDataScience
};
