import 'package:thoth/models/article.dart';
import 'package:thoth/models/website.dart';

final List<Article> articlesMock = [
  Article(
      id: '1',
      title: 'Article 1',
      url: 'https://foo.com/articles/article-1',
      image: 'https://foo.com/assets/a1b2c3.jpg',
      createdAt: DateTime(2023, 1, 1),
      website: const Website(name: 'Foo', url: 'https://foo.com')),
  Article(
      id: '2',
      title: 'Article 2',
      description: 'Lorem ipsum',
      url: 'https://foo.com/articles/article-2',
      image: 'https://foo.com/assets/d4e5f6.jpg',
      createdAt: DateTime(2023, 2, 12),
      website: const Website(name: 'Foo', url: 'https://foo.com')),
  Article(
      id: '3',
      title: 'Article 3',
      url: 'https://bar.com/articles/article-3',
      image: 'https://bar.com/assets/a1b2c3.jpg',
      createdAt: DateTime(2023, 2, 23),
      website: const Website(name: 'Bar', url: 'https://bar.com'),
      isFavorite: true),
  Article(
      id: '4',
      title: 'Article 4',
      url: 'https://bar.com/articles/article-4',
      image: 'https://bar.com/assets/d4e5f6.jpg',
      createdAt: DateTime(2023, 12, 31),
      website: const Website(name: 'Bar', url: 'https://bar.com'),
      categoryName: 'Flutter')
];
