# dmaa.pl - Data Matrix ASCII Art encoder
#
# Copyright (C) 2013  Piotr Fusik
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

use DataMatrix;

# Read standard input
local $/;
my $message = <>;

# Encode
my $encoder = DataMatrixEncoder->new();
$encoder->encode($message);

# Print as ASCII Art
for my $row (0 .. $encoder->get_rows() - 1) {
	for my $column (0 .. $encoder->get_columns() - 1) {
		print $encoder->get_module($column, $row) ? '#' : ' ';
	}
	print "\n";
}
