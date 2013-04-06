
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'CMP wireframe | Start' });
};

exports.single = function(req, res){
  res.render('single', { title: 'CMP wireframe | Single' });
};
