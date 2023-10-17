import 'package:thoth/models/website.dart';

enum EWebsite { itnext, logRocket, octoTalks, towardsDataScience }

extension WebsiteExtension on EWebsite {
  String get name {
    switch (this) {
      case EWebsite.itnext:
        return 'ITNext';
      case EWebsite.logRocket:
        return 'LogRocket';
      case EWebsite.octoTalks:
        return 'Octo Talks';
      case EWebsite.towardsDataScience:
        return 'Towards Data Science';
    }
  }
}

final List<Website> websites = [
  Website(name: EWebsite.itnext.name, url: 'https://itnext.io'),
  Website(name: EWebsite.logRocket.name, url: 'https://blog.logrocket.com'),
  Website(name: EWebsite.octoTalks.name, url: 'https://blog.octo.com'),
  Website(
      name: EWebsite.towardsDataScience.name,
      url: 'https://towardsdatascience.com')
];
