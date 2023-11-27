import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:thoth/models/article.dart';
import 'package:url_launcher/url_launcher.dart';

class ArticleCardWidget extends StatelessWidget {
  final Article article;
  final VoidCallback toggleFavoriteCallback;
  final VoidCallback openCategorySelectionDialogCallback;

  const ArticleCardWidget(
      {Key? key,
      required this.article,
      required this.toggleFavoriteCallback,
      required this.openCategorySelectionDialogCallback})
      : super(key: key);

  void _launchUrl() async {
    Uri url = Uri.parse(article.url);

    if (await canLaunchUrl(url)) {
      launchUrl(url);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
        child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ListTile(
          leading: Image.network(article.image),
          title: Text(
            article.title,
            style: const TextStyle(fontSize: 18),
          ),
        ),
        Container(
            padding: const EdgeInsets.all(10),
            child: Column(children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Text(
                    'Le ${DateFormat('dd/MM/yyyy', 'fr_fr').format(article.createdAt)}',
                    style: const TextStyle(
                        fontSize: 12, fontStyle: FontStyle.italic)),
                Text('Par ${article.website.name}',
                    style: const TextStyle(
                        fontSize: 12, fontStyle: FontStyle.italic))
              ]),
              if (article.description != null) ...[
                const SizedBox(
                  height: 20,
                ),
                Text(
                  article.description!,
                  style: const TextStyle(fontSize: 15),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
              ]
            ])),
        const SizedBox(
          height: 30,
        ),
        Container(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: Column(children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                TextButton(
                    onPressed: _launchUrl, child: const Text("VOIR L'ARTICLE")),
                Row(children: [
                  IconButton(
                      onPressed: openCategorySelectionDialogCallback,
                      icon: Icon(
                        Icons.create_new_folder_outlined,
                        color: Theme.of(context).primaryColor,
                      )),
                  IconButton(
                      onPressed: toggleFavoriteCallback,
                      icon: Icon(
                        article.isFavorite
                            ? Icons.favorite
                            : Icons.favorite_border,
                        color: Colors.pink,
                      ))
                ])
              ])
            ]))
      ],
    ));
  }
}
