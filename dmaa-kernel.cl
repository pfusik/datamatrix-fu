kernel void encode_data_matrix_ascii_art(constant char *message, global char *result)
{
	DataMatrixEncoder encoder;
	DataMatrixEncoder_Construct(&encoder);
	if (!DataMatrixEncoder_Encode(&encoder, message)) {
		result[0] = '\0';
		return;
	}
	int columns = DataMatrixEncoder_GetColumns(&encoder);
	int rows = DataMatrixEncoder_GetRows(&encoder);
	for (int row = 0; row < rows; row++) {
		for (int column = 0; column < columns; column++) {
			int module = DataMatrixEncoder_GetModule(&encoder, column, row);
			result[row * (columns  + 1) + column] = module ? '#' : ' ';
		}
		result[row * (columns  + 1) + columns] = '\n';
	}
	result[rows * (columns  + 1)] = '\0';
}
