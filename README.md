This projects implements [Data Matrix barcode](http://en.wikipedia.org/wiki/Data_Matrix)
in the [Fusion programming language](https://fusion-lang.org).
Fusion can be automatically translated to pure C, C++, C#, D, Java, JavaScript,
Python, Swift, TypeScript and OpenCL with no additional dependencies.

Currently the project includes an encoder for all ECC 200 symbol sizes (square and rectangular).
Symbol size may be set a priori or a smallest symbol may be selected for the encoded message.
ASCII encoding and digit pairs are supported.
I made an attempt to support ISO 8859-1, but I'm not sure whether it's correct.

Future version will support other encodings and perhaps a decoder.

Try the [HTML 5 encoder](http://pfusik.github.io/datamatrix-fu/html5datamatrix.html) right in your browser.
Other sample programs print the barcodes in the terminal, as hashes and spaces.
