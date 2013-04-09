use DataMatrix;

my $encoder = DataMatrixEncoder->new();
$encoder->encode('Wikipedia');
for my $row (0 .. $encoder->get_rows() - 1) {
	for my $column (0 .. $encoder->get_columns() - 1) {
		print $encoder->get_module($column, $row) ? '#' : ' ';
	}
	print "\n";
}
