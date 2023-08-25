CC = gcc
CXX = g++
CFLAGS = -s -O2 -Wall
CXXFLAGS = -s -O2 -Wall

TRANSPILED = datamatrix.c datamatrix.cs datamatrix.d DataMatrixEncoder.java datamatrix.js datamatrix.py datamatrix.swift datamatrix.cl

c: dmaa.exe
	echo -n 'Hello, world!' | ./dmaa.exe

cs: dmaa-cs.exe
	echo -n 'Hello, world!' | ./dmaa-cs.exe

d: dmaa-d.exe
	echo -n 'Hello, world!' | ./dmaa-d.exe

java: DataMatrixAsciiArtEncoder.class DataMatrixEncoder.class
	echo -n 'Hello, world!' | java DataMatrixAsciiArtEncoder

py: dmaa.py datamatrix.py
	echo -n 'Hello, world!' | python $<

swift: dmaa-swift
	echo -n 'Hello, world!' | ./dmaa-swift

cl: dmaa-cl.exe
	echo -n 'Hello, world!' | ./dmaa-cl.exe

dmaa.exe: dmaa.c datamatrix.c
	$(CC) $(CFLAGS) -o $@ $^

dmaa-cs.exe: dmaa.cs datamatrix.cs
	csc -nologo -o+ -out:$@ $^

dmaa-d.exe: dmaa.d datamatrix.d
	dmd -of$@ -O -release $^

DataMatrixAsciiArtEncoder.class: DataMatrixAsciiArtEncoder.java DataMatrixEncoder.java
	javac $^

dmaa-swift: main.swift datamatrix.swift
	swiftc -o $@ $^

dmaa-cl.exe: dmaa-cl.cpp datamatrix-cl.h datamatrix.h
	$(CXX) $(CXXFLAGS) -o $@ $< -lOpenCL

datamatrix-cl.h: datamatrix.cl dmaa-kernel.cl
	(echo 'R"CLC(' && cat $^ && echo ')CLC"') >$@

datamatrix.h: datamatrix.c

browser: datamatrix.js
	$(LOCALAPPDATA)/Programs/Opera/launcher --allow-file-access-from-files file:///$(shell cygpath -am html5datamatrix.html)

$(TRANSPILED): DataMatrixEncoder.fu
	fut -o $@ $<

clean:
	rm -f dmaa.exe DataMatrixAsciiArtEncoder.class DataMatrixEncoder.class dmaa-cs.exe dmaa-swift dmaa-cl.exe datamatrix-cl.h datamatrix.h $(TRANSPILED)

.PHONY: c cs d java py swift cl browser clean

.DELETE_ON_ERROR:
