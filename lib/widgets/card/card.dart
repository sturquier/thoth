import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/services/favorites.dart';
import 'package:url_launcher/url_launcher.dart';

class ArticleCardWidget extends StatefulWidget {
  final Article article;

  const ArticleCardWidget({Key? key, required this.article}) : super(key: key);

  @override
  State<ArticleCardWidget> createState() => _ArticleCardWidgetState();
}

class _ArticleCardWidgetState extends State<ArticleCardWidget> {
  late bool _isFavorite;

  @override
  void initState() {
    super.initState();

    _isFavorite = widget.article.isFavorite;
  }

  void _launchUrl() async {
    Uri url = Uri.parse(widget.article.url);

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
          leading: Image.network(widget.article.image),
          title: Text(
            widget.article.title,
            style: const TextStyle(fontSize: 18),
          ),
        ),
        Container(
            padding: const EdgeInsets.all(10),
            child: Column(children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Text(
                    'Le ${DateFormat('dd/MM/yyyy', 'fr_fr').format(widget.article.createdAt)}',
                    style: const TextStyle(
                        fontSize: 12, fontStyle: FontStyle.italic)),
                Text('Par ${widget.article.website.name}',
                    style: const TextStyle(
                        fontSize: 12, fontStyle: FontStyle.italic))
              ]),
              if (widget.article.description != null) ...[
                const SizedBox(
                  height: 20,
                ),
                Text(
                  widget.article.description!,
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
                IconButton(
                    onPressed: () {
                      setState(() => _isFavorite = !_isFavorite);
                      toggleFavorite(widget.article);
                    },
                    icon: Icon(
                      _isFavorite ? Icons.favorite : Icons.favorite_border,
                      color: Colors.pink,
                    )),
                TextButton(
                    onPressed: _launchUrl, child: const Text("VOIR L'ARTICLE"))
              ])
            ]))
      ],
    ));
  }
}
