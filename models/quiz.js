// Definición del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Quiz",
		{
			pregunta : DataTypes.STRING,
			respuesta: DataTypes.STRING
		});
};

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Quiz",
			{
				pregunta : {
					type : DataTypes.STRING,
					validate : {	notEmpty : {msg : " -> Falta 'Pregunta'"},
									notIn : {
										args : [["Introduce la pregunta"]],
										msg : " -> Falta 'Pregunta'"
									}
								}
				}	,
				respuesta : {
					type : DataTypes.STRING,
					validate : {	notEmpty : {msg : " -> Falta 'Respuesta'"},
									notIn : {
										args : [["Y aquí la respuesta"]],
										msg : " -> Falta 'Respuesta'"
									}
								}
				}
			}
		);
};
