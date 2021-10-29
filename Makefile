CC = gcc
CXX = g++
CFLAGS = -s -O2 -Wall
CXXFLAGS = -s -O2 -Wall

TRANSPILED = datamatrix.c DataMatrixEncoder.java datamatrix.cs datamatrix.js datamatrix.py datamatrix.swift datamatrix.cl

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

cl: dmaa-cl.exe
	echo -n 'Hello, world!' | ./dmaa-cl.exe

dmaa.exe: dmaa.c datamatrix.c
	$(CC) $(CFLAGS) -o $@ $^

DataMatrixAsciiArtEncoder.class: DataMatrixAsciiArtEncoder.java DataMatrixEncoder.java
	javac $^

dmaa-cs.exe: dmaa.cs datamatrix.cs
	csc -nologo -o+ -out:$@ $^

dmaa-swift: main.swift datamatrix.swift
	swiftc -o $@ $^

dmaa-cl.exe: dmaa-cl.cpp datamatrix-cl.h datamatrix.c
	$(CXX) $(CXXFLAGS) -o $@ $< -lOpenCL

datamatrix-cl.h: datamatrix.cl dmaa-kernel.cl
	(echo 'R"CLC(' && cat $^ && echo ')CLC"') >$@

$(TRANSPILED): DataMatrixEncoder.ci
	cito -o $@ $<

clean:
	rm -f dmaa.exe DataMatrixAsciiArtEncoder.class DataMatrixEncoder.class dmaa-cs.exe dmaa-swift dmaa-cl.exe datamatrix-cl.h $(TRANSPILED)

.PHONY: c java cs py swift cl clean

.DELETE_ON_ERROR:
