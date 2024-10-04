const Transaction = require(`../config/mongoose.model`).transactionModel;
const Book = require(`../config/mongoose.model`).bookModel;

const allTransaction = async(req, res)=>{
    try{
        const transaction = await Transaction.find();
        return res.status(200).json({transaction})
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err});
    }
}

const issueUpdate = async (req , res)=>{
    try{
        const body = req.body;
        const bookName = body.bookName;
        const user = body.userName;
        const dateIssued = new Date(body.dateIssued);

        const bookissued = await Transaction.find({ bookName: { $regex: bookName, $options: 'i' } });
        if (!bookissued[bookissued.length-1].returnedOn){
            return res.status(404).json({message: 'book issued by someone else'})
        }

        console.log(bookissued)

        
        const books = await Book.find({ bookName: { $regex: bookName, $options: 'i' } });

        const newTransaction = new Transaction({
            bookName : bookName,
            userName : user,
            issuedOn : dateIssued,
            rent : books[0].rentPerDay
        })

        const transaction = await newTransaction.save();
        console.log("transaction successfull")
        return res.status(200).json({msg: transaction})

    }catch(err){
        console.log(err)
        return res.status(500).json({error: err});
    }
}

const returnUpdate = async (req, res) => {
    try {
        const body = req.body;
        const bookName = body.bookName;
        const userName = body.userName;
        const dateReturned = new Date(body.dateReturned);

        
        const books = await Book.find({ bookName: { $regex: bookName, $options: 'i' } });

        if (books.length === 0) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        const transactionDtls = await Transaction.find({ 
            bookName: { $regex: bookName, $options: 'i' },
            userName: userName,
            returnedOn: null 
        });

        if (transactionDtls.length === 0) {
            return res.status(404).json({ message: 'Transaction not found or already returned.' });
        }

        const transaction = transactionDtls[0];

        const ttlRent = (calculateDaysBetweenDates(transaction.issuedOn, dateReturned)+1) * (books[0].rentPerDay || 0);
        console.log(ttlRent)

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transaction._id,
            {
                $set: {
                    returnedOn: dateReturned,
                    ttlrent: ttlRent
                }
            },
            { new: true, useFindAndModify: false }
        );

        console.log("Book returned");
        return res.status(200).json({ msg: updatedTransaction });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

const bookTransaction = async(req, res)=>{
    try{
        const bookName = req.body.bookName;
        const booksissued = await Transaction.find({ bookName: { $regex: bookName, $options: 'i' } });
        console.log(booksissued[0])
        let status = "not issued at the moment"
        if(!booksissued[booksissued.length-1].returnedOn){
            status = booksissued[booksissued.length-1].userName+" has the book issued"
        }
        return res.status(200).json({count: booksissued.length, status : status, userDtls: booksissued})

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: err });
    }
}

const bookRevenue = async(req,res)=>{
    try{
        const bookName = req.body.bookName;
        let revenue = 0;
        
        const booksIssued = await Transaction.find({ bookName: { $regex: bookName, $options: 'i' } });
        revenue = booksIssued.reduce((total, transaction) => total + transaction.ttlrent, 0);

        return res.status(200).json({revenue:revenue})

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: err });
    }
}

const userBooks = async(req,res)=>{
    try{
        const userName = req.body.userName;

        const booksIssuedToUser = await Transaction.find({ userName: { $regex: userName, $options: 'i' } });

        return res.status(200).json({issuedbooksdtl :booksIssuedToUser})

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: err });
    }
}

const dateRangeFilter = async (req, res) => {
    try {
        const { lowerDateRange, upperDateRange } = req.body;

        if (!lowerDateRange || !upperDateRange) {
            return res.status(400).json({ error: 'Both lowerDateRange and upperDateRange are required.' });
        }

        const lowerDate = new Date(lowerDateRange);
        const upperDate = new Date(upperDateRange);

        if (isNaN(lowerDate) || isNaN(upperDate)) {
            return res.status(400).json({ error: 'Invalid date format.' });
        }

        if (lowerDate > upperDate) {
            return res.status(400).json({ error: 'lowerDateRange cannot be greater than upperDateRange.' });
        }

        const issuedBooks = await Transaction.find({
            issuedOn: { $gte: lowerDate, $lte: upperDate }
        });

        return res.status(200).json({ issuedBooks });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred while fetching issued books.' });
    }
};

const calculateDaysBetweenDates = (issuedOn, returnedOn) => {
    const startDate = new Date(issuedOn);
    const endDate = new Date(returnedOn);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error("Invalid date(s) provided.");
    }

    const differenceInMillis = endDate - startDate;

    const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);

    return Math.floor(differenceInDays);
};

module.exports = {
    issueUpdate : issueUpdate,
    returnUpdate : returnUpdate,
    bookTransaction: bookTransaction,
    bookRevenue:bookRevenue,
    userBooks: userBooks,
    dateRangeFilter: dateRangeFilter,
    allTransaction:allTransaction
}