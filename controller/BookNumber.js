const BookNumber = require('../models/BookNumber');
const { DEFAULT_BOOK_CATEGORY } = require('../helper/constants');

exports.generateBookNumber = async(data) => {
    try{
        const { category = DEFAULT_BOOK_CATEGORY } = data;
        const CATEGORY = category.toUpperCase();

        let bookNumber = await BookNumber.findOne({category: CATEGORY});
        if(!bookNumber){
            bookNumber = await BookNumber.create({category: CATEGORY, count: 0});
        }

        if(bookNumber){
            bookNumber = await BookNumber.findByIdAndUpdate(bookNumber._id, {
                $inc: {count: 1}
            });
        }

        return `${CATEGORY.slice(0, 3)}-${bookNumber.count}`;
    }catch(err){
        console.log("Error while generating book number: ", err);
        return null;
    }
}