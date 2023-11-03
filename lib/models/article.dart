import 'package:thoth/models/website.dart';

class Article {
  final String id;
  final String title;
  final String? description;
  final String url;
  final String image;
  final DateTime createdAt;
  final Website website;
  bool isFavorite;

  Article(
      {required this.id,
      required this.title,
      this.description,
      required this.url,
      required this.image,
      required this.createdAt,
      required this.website,
      this.isFavorite = false});

  factory Article.fromJson(String id, Map<String, dynamic> json) => Article(
      id: id,
      title: json['title'],
      description: json['description'],
      url: json['url'],
      image: json['image'],
      createdAt: DateTime.fromMillisecondsSinceEpoch(json['createdAt']),
      website: Website.fromJson(Map<String, dynamic>.from(json['website'])),
      isFavorite: json['isFavorite'] ?? false);

  Map<String, dynamic> toJson() => {
        'title': title,
        'description': description,
        'url': url,
        'image': image,
        'createdAt': createdAt.millisecondsSinceEpoch,
        'website': website.toJson(),
        'isFavorite': isFavorite
      };
}
