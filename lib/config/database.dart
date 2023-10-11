import 'package:firebase_database/firebase_database.dart';

final DatabaseReference _databaseReference = FirebaseDatabase.instance.ref();

final DatabaseReference articlesReference =
    _databaseReference.child('articles');
