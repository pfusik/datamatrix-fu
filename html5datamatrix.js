import { DataMatrixEncoder } from "./datamatrix.js";

function redraw()
{
	const message = document.getElementById("message").value;
	const status = document.getElementById("status");
	const encoder = new DataMatrixEncoder();
	try {
		encoder.encode(message);
		const columns = encoder.getColumns();
		const rows = encoder.getRows();

		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
		const scale = canvas.width / columns;
		context.setTransform(scale, 0, 0, scale, 0.5, 0.5);
		for (let row = 0; row < rows; row++) {
			for (let column = 0; column < columns; column++) {
				context.fillStyle = encoder.getModule(column, row) == 0 ? "#fff" : "#000";
				context.fillRect(column, row, 1, 1);
			}
		}
		status.innerHTML = "Size: " + columns + "x" + rows;
		status.className = "";
	}
	catch (ex) {
		status.innerHTML = ex;
		status.className = "error";
	}
}

document.getElementById("message").addEventListener("input", redraw);
redraw();
