c: dmaa.exe
	echo -n 'Hello, world!' | ./dmaa.exe

cs: dmaa-cs.exe
	echo -n 'Hello, world!' | ./dmaa-cs.exe

perl: dmaa.pl DataMatrix.pm
	echo -n 'Hello, world!' | perl dmaa.pl

dmaa.exe: dmaa.c datamatrix.c
	gcc -s -O2 -Wall -o $@ $^

dmaa-cs.exe: dmaa.cs datamatrix.cs
	csc -nologo -o+ -out:$@ $^

datamatrix.c datamatrix.cs datamatrix.js DataMatrix.pm: DataMatrixEncoder.ci
	cito -o $@ $<

clean:
	rm -f dmaa.exe dmaa-cs.exe datamatrix.c datamatrixci.cs datamatrixci.js DataMatrix.pm

.PHONY: c cs perl clean

.DELETE_ON_ERROR:
