const toReference = require('./helpers/to-reference');
const shortnames = require('./shortnames');

module.exports = function addTemplateToModule(t, toInsert, bps, pragma, pragmaMethod, precloneDOMNodes) {
	const node = toInsert.node;
	const index = toInsert.index;

	if (bps.length > 0) {
		node.body.splice(index, 0,
			t.VariableDeclaration('var', bps.map(({ index, content }) =>
				t.VariableDeclarator(t.Identifier('bp' + index),
					t.callExpression(
						t.Identifier(shortnames.createOptBlueprint),
						precloneDOMNodes ? content.concat(t.identifier('InfernoDOM')) : content
					)
				)
			))
		);
		// add in short names for all Inferno namespace objects to reduce output size and make code more readable
		node.body.splice(index, 0, t.VariableDeclaration('var', [
			t.VariableDeclarator(
				t.Identifier(shortnames.createOptBlueprint),
				t.memberExpression(t.identifier(pragma || 'Inferno'), t.identifier('createOptBlueprint'))
			),
			t.VariableDeclarator(
				t.Identifier(shortnames.createStaticVElement),
				t.memberExpression(t.identifier(pragma || 'Inferno'), t.identifier('createStaticVElement'))
			),
			t.VariableDeclarator(
				t.Identifier(shortnames.createOptVElement),
				t.memberExpression(t.identifier(pragma || 'Inferno'), t.identifier('createOptVElement'))
			),
			t.VariableDeclarator(
				t.Identifier(shortnames.createVComponent),
				t.memberExpression(t.identifier(pragma || 'Inferno'), t.identifier('createVComponent'))
			),
			t.VariableDeclarator(
				t.Identifier(shortnames.ValueTypes),
				t.memberExpression(t.identifier(pragma || 'Inferno'), t.identifier('ValueTypes'))
			),
			t.VariableDeclarator(
				t.Identifier(shortnames.NodeTypes),
				t.memberExpression(t.identifier(pragma || 'Inferno'), t.identifier('NodeTypes'))
			),
			t.VariableDeclarator(
				t.Identifier(shortnames.ChildrenTypes),
				t.memberExpression(t.identifier(pragma || 'Inferno'), t.identifier('ChildrenTypes'))
			)
		]));
	} else {
		// add in short names for all Inferno namespace objects to reduce output size and make code more readable
		node.body.splice(index, 0, t.VariableDeclaration('var', [
			t.VariableDeclarator(
				t.Identifier(shortnames.createVComponent),
				t.memberExpression(t.identifier(pragma || 'Inferno'), t.identifier('createVComponent'))
			)
		]));
	}
};