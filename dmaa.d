// dmaa.d - Data Matrix ASCII Art encoder
// 
// Copyright (C) 2023  Piotr Fusik
// 
// This file is part of DataMatrix.fu, see http://github.com/pfusik/datamatrix-fu
// 
// DataMatrix.fu is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// DataMatrix.fu is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with DataMatrix.fu.  If not, see http://www.gnu.org/licenses/

import std.stdio;

import datamatrix;

int main()
{
	// Read standard input
	char[DataMatrixEncoder.maxMessageLength] buffer;
	string message = stdin.rawRead(buffer).idup;

	// Encode
	DataMatrixEncoder encoder = new DataMatrixEncoder();
	encoder.encode(message);

	// Print as ASCII Art
	int columns = encoder.getColumns();
	foreach (row; 0 .. encoder.getRows()) {
		foreach (column; 0 .. columns)
			stdout.write(encoder.getModule(column, row) ? '#' : ' ');
		stdout.write('\n');
	}
	return 0;
}
