api url :- https://unb.onrender.com

Routes:- 
- /user/allUser - to get all user list-/allBook - get all books-/transaction/allTransaction - gets all transaction
-/book - to search for a book term (input- bookName(String))

-/price - price range filter(input- LowerRange and upperRange (number))

-/fullBookSearch - full book search with category price range and book term(input- LowerRange and upperRange (number), bookName(String), category(String))

-/transaction/issued - posts a doc when a book is issued (input - bookName(string),  userName(string), dateIssued(yyyy-mm-dd))

-/transaction/returned - update when a book is returned with total rent price and return date(input - bookName(string),  userName(string), dateReturned(yyyy-mm-dd))

-/transaction/bookTransaction - gets all transaction of the book and if it is currently issued or not (input- bookName(string))

-/transaction/bookRevenue - gets total revenue earned by a book(input- bookName(string))

-/transaction/bookIssuedToUser - how many books issued by a individual user(input- userName(string))

-/transaction/dateRangeFilter - gets transaction between these range(input- lowerDateRange(yyyy-mm-dd) and upperDateRange(yyyy-mm-dd))
