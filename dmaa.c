/*
 * dmaa.c - Data Matrix ASCII Art encoder
 *
 * Copyright (C) 2013  Piotr Fusik
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
	char message[DataMatrixEncoder_MAX_MESSAGE_LENGTH];
	size_t messageLength;
	DataMatrixEncoder *encoder;
	int columns;
	int rows;
	int row;

	/* Read standard input */
	messageLength = fread(message, 1, sizeof(message) - 1, stdin);
	message[messageLength] = '\0';

	/* Encode */
	encoder = DataMatrixEncoder_New();
	DataMatrixEncoder_Encode(encoder, message);

	/* Print as ASCII Art */
	columns = DataMatrixEncoder_GetColumns(encoder);
	rows = DataMatrixEncoder_GetRows(encoder);
	for (row = 0; row < rows; row++) {
		int column;
		for (column = 0; column < columns; column++) {
			int module = DataMatrixEncoder_GetModule(encoder, column, row);
			putchar(module ? '#' : ' ');
		}
		putchar('\n');
	}
	return 0;
}
