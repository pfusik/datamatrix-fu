// Generated automatically with "cito". Do not edit.

function DataMatrixEncoder()
{
	this.autoSize = false;
	this.autoSquareSize = false;
	this.matrix = new Array(17424);
	this.size = 0;
	this.autoSize = this.autoSquareSize = true;
}

DataMatrixEncoder.prototype.calculateReedSolomonCode = function(codewords) {
	var exp = new Array(511);
	var log = new Array(256);
	var e = 1;
	for (var x = 0; x < 256; x++) {
		exp[255 + x] = exp[x] = e;
		log[e] = x;
		e <<= 1;
		if (e >= 256)
			e ^= 301;
	}
	var dataCodewords = DataMatrixEncoder.CI_CONST_ARRAY_5[this.size];
	var errorCodewords = DataMatrixEncoder.CI_CONST_ARRAY_6[this.size];
	var poly = new Array(69);
	poly[0] = 1;
	for (var i = 1; i <= errorCodewords; i++) {
		poly[i] = poly[i - 1];
		for (var j = i - 1; j >= 0; j--) {
			var k = exp[log[poly[j]] + i];
			if (j > 0)
				k ^= poly[j - 1];
			poly[j] = k;
		}
	}
	for (var i = 0; i < errorCodewords; i++)
		poly[i] = log[poly[i]];
	var blocks = DataMatrixEncoder.CI_CONST_ARRAY_7[this.size];
	var totalCodewords = dataCodewords + blocks * errorCodewords;
	for (var i = dataCodewords; i < totalCodewords; i++)
		codewords[i] = 0;
	for (var block = 0; block < blocks; block++) {
		for (var i = block; i < dataCodewords; i += blocks) {
			var j = dataCodewords + block;
			var k = codewords[j] ^ codewords[i];
			for (var l = errorCodewords; --l >= 0; j += blocks) {
				var checkword = k == 0 ? 0 : exp[log[k] + poly[l]];
				if (j + blocks < totalCodewords)
					checkword ^= codewords[j + blocks];
				codewords[j] = checkword;
			}
		}
	}
}

DataMatrixEncoder.prototype.encode = function(message) {
	var codewords = new Array(6232);
	var messageCodewords = DataMatrixEncoder.encodeMessage(message, codewords);
	if (this.autoSize)
		this.fitSize(messageCodewords);
	else if (messageCodewords > DataMatrixEncoder.CI_CONST_ARRAY_5[this.size])
		throw "Message too long for this symbol size";
	this.padCodewords(messageCodewords, codewords);
	this.calculateReedSolomonCode(codewords);
	this.fillMatrix(codewords);
}

DataMatrixEncoder.encodeMessage = function(message, codewords) {
	var messageLength = message.length;
	if (messageLength > 3116)
		throw "Message too long";
	var j = 0;
	for (var i = 0; i < messageLength; i++) {
		var c = message.charCodeAt(i);
		if (c >= 128) {
			if (c >= 256)
				throw "Unsupported Unicode character";
			codewords[j++] = 235;
			codewords[j++] = c - 127;
			continue;
		}
		if (c >= 48 && c <= 57 && i + 1 < messageLength) {
			var d = message.charCodeAt(i + 1);
			if (d >= 48 && d <= 57) {
				i++;
				codewords[j++] = 130 + (c - 48) * 10 + d - 48;
				continue;
			}
		}
		codewords[j++] = c + 1;
	}
	return j;
}

DataMatrixEncoder.prototype.fillMatrix = function(codewords) {
	var matrixColumns = DataMatrixEncoder.CI_CONST_ARRAY_1[this.size] - DataMatrixEncoder.CI_CONST_ARRAY_3[this.size] * 2;
	var matrixRows = DataMatrixEncoder.CI_CONST_ARRAY_2[this.size] - DataMatrixEncoder.CI_CONST_ARRAY_4[this.size] * 2;
	for (var row = 0; row < matrixRows; row++)
		for (var column = 0; column < matrixColumns; column++)
			this.matrix[row * 132 + column] = 2;
	var codewordsIndex = 0;
	var column = 0;
	var row = 4;
	do {
		if (column == 0) {
			if (row == matrixRows)
				this.setCorner1(matrixColumns, matrixRows, codewords[codewordsIndex++]);
			else if (row == matrixRows - 2) {
				if ((matrixColumns & 3) != 0)
					this.setCorner2(matrixColumns, matrixRows, codewords[codewordsIndex++]);
				else if ((matrixColumns & 7) == 4)
					this.setCorner3(matrixColumns, matrixRows, codewords[codewordsIndex++]);
			}
		}
		else if (column == 2 && row == matrixRows + 4 && (matrixColumns & 7) == 0)
			this.setCorner4(matrixColumns, matrixRows, codewords[codewordsIndex++]);
		do {
			if (row < matrixRows && this.matrix[row * 132 + column] == 2)
				this.setUtah(column, row, matrixColumns, matrixRows, codewords[codewordsIndex++]);
			column += 2;
			row -= 2;
		}
		while (column < matrixColumns && row >= 0);
		column += 3;
		row++;
		do {
			if (column < matrixColumns && row >= 0 && this.matrix[row * 132 + column] == 2)
				this.setUtah(column, row, matrixColumns, matrixRows, codewords[codewordsIndex++]);
			column -= 2;
			row += 2;
		}
		while (column >= 0 && row < matrixRows);
		column++;
		row += 3;
	}
	while (column < matrixColumns || row < matrixRows);
	if (row == matrixRows + 6) {
		this.matrix[(matrixRows - 2) * 132 + matrixColumns - 2] = 1;
		this.matrix[(matrixRows - 2) * 132 + matrixColumns - 1] = 0;
		this.matrix[(matrixRows - 1) * 132 + matrixColumns - 2] = 0;
		this.matrix[(matrixRows - 1) * 132 + matrixColumns - 1] = 1;
	}
}

