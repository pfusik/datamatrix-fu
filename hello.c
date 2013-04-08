#include <stdio.h>
#include "datamatrix.h"

int main(int argc, char **argv)
{
	DataMatrixEncoder *encoder;
	int columns;
	int rows;
	int row;
	encoder = DataMatrixEncoder_New();
	DataMatrixEncoder_Encode(encoder, "Wikipedia");
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
