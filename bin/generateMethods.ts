import fs from 'fs';

// Load JSON generated from TypeDoc
const data = JSON.parse(fs.readFileSync('doc.json', 'utf-8'));

// Find node by ID
const findById = (node: any, id: number): any | null => {
	if (node.id === id) return node;
	if (node.children) {
		for (const child of node.children) {
			const found = findById(child, id);

			if (found) return found;
		}
	}
	
	return null;
};

// Find Client class
const clientModule = data.children.find((c: any) => c.name === 'client');
const clientClass = clientModule.children.find((c: any) => c.name === 'Client');

const order = [
	'users',
	'organizations',
	'rooms',
	'attendees',
	'recordings',
	'frames'
];

let md = '# Methods\n\n';

for (const serviceName of order) {
	const prop = clientClass.children.find(
		(c: any) => c.kind === 1024 && c.name === serviceName
	);

	if (!prop || prop.type?.type !== 'reference') continue;

	md += `## ${serviceName}\n\n`;

	const targetId = prop.type.target;
	const targetClass = findById(data, targetId);

	if (targetClass?.children) {
		for (const method of targetClass.children) {
			if (method.kind === 2048) {
				md += `- ${method.name}\n`;
			}
		}
	}
	md += '\n';
}

fs.writeFileSync('METHODS.md', md);
// eslint-disable-next-line no-console
console.log('✅ METHODS.md generado');