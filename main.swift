/*
 * main.swift - Data Matrix ASCII Art encoder
 *
 * Copyright (C) 2020  Piotr Fusik
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

let message = readLine()
let encoder = DataMatrixEncoder()
try encoder.encode(message)

for row in 0..<encoder.getRows() {
	for column in 0..<encoder.getColumns() {
		print(try encoder.getModule(column, row) == 0 ? " " : "#", terminator: "")
	}
	print()
}
