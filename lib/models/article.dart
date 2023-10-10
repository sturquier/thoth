class Article {
  final String title;

  const Article({
    required this.title,
  });

  Article.fromJson(Map<String, dynamic> json) : title = json['title'];

  Map<String, dynamic> toJson() => {'title': title};
}
