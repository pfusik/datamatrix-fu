/*
 * dmaa.c - Data Matrix ASCII Art encoder
 *
 * Copyright (C) 2013-2020  Piotr Fusik
 *
 * This file is part of DataMatrix.ci, see http://github.com/pfusik/datamatrix-ci
 *
 * DataMatrix.ci is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DataMatrix.ci is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DataMatrix.ci.  If not, see http://www.gnu.org/licenses/
 */

#include <stdio.h>
#include "datamatrix.h"

int main(int argc, char **argv)
{
	// Read standard input
	char message[DataMatrixEncoder_MAX_MESSAGE_LENGTH];
	size_t messageLength = fread(message, 1, sizeof(message) - 1, stdin);
	message[messageLength] = '\0';

	// Encode
	DataMatrixEncoder *encoder = DataMatrixEncoder_New();
	DataMatrixEncoder_Encode(encoder, message);

	// Print as ASCII Art
	int columns = DataMatrixEncoder_GetColumns(encoder);
	int rows = DataMatrixEncoder_GetRows(encoder);
	for (int row = 0; row < rows; row++) {
		for (int column = 0; column < columns; column++) {
			int module = DataMatrixEncoder_GetModule(encoder, column, row);
			putchar(module ? '#' : ' ');
		}
		putchar('\n');
	}

	// Clean up
	DataMatrixEncoder_Delete(encoder);
	return 0;
}
