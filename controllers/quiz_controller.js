var models = require("../models/models.js");


// Autoload
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz) {
				req.quiz = quiz;
				next();
			}
			else {
				next(
					new Error("No existe quizId - " + quizId)
				);
			}
		}
	).catch(
		function(error) {
			next(error);
		}
	);
};


// GET /quizes
exports.index = function(req, res) {

	var where;

	if(req.query.search) {
		var search = "%";
		search += req.query.search.split(" ").join("%");
		search += "%"; 
		where = {where : ["lower(pregunta) like lower(?)", search ], 
				 order : [["pregunta", "ASC"]]};

	}


	models.Quiz.findAll((where)?where:"").then(
		function(quizes) {
			res.render("quizes/index.ejs", {quizes:quizes, errors : []});
		}
	).catch(function(error){
		next(error);
		//console.log(error);
	});
};


// GET /quizes/:id
exports.show = function(req, res) {
	res.render("quizes/show", {quiz : req.quiz, errors : []});
	
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = "Incorrecto";
	if(req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
		resultado = "Correcto";
	}
	
	res.render("quizes/answer",
			{
				quiz : req.quiz,
				respuesta : resultado,
				errors : []
			}	
		);	
	
	
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build(
			{
				pregunta : "Introduce tu pregunta",
				respuesta : "Y aquí la respuesta"
			}
		);
	res.render("quizes/new", {quiz : quiz, errors : []});
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);

	quiz
	.validate()
	.then(
		function(err) {
			if(err) {
				res.render("quizes/new", {quiz : quiz, errors : err.errors});
			}
			else {
				quiz
				.save(
						{
							fields : ["pregunta", "respuesta"]
						}
				)
				.then(function() {
					res.redirect("/quizes");
				});
			}
		}
	);
	

};

// GET /author
exports.author = function(req, res){
	res.render('author', {author : 'Israel Vilches Valle', errors : []});
};


