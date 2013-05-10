This projects implements [Data Matrix barcode](http://en.wikipedia.org/wiki/Data_Matrix)
in the [Ć programming language](http://cito.sourceforge.net/).
Ć can be automatically translated to pure C, Java, C#, JavaScript, ActionScript, Perl and [D](http://dlang.org/)
with no additional dependencies.

Currently the project includes an encoder for all ECC 200 symbol sizes (square and rectangular).
Symbol size may be set a priori or a smallest symbol may be selected for the encoded message.
ASCII encoding and digit pairs are supported.
I made an attempt to support ISO 8859-1, but I'm not sure whether it's correct.

Future version will support other encodings and perhaps a decoder.

Try the [HTML 5 encoder](http://pfusik.github.com/datamatrix-ci/html5datamatrix.html) right in your browser.
