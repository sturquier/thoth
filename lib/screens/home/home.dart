import 'package:flutter/material.dart';
import 'package:thoth/models/article.dart';
import 'package:thoth/services/articles.dart';
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Articles')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: InputSearchWidget(
                onChangedCallback: (String? value) =>
                    setState(() => _search = value!)),
          ),
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
                      return Card(
                        child: Center(
                          child: Text(
                              _filteredArticles(snapshot.data!)[index].title),
                        ),
                      );
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
