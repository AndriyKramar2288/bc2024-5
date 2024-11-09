const express = require("express");
const app = express();
const { program } = require("commander");
const fsp = require("node:fs/promises");
const path = require('node:path');
const multer = require('multer');

// функція повністю займається параметрами, повертає об'єкт з ними
function preparing() {
    // опис параметрів програми
    program
        .option("-h, --host <value>", "Host location")
        .option("-p, --port <value>", "Port location")
        .option("-c, --cashe <value>", "Cashe location");
    // парсинг тих параметрів
    program.parse()

    // отримання об'єкта, для зручного одержання параметрів
	const options = program.opts();

	// перевірка параметрів на правильність
	// перевірка на наявність обов'язкових параметрів
	if (!options.host || !options.port || !options.cashe) {
		throw Error("Please, specify necessary param");
	}

	return options;	
}

// глобальна(фу) змінна з параметрами
const options = preparing();
const host = options.host;
const port = options.port;
const cashe = options.cashe;
const fullDataFileName = path.join(cashe, "info.json");
let dataJson = [];
const saveDataJson = () => {
	fsp.writeFile(fullDataFileName, JSON.stringify(dataJson));
}

app.get("/notes/:note", (req, res) => {
	const note_name = req.params.note;
	const note = dataJson.find((nt) => nt.name == note_name);
	if (note) {
		res.send(note.text);
	}
	else {
		res.sendStatus(404);
	}
});

function main() {
	dataText = fsp.readFile(fullDataFileName)
	.then((result) => {
		dataJson = JSON.parse(result);
	})
	.catch((err) => {
		saveDataJson();
	})
	.finally(() => {
		app.listen(port, host, () => {
		console.log(`Сервер запущено за адресою http://${host}:${port}`);
		}); 
	});
}
main();