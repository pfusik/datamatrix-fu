run: hello.exe
	./hello.exe

hello.exe: hello.c datamatrix.c
	gcc -s -O2 -Wall -o $@ $^

datamatrix.c datamatrix.js: DataMatrixEncoder.ci
	cito -o $@ $<

clean:
	rm -f hello.exe datamatrix.c datamatrixci.js

.PHONY: run clean

.DELETE_ON_ERROR:
