import sys
from datamatrix import DataMatrixEncoder

message = sys.stdin.read()
encoder = DataMatrixEncoder()
encoder.encode(message)

for row in range(encoder.get_rows()):
	for column in range(encoder.get_columns()):
		print(" " if encoder.get_module(column, row) == 0 else "#", end="")
	print()
