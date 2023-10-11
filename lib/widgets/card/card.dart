import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:thoth/models/article.dart';

class ArticleCardWidget extends StatefulWidget {
  final Article article;

  const ArticleCardWidget({Key? key, required this.article}) : super(key: key);

  @override
  State<ArticleCardWidget> createState() => _ArticleCardWidgetState();
}

class _ArticleCardWidgetState extends State<ArticleCardWidget> {
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          Image.network(widget.article.image),
          Text(
            widget.article.title,
            style: const TextStyle(fontSize: 18),
          ),
          Text(widget.article.description),
          Text(DateFormat('dd/MM/yyyy', 'fr_fr')
              .format(widget.article.createdAt))
        ],
      ),
    );
  }
}
