# dmaa.py - Data Matrix ASCII Art encoder
#
# Copyright (C) 2020  Piotr Fusik
#
# This file is part of DataMatrix.ci, see http://github.com/pfusik/datamatrix-ci
#
# DataMatrix.ci is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# DataMatrix.ci is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with DataMatrix.ci.  If not, see http://www.gnu.org/licenses/

import sys
from datamatrix import DataMatrixEncoder

message = sys.stdin.read()
encoder = DataMatrixEncoder()
encoder.encode(message)

for row in range(encoder.get_rows()):
	for column in range(encoder.get_columns()):
		print(" " if encoder.get_module(column, row) == 0 else "#", end="")
	print()
