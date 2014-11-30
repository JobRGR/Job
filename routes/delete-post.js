exports.post = function(req, res, next) {
    var id = req.body.id;

    var mongoose = require("../lib/mongoose");
    //console.log(mongoose.model("Post").findByIdAndRemove(id));
    mongoose.model('Post').findById(id, function (err, doc) {
        if (err) throw err;
        doc.remove();
    })
}