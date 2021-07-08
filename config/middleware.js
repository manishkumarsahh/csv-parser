//thses middleware are created to pass on the notification 
//messages from users controller to html pages

module.exports.setFlash=function(req,res,next){
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }

    next();
}