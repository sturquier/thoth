import 'package:thoth/config/websites.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/services/crawlers/crawler_all_about_algorithms.dart';
import 'package:thoth/services/crawlers/crawler_angular_blog.dart';
import 'package:thoth/services/crawlers/crawler_engineering_at_meta.dart';
import 'package:thoth/services/crawlers/crawler_ionic_blog.dart';
import 'package:thoth/services/crawlers/crawler_it_next.dart';
import 'package:thoth/services/crawlers/crawler_log_rocket.dart';
import 'package:thoth/services/crawlers/crawler_netflix_tech_blog.dart';
import 'package:thoth/services/crawlers/crawler_octo_talks.dart';
import 'package:thoth/services/crawlers/crawler_towards_data_science.dart';

enum CrawlingStatus { notCrawled, crawling, success, failure }

final Map<String, Future<bool> Function(List<Article> existingArticles)>
    crawlers = {
  EWebsite.allAboutAlgorithms.name: crawlAllAboutAlgorithms,
  EWebsite.angularBlog.name: crawlAngularBlog,
  EWebsite.engineeringAtMeta.name: crawlEngineeringAtMeta,
  EWebsite.ionicBlog.name: crawlIonicBlog,
  EWebsite.itnext.name: crawlITNext,
  EWebsite.logRocket.name: crawlLogRocket,
  EWebsite.netflixTechBlog.name: crawlNetflixTechBlog,
  EWebsite.octoTalks.name: crawlOctoTalks,
  EWebsite.towardsDataScience.name: crawlTowardsDataScience
};
