c: dmaa.exe
	echo -n 'Hello, world!' | ./dmaa.exe

perl: dmaa.pl DataMatrix.pm
	echo -n 'Hello, world!' | perl dmaa.pl

dmaa.exe: dmaa.c datamatrix.c
	gcc -s -O2 -Wall -o $@ $^

datamatrix.c datamatrix.js DataMatrix.pm: DataMatrixEncoder.ci
	cito -o $@ $<

clean:
	rm -f dmaa.exe datamatrix.c datamatrixci.js DataMatrix.pm

.PHONY: c perl clean

.DELETE_ON_ERROR:
