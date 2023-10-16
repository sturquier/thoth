import 'package:thoth/models/website.dart';

class Article {
  final String title;
  final String? description;
  final String url;
  final String image;
  final DateTime createdAt;
  final Website website;

  const Article(
      {required this.title,
      this.description,
      required this.url,
      required this.image,
      required this.createdAt,
      required this.website});

  Article.fromJson(Map<String, dynamic> json)
      : title = json['title'],
        description = json['description'],
        url = json['url'],
        image = json['image'],
        createdAt = DateTime.fromMillisecondsSinceEpoch(json['createdAt']),
        website = Website.fromJson(Map<String, dynamic>.from(json['website']));

  Map<String, dynamic> toJson() => {
        'title': title,
        'description': description,
        'url': url,
        'image': image,
        'createdAt': createdAt.millisecondsSinceEpoch,
        'website': website.toJson()
      };
}
