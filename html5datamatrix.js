function redraw()
{
	var message = document.getElementById("message").value;
	var status = document.getElementById("status");
	var encoder = new DataMatrixEncoder();
	try {
		encoder.encode(message);
		var columns = encoder.getColumns();
		var rows = encoder.getRows();

		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
		var scale = canvas.width / columns;
		context.setTransform(scale, 0, 0, scale, 0.5, 0.5);
		for (var row = 0; row < rows; row++) {
			for (var column = 0; column < columns; column++) {
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
