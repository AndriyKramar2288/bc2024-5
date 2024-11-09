const express = require("express");
const app = express();
const { program } = require("commander");

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

app.get("/", (req, res) => {
	res.send("test");
});

app.listen(port, host, () => {
	console.log(`Сервер запущено за адресою http://${host}:${port}`);
}); 