DataMatrixEncoder.prototype.fitSize = function(usedCodewords) {
	for (var i = this.autoSquareSize ? 0 : 24; i < 30; i++) {
		if (DataMatrixEncoder.CI_CONST_ARRAY_5[i] >= usedCodewords) {
			this.size = i;
			return;
		}
	}
	throw "Message too long";
}

DataMatrixEncoder.prototype.getColumns = function() {
	return DataMatrixEncoder.CI_CONST_ARRAY_1[this.size];
}

DataMatrixEncoder.prototype.getModule = function(column, row) {
	var symbolColumns = DataMatrixEncoder.CI_CONST_ARRAY_1[this.size];
	var symbolRows = DataMatrixEncoder.CI_CONST_ARRAY_2[this.size];
	if (column < 0 || column >= symbolColumns || row < 0 || row >= symbolRows)
		throw "Coordinates out of bounds";
	var regionColumns = Math.floor(symbolColumns / DataMatrixEncoder.CI_CONST_ARRAY_3[this.size]);
	var regionRows = Math.floor(symbolRows / DataMatrixEncoder.CI_CONST_ARRAY_4[this.size]);
	if ((row + 1) % regionRows == 0 || column % regionColumns == 0)
		return 1;
	if (row % regionRows == 0)
		return ~column & 1;
	if ((column + 1) % regionColumns == 0)
		return row & 1;
	column -= 1 + Math.floor(column / regionColumns) * 2;
	row -= 1 + Math.floor(row / regionRows) * 2;
	return this.matrix[row * 132 + column];
}

DataMatrixEncoder.prototype.getRows = function() {
	return DataMatrixEncoder.CI_CONST_ARRAY_2[this.size];
}
DataMatrixEncoder.MAX_MESSAGE_LENGTH = 3116;

DataMatrixEncoder.prototype.padCodewords = function(usedCodewords, codewords) {
	var dataCodewords = DataMatrixEncoder.CI_CONST_ARRAY_5[this.size];
	if (usedCodewords < dataCodewords) {
		codewords[usedCodewords++] = 129;
		while (usedCodewords < dataCodewords) {
			var pad = 130 + (usedCodewords + 1) * 149 % 253;
			if (pad > 254)
				pad -= 254;
			codewords[usedCodewords++] = pad;
		}
	}
}

DataMatrixEncoder.prototype.setAutoSize = function(square) {
	this.autoSize = true;
	this.autoSquareSize = square;
}

DataMatrixEncoder.prototype.setCorner1 = function(matrixColumns, matrixRows, value) {
	this.setModule(0, matrixRows - 1, value >> 7);
	this.setModule(1, matrixRows - 1, value >> 6);
	this.setModule(2, matrixRows - 1, value >> 5);
	this.setModule(matrixColumns - 2, 0, value >> 4);
	this.setModule(matrixColumns - 1, 0, value >> 3);
	this.setModule(matrixColumns - 1, 1, value >> 2);
	this.setModule(matrixColumns - 1, 2, value >> 1);
	this.setModule(matrixColumns - 1, 3, value);
}

DataMatrixEncoder.prototype.setCorner2 = function(matrixColumns, matrixRows, value) {
	this.setModule(0, matrixRows - 3, value >> 7);
	this.setModule(0, matrixRows - 2, value >> 6);
	this.setModule(0, matrixRows - 1, value >> 5);
	this.setModule(matrixColumns - 4, 0, value >> 4);
	this.setModule(matrixColumns - 3, 0, value >> 3);
	this.setModule(matrixColumns - 2, 0, value >> 2);
	this.setModule(matrixColumns - 1, 0, value >> 1);
	this.setModule(matrixColumns - 1, 1, value);
}

