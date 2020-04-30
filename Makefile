c: dmaa.exe
	echo -n 'Hello, world!' | ./dmaa.exe

java: DataMatrixAsciiArtEncoder.class DataMatrixEncoder.class
	echo -n 'Hello, world!' | java DataMatrixAsciiArtEncoder

cs: dmaa-cs.exe
	echo -n 'Hello, world!' | ./dmaa-cs.exe

py: dmaa.py datamatrix.py
	echo -n 'Hello, world!' | python $<

swift: dmaa-swift
	echo -n 'Hello, world!' | ./dmaa-swift

dmaa.exe: dmaa.c datamatrix.c
	gcc -s -O2 -Wall -o $@ $^

DataMatrixAsciiArtEncoder.class: DataMatrixAsciiArtEncoder.java DataMatrixEncoder.java
	javac $^

dmaa-cs.exe: dmaa.cs datamatrix.cs
	csc -nologo -o+ -out:$@ $^

dmaa-swift: main.swift datamatrix.swift
	swiftc -o $@ $^

datamatrix.c DataMatrixEncoder.java datamatrix.cs datamatrix.js datamatrix.py datamatrix.swift: DataMatrixEncoder.ci
	cito -o $@ $<

clean:
	rm -f dmaa.exe DataMatrixAsciiArtEncoder.class DataMatrixEncoder.class dmaa-cs.exe datamatrix.c datamatrix.cs datamatrix.js datamatrix.py datamatrix.swift

.PHONY: c java cs py clean

.DELETE_ON_ERROR:
