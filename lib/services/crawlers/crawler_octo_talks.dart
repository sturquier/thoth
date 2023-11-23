import 'package:html/dom.dart';
import 'package:html/parser.dart' as parser;
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:thoth/config/websites.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/models/website.dart';
import 'package:thoth/services/articles.dart';

Future<bool> crawlOctoTalks(List<Article> existingArticles) async {
  final List<Article> articles = [];
  final Website website = websites
      .firstWhere((Website website) => website.name == EWebsite.octoTalks.name);

  final http.Response response = await http.get(Uri.parse(website.url));

  if (response.statusCode == 200) {
    final Document document = parser.parse(response.body);

    final Element? postsSection =
        document.getElementsByClassName('blogContainer').isNotEmpty
            ? document.getElementsByClassName('blogContainer')[0]
            : null;

    if (postsSection == null) return false;

    List<Element> posts = postsSection.getElementsByClassName('articleList');

    if (posts.isEmpty) return false;

    for (Element post in posts) {
      Element? title = post.getElementsByTagName('h2').isNotEmpty
          ? post.getElementsByTagName('h2')[0]
          : null;

      if (title == null) return false;

      Element? description = post.getElementsByTagName('p').isNotEmpty
          ? post.getElementsByTagName('p')[0]
          : null;

      if (description == null) return false;

      Element? url = post.getElementsByTagName('a').isNotEmpty
          ? post.getElementsByTagName('a')[0]
          : null;

      if (url == null) return false;

      Element? image = post.getElementsByTagName('img').isNotEmpty
          ? post.getElementsByTagName('img')[0]
          : null;

      if (image == null) return false;

      Element? createdAt =
          post.getElementsByClassName('articleListItem-dateAuthor').isNotEmpty
              ? post.getElementsByClassName('articleListItem-dateAuthor')[0]
              : null;

      if (createdAt == null) return false;

      RegExp createdAtPattern = RegExp(r'\d{2}/\d{2}/\d{4}');
      String? createdAtString =
          createdAtPattern.firstMatch(createdAt.text)?.group(0);

      if (createdAtString == null) return false;

      Article newArticle = Article.fromJson('', {
        'title': title.text.trim(),
        'description': description.text,
        'url': url.attributes['href'],
        'image': '${website.url}${image.attributes['src']}',
        'createdAt': DateFormat('dd/MM/yyyy', 'fr_FR')
            .parse(createdAtString)
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
      await addArticle(article);
    }

    return true;
  }

  return false;
}
