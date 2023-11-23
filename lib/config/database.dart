import 'package:firebase_database/firebase_database.dart';

final DatabaseReference _databaseReference = FirebaseDatabase.instance.ref();

final DatabaseReference articlesReference =
    _databaseReference.child('articles');

final DatabaseReference favoritesReference =
    _databaseReference.child('favorites');

final DatabaseReference categoriesReference =
    _databaseReference.child('categories');
