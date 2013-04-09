c: hello.exe
	./hello.exe

perl: hello.pl DataMatrix.pm
	perl hello.pl

hello.exe: hello.c datamatrix.c
	gcc -s -O2 -Wall -o $@ $^

datamatrix.c datamatrix.js DataMatrix.pm: DataMatrixEncoder.ci
	cito -o $@ $<

clean:
	rm -f hello.exe datamatrix.c datamatrixci.js DataMatrix.pm

.PHONY: c perl clean

.DELETE_ON_ERROR:
