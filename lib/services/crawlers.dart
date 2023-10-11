import 'package:html/dom.dart';
import 'package:html/parser.dart' as parser;
import 'package:http/http.dart' as http;
import 'package:thoth/config/database.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/models/website.dart';

Future<bool> crawlLogRocket() async {
  final List<Article> articles = [];
  final String url =
      websites.firstWhere((Website website) => website.name == 'LogRocket').url;

  final http.Response response = await http.get(Uri.parse(url));

  if (response.statusCode == 200) {
    final Document document = parser.parse(response.body);

    final Element? postsSection =
        document.getElementsByClassName('featured-posts').isNotEmpty
            ? document.getElementsByClassName('featured-posts')[0]
            : null;

    if (postsSection == null) return false;

    List<Element> posts = postsSection.getElementsByClassName('col-md-6');

    if (posts.isEmpty) return false;

    for (Element post in posts) {
      Element? title = post.getElementsByTagName('h2').isNotEmpty
          ? post.getElementsByTagName('h2')[0]
          : null;

      if (title == null) return false;

      articles.add(Article.fromJson({'title': title.text}));
    }

    if (articles.isEmpty) return false;

    for (Article article in articles) {
      articlesReference.push().set(article.toJson());
    }

    return true;
  }

  return false;
}
