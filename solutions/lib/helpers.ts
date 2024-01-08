const { position } = require("promise-path");
const fs = require("fs");
const fromHere = position(__dirname);
const debugFile = fromHere("../../__tests__/debug.txt");

let which = {
	env_: "test",

	get env() {
		return `${this.env_}`;
	},

	set env(value) {
		this.env_ = value;
	}
};

function clearDebug(): void {
	if (which.env !== "test") return;

	if (fs.existsSync(debugFile)) {
		fs.truncateSync(debugFile);
	} else {
		fs.createFileSync(debugFile, "utf8");
	}
}

function dbg(): void {
	if (which.env !== "test") return;

	if (_getNumberOfDebugs() == 0) {
		const caller = _getCallerFile();//.split("/").slice(-1).join("");
		fs.writeFileSync(
			debugFile,
			new Date().toLocaleString() + " --- " + caller + "\n"
		);
	}

	fs.writeFileSync(debugFile, Array.from(arguments).join(" ") + "\n", {flag: "a"});
	console.log(Array.from(arguments).join(" "));
}

function _getCallerFile(): string {
	return arguments.callee.caller?.name;;
	// var originalFunc = Error.prepareStackTrace;

	// var callerfile;
	// try {
	// 	var err = new Error();
	// 	var currentfile;

	// 	Error.prepareStackTrace = function (err, stack) {
	// 		return stack;
	// 	};

	// 	currentfile = err.stack.shift().getFileName();

	// 	while (err.stack?.length) {
	// 		callerfile = err.stack.shift().getFileName();

	// 		if (currentfile !== callerfile) break;
	// 	}
	// } catch (e) {}

	// Error.prepareStackTrace = originalFunc;

	// return callerfile;
}

function _getNumberOfDebugs() {
	var data = fs.readFileSync(debugFile);
	var res = data.toString().split("\n").length;
	return res - 1;
}

module.exports = {
	dbg,
	clearDebug,
	which
};
