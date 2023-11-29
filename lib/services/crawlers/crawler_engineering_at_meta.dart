import 'package:html/dom.dart';
import 'package:html/parser.dart' as parser;
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/extensions/format.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/models/website.dart';
import 'package:thoth/services/articles.dart';

Future<bool> crawlEngineeringAtMeta(List<Article> existingArticles) async {
  final List<Article> articles = [];
  final Website website = websites.firstWhere(
      (Website website) => website.name == EWebsite.engineeringAtMeta.name);

  final http.Response response = await http.get(Uri.parse(website.url));

  if (response.statusCode == 200) {
    final Document document = parser.parse(response.body);

    final Element? postsSection =
        document.getElementsByClassName('article-grids').isNotEmpty
            ? document.getElementsByClassName('article-grids')[0]
            : null;

    if (postsSection == null) return false;

    List<Element> posts = postsSection.getElementsByClassName('row');

    if (posts.isEmpty) return false;

    for (Element post in posts) {
      Element? title = post.getElementsByClassName('entry-title').isNotEmpty
          ? post.getElementsByClassName('entry-title')[0]
          : null;

      if (title == null) return false;

      Element? url = post.getElementsByTagName('a').isNotEmpty
          ? post.getElementsByTagName('a')[0]
          : null;

      if (url == null) return false;

      Element? image = post.getElementsByTagName('img').isNotEmpty
          ? post.getElementsByTagName('img')[0]
          : null;

      if (image == null) return false;

      Element? createdAt = post.getElementsByTagName('time').isNotEmpty
          ? post.getElementsByTagName('time')[0]
          : null;

      if (createdAt == null) return false;

      Article newArticle = Article.fromJson('', {
        'title': title.text.trim(),
        'url': url.attributes['href'],
        'image': image.attributes['src'],
        'createdAt': DateFormat('MMM dd, yyyy', 'en_US')
            .parse(createdAt.text.replaceFirstMapped(RegExp(r'^[A-Z]{3}'),
                (Match match) => match.group(0)!.capitalize()))
            .millisecondsSinceEpoch,
        'website': website.toJson()
      });

      if (!existingArticles.any((existingArticle) =>
          existingArticle.title == newArticle.title &&
          existingArticle.website.name == newArticle.website.name)) {
        articles.add(newArticle);
      }
    }

    for (Article article in articles) {
      await createArticle(article);
    }

    return true;
  }

  return false;
}