DataMatrixEncoder.prototype.setCorner3 = function(matrixColumns, matrixRows, value) {
	this.setModule(0, matrixRows - 3, value >> 7);
	this.setModule(0, matrixRows - 2, value >> 6);
	this.setModule(0, matrixRows - 1, value >> 5);
	this.setModule(matrixColumns - 2, 0, value >> 4);
	this.setModule(matrixColumns - 1, 0, value >> 3);
	this.setModule(matrixColumns - 1, 1, value >> 2);
	this.setModule(matrixColumns - 1, 2, value >> 1);
	this.setModule(matrixColumns - 1, 3, value);
}

DataMatrixEncoder.prototype.setCorner4 = function(matrixColumns, matrixRows, value) {
	this.setModule(0, matrixRows - 1, value >> 7);
	this.setModule(matrixColumns - 1, matrixRows - 1, value >> 6);
	this.setModule(matrixColumns - 3, 0, value >> 5);
	this.setModule(matrixColumns - 2, 0, value >> 4);
	this.setModule(matrixColumns - 1, 0, value >> 3);
	this.setModule(matrixColumns - 3, 1, value >> 2);
	this.setModule(matrixColumns - 2, 1, value >> 1);
	this.setModule(matrixColumns - 1, 1, value);
}

DataMatrixEncoder.prototype.setModule = function(column, row, value) {
	this.matrix[row * 132 + column] = value & 1;
}

DataMatrixEncoder.prototype.setModuleWrapped = function(column, row, matrixColumns, matrixRows, value) {
	if (row < 0) {
		row += matrixRows;
		column += 4 - (matrixRows + 4 & 7);
	}
	if (column < 0) {
		column += matrixColumns;
		row += 4 - (matrixColumns + 4 & 7);
	}
	this.setModule(column, row, value);
}

DataMatrixEncoder.prototype.setSize = function(columns, rows) {
	for (var i = 0; i < 30; i++) {
		if (DataMatrixEncoder.CI_CONST_ARRAY_1[i] == columns && DataMatrixEncoder.CI_CONST_ARRAY_2[i] == rows) {
			this.size = i;
			this.autoSize = false;
			return;
		}
	}
	throw "Invalid size";
}

DataMatrixEncoder.prototype.setUtah = function(column, row, matrixColumns, matrixRows, value) {
	this.setModuleWrapped(column - 2, row - 2, matrixColumns, matrixRows, value >> 7);
	this.setModuleWrapped(column - 1, row - 2, matrixColumns, matrixRows, value >> 6);
	this.setModuleWrapped(column - 2, row - 1, matrixColumns, matrixRows, value >> 5);
	this.setModuleWrapped(column - 1, row - 1, matrixColumns, matrixRows, value >> 4);
	this.setModuleWrapped(column, row - 1, matrixColumns, matrixRows, value >> 3);
	this.setModuleWrapped(column - 2, row, matrixColumns, matrixRows, value >> 2);
	this.setModuleWrapped(column - 1, row, matrixColumns, matrixRows, value >> 1);
	this.setModuleWrapped(column, row, matrixColumns, matrixRows, value);
}
DataMatrixEncoder.CI_CONST_ARRAY_1 = [ 10, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 40, 44, 48, 52, 64,
	72, 80, 88, 96, 104, 120, 132, 144, 18, 32, 26, 36, 36, 48 ];
DataMatrixEncoder.CI_CONST_ARRAY_2 = [ 10, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 40, 44, 48, 52, 64,
	72, 80, 88, 96, 104, 120, 132, 144, 8, 8, 12, 12, 16, 16 ];
DataMatrixEncoder.CI_CONST_ARRAY_3 = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 4,
	4, 4, 4, 4, 4, 6, 6, 6, 1, 2, 1, 2, 2, 2 ];
DataMatrixEncoder.CI_CONST_ARRAY_4 = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 4,
	4, 4, 4, 4, 4, 6, 6, 6, 1, 1, 1, 1, 1, 1 ];
DataMatrixEncoder.CI_CONST_ARRAY_5 = [ 3, 5, 8, 12, 18, 22, 30, 36, 44, 62, 86, 114, 144, 174, 204, 280,
	368, 456, 576, 696, 816, 1050, 1304, 1558, 5, 10, 16, 22, 32, 49 ];
DataMatrixEncoder.CI_CONST_ARRAY_6 = [ 5, 7, 10, 12, 14, 18, 20, 24, 28, 36, 42, 48, 56, 68, 42, 56,
	36, 48, 56, 68, 56, 68, 62, 62, 7, 11, 14, 18, 24, 28 ];
DataMatrixEncoder.CI_CONST_ARRAY_7 = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2,
	4, 4, 4, 4, 6, 6, 8, 10, 1, 1, 1, 1, 1, 1 ];
