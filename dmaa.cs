// dmaa.cs - Data Matrix ASCII Art encoder
// 
// Copyright (C) 2013-2023  Piotr Fusik
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

using System;

public class DataMatrixAsciiArtEncoder
{
	public static void Main()
	{
		// Read standard input
		string message = Console.In.ReadToEnd();

		// Encode
		DataMatrixEncoder encoder = new DataMatrixEncoder();
		encoder.Encode(message);

		// Print as ASCII Art
		for (int row = 0; row < encoder.GetRows(); row++) {
			for (int column = 0; column < encoder.GetColumns(); column++) {
				Console.Write(encoder.GetModule(column, row) == 0 ? ' ' : '#');
			}
			Console.WriteLine();
		}
	}
}
