import 'package:html/dom.dart';
import 'package:html/parser.dart' as parser;
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/models/website.dart';
import 'package:thoth/services/articles.dart';

Future<bool> crawlIonicBlog(List<Article> existingArticles) async {
  final List<Article> articles = [];
  final Website website = websites
      .firstWhere((Website website) => website.name == EWebsite.ionicBlog.name);

  final http.Response response = await http.get(Uri.parse(website.url));

  if (response.statusCode == 200) {
    final Document document = parser.parse(response.body);

    final Element? postsSection =
        document.getElementsByTagName('main').isNotEmpty
            ? document.getElementsByTagName('main')[0]
            : null;

    if (postsSection == null) return false;

    List<Element> posts = postsSection.getElementsByTagName('article');

    if (posts.isEmpty) return false;

    for (Element post in posts) {
      Element? title = post.getElementsByTagName('h2').isNotEmpty
          ? post.getElementsByTagName('h2')[0]
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

      Element? createdAt = post.getElementsByClassName('meta__date').isNotEmpty
          ? post.getElementsByClassName('meta__date')[0]
          : null;

      if (createdAt == null) return false;

      Article newArticle = Article.fromJson('', {
        'title': title.text.trim(),
        'url': url.attributes['href'],
        'image': image.attributes['data-src'],
        'createdAt': DateFormat('MMMM d, yyyy', 'en_US')
            .parse(createdAt.text.trim())
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
