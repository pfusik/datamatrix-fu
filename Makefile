c: dmaa.exe
	echo -n 'Hello, world!' | ./dmaa.exe

java: DataMatrixAsciiArtEncoder.class DataMatrixEncoder.class
	echo -n 'Hello, world!' | java DataMatrixAsciiArtEncoder

cs: dmaa-cs.exe
	echo -n 'Hello, world!' | ./dmaa-cs.exe

py: dmaa.py datamatrix.py
	echo -n 'Hello, world!' | python $<

dmaa.exe: dmaa.c datamatrix.c
	gcc -s -O2 -Wall -o $@ $^

DataMatrixAsciiArtEncoder.class: DataMatrixAsciiArtEncoder.java DataMatrixEncoder.java
	javac $^

dmaa-cs.exe: dmaa.cs datamatrix.cs
	csc -nologo -o+ -out:$@ $^

datamatrix.c DataMatrixEncoder.java datamatrix.cs datamatrix.js datamatrix.py: DataMatrixEncoder.ci
	cito -o $@ $<

clean:
	rm -f dmaa.exe DataMatrixAsciiArtEncoder.class DataMatrixEncoder.class dmaa-cs.exe datamatrix.c datamatrixci.cs datamatrixci.js datamatrixci.py

.PHONY: c java cs py clean

.DELETE_ON_ERROR:
