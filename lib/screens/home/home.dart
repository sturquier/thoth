import 'package:flutter/material.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/services/articles.dart';
import 'package:thoth/widgets/card/card.dart';
import 'package:thoth/widgets/dialog/dialog.dart';
import 'package:thoth/widgets/input/input.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<List<Article>> _articles;
  String _search = '';

  @override
  void initState() {
    super.initState();
    _articles = fetchArticles();
  }

  List<Article> _filteredArticles(List<Article> articles) {
    return articles
        .where((Article article) =>
            article.title.toLowerCase().contains(_search.toLowerCase()))
        .toList();
  }

  void _openFiltersList(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) => const ArticleDialogWidget());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Articles')),
      body: Column(
        children: [
          Container(
              padding: const EdgeInsets.symmetric(horizontal: 15),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(
                      height: 20,
                    ),
                    const Text(
                      'Rechercher des articles',
                      style: TextStyle(fontSize: 18),
                    ),
                    const SizedBox(
                      height: 5,
                    ),
                    Row(mainAxisSize: MainAxisSize.min, children: [
                      Expanded(
                          child: InputSearchWidget(
                              onChangedCallback: (String? value) =>
                                  setState(() => _search = value ?? ''))),
                      IconButton(
                          icon: const Icon(Icons.filter_list),
                          onPressed: () => _openFiltersList(context))
                    ]),
                    const SizedBox(
                      height: 5,
                    ),
                    const Divider(),
                  ])),
          Expanded(
            child: FutureBuilder<List<Article>>(
              future: _articles,
              builder: (BuildContext context,
                  AsyncSnapshot<List<Article>> snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                  // TODO : handle when no article in DB
                  return const Center(
                      child: Text("Aucun article n'a été trouvé"));
                } else {
                  // TODO : handle when no article when searching
                  return ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 15),
                    itemCount: _filteredArticles(snapshot.data!).length,
                    itemBuilder: (BuildContext context, int index) {
                      Article article =
                          _filteredArticles(snapshot.data!)[index];

                      return ArticleCardWidget(article: article);
                    },
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}
