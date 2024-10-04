const Book = require(`../config/mongoose.model`).bookModel;


const allBook = async(req, res)=>{
    try{
        const books = await Book.find();
        return res.status(200).json({books})
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err});
    }
}

const bookSearch = async (req, res)=>{
    try{
        const body = req.body;
        if (!body.term) {
            return res.status(400).json({ message: 'Search term is required' });
        }
        const books = await Book.find({ bookName: { $regex: body.bookName, $options: 'i' } });

        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err});
    }
}

const rentFilter = async (req, res)=>{
    try{
        const body = req.body;
        if (body.upperRange < body.lowerRange){
            return res.status(400).json({ message: 'invalid range' });
        }
        const books = await Book.find({rentPerDay : {$gte: body.lowerRange, $lte: body.upperRange}})
        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err});
}
}

const fullBookSearch = async (req, res) => {
    try {
        const body = req.body;

        if (!body.upperRange || !body.lowerRange || !body.category || !body.term) {
            return res.status(400).json({ message: 'missing field' });
        }

        if (body.upperRange < body.lowerRange) {
            return res.status(400).json({ message: 'invalid range' });
        }

        const query = {
            rentPerDay: { $gte: body.lowerRange, $lte: body.upperRange },
            bookName: { $regex: body.bookName, $options: 'i' },
            category: { $regex: body.category, $options: 'i' }
        };
        
        const books = await Book.find(query);

        return res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}


module.exports = { 
    bookSearch:bookSearch,
    rentFilter:rentFilter,
    fullBookSearch:fullBookSearch,
    allBook:allBook
}