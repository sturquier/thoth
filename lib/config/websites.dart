import 'package:thoth/models/website.dart';

enum EWebsite {
  allAboutAlgorithms,
  angularBlog,
  engineeringAtMeta,
  ionicBlog,
  itnext,
  logRocket,
  netflixTechBlog,
  octoTalks,
  towardsDataScience
}

extension WebsiteExtension on EWebsite {
  String get name {
    switch (this) {
      case EWebsite.allAboutAlgorithms:
        return 'All About Algorithms';
      case EWebsite.angularBlog:
        return 'Angular Blog';
      case EWebsite.engineeringAtMeta:
        return 'Engineering at Meta';
      case EWebsite.ionicBlog:
        return 'Ionic Blog';
      case EWebsite.itnext:
        return 'ITNext';
      case EWebsite.logRocket:
        return 'LogRocket';
      case EWebsite.netflixTechBlog:
        return 'Netflix TechBlog';
      case EWebsite.octoTalks:
        return 'Octo Talks';
      case EWebsite.towardsDataScience:
        return 'Towards Data Science';
    }
  }
}

final List<Website> websites = [
  Website(
      name: EWebsite.allAboutAlgorithms.name,
      url: 'https://allaboutalgorithms.com'),
  Website(name: EWebsite.angularBlog.name, url: 'https://blog.angular.io'),
  Website(
      name: EWebsite.engineeringAtMeta.name, url: 'https://engineering.fb.com'),
  Website(name: EWebsite.ionicBlog.name, url: 'https://ionic.io/blog'),
  Website(name: EWebsite.itnext.name, url: 'https://itnext.io'),
  Website(name: EWebsite.logRocket.name, url: 'https://blog.logrocket.com'),
  Website(
      name: EWebsite.netflixTechBlog.name, url: 'https://netflixtechblog.com'),
  Website(name: EWebsite.octoTalks.name, url: 'https://blog.octo.com'),
  Website(
      name: EWebsite.towardsDataScience.name,
      url: 'https://towardsdatascience.com')
];
