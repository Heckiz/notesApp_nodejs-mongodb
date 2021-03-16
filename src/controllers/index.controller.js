const indexCtl= {};

indexCtl.renderIndex= (req, res) =>{
   res.render('index')
};

indexCtl.renderAbout= (req, res) =>{
    res.render('about')
 };


 module.exports = indexCtl;