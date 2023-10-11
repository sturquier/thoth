class Website {
  final String name;
  final String url;

  const Website({
    required this.name,
    required this.url,
  });

  Website.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        url = json['url'];

  Map<String, dynamic> toJson() => {'name': name, 'url': url};
}
