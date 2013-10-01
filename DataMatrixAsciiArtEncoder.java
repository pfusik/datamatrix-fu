// DataMatrixAsciiArtEncoder.java - Data Matrix ASCII Art encoder
// 
// Copyright (C) 2013  Piotr Fusik
// 
// This file is part of DataMatrix.ci, see http://github.com/pfusik/datamatrix-ci
// 
// DataMatrix.ci is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// DataMatrix.ci is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with DataMatrix.ci.  If not, see http://www.gnu.org/licenses/

import java.io.IOException;
import java.io.InputStreamReader;

public class DataMatrixAsciiArtEncoder
{
	private static String getMessage() throws IOException
	{
		InputStreamReader r = new InputStreamReader(System.in);
		char[] chars = new char[DataMatrixEncoder.MAX_MESSAGE_LENGTH];
		int len = r.read(chars, 0, chars.length);
		if (len < 0)
			len = 0;
		return new String(chars, 0, len);
	}

	public static void main(String[] args) throws Exception
	{
		// Read standard input
		String message = getMessage();

		// Encode
		DataMatrixEncoder encoder = new DataMatrixEncoder();
		encoder.encode(message);

		// Print as ASCII Art
		for (int row = 0; row < encoder.getRows(); row++) {
			for (int column = 0; column < encoder.getColumns(); column++) {
				System.out.print(encoder.getModule(column, row) == 0 ? ' ' : '#');
			}
			System.out.println();
		}
	}
}
