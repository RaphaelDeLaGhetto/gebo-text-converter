var doc = require('..'),
    fs = require('fs'),
    exec = require('child_process').exec;

/**
 * convertToText
 */
//exports.convertToText = {
//
//    'Return text when given a Microsoft doc': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/doc.doc').
//            then(function(text) {
//                    test.equal(text, 'This is supposed to be a Microsoft Word doc. ' +
//                                     'It was created with LibreOffice.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log('err');
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    /**
//     * 2014-7-14
//     * I discovered that antiword doesn't like hosted servers. By passing
//     * an environment variable, the associated problem disappears.
//     *
//     * This test is useless, except that it will remind me what it takes
//     * to get antiword working
//     */
////    'Return text when given a Microsoft doc with options': function(test) {
////        test.expect(1);
////
////        var environment = process.env;
////        environment.ANTIWORDHOME = '/usr/share/antiword';
////        var options = { env: environment };
////
////        doc.convertToText('test/docs/doc.doc', options).
////            then(function(text) {
////                    test.equal(text, 'This is supposed to be a Microsoft Word doc. ' +
////                                     'It was created with LibreOffice.\n');
////                    test.done();
////              }).
////            catch(function(err) {
////                    console.log('err');
////                    console.log(err);
////                    test.ok(false, err);
////                    test.done();
////              });
////    },
//
//
//    'Return text when given a Microsoft doc with no file type': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/doc').
//            then(function(text) {
//                    test.equal(text, 'This is supposed to be a Microsoft Word doc. ' +
//                                     'It was created with LibreOffice.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log('err');
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Delete temp file containing converted Microsoft DOC text': function(test) {
//        test.expect(2);
//        var count = fs.readdirSync('/tmp').length;
//
//        doc.convertToText('test/docs/doc.doc').
//            then(function(text) {
//                    test.equal(text, 'This is supposed to be a Microsoft Word doc. ' +
//                                     'It was created with LibreOffice.\n');
//                    test.equal(count, fs.readdirSync('/tmp').length);
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log('err');
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given a Microsoft docx': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/docx.docx').
//            then(function(text) {
//                    test.equal(text, '\rThis is supposed to be a Microsoft docx. ' + 
//                                     'It was created with Google Docs.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log('err');
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given a Microsoft docx with no file type': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/docx').
//            then(function(text) {
//                    test.equal(text, '\rThis is supposed to be a Microsoft docx. ' + 
//                                     'It was created with Google Docs.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log('err');
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Delete temp file containing converted Microsoft DOCX text': function(test) {
//        test.expect(2);
//        var count = fs.readdirSync('/tmp').length;
//
//        doc.convertToText('test/docs/docx.docx').
//            then(function(text) {
//                    test.equal(text, '\rThis is supposed to be a Microsoft docx. ' +
//                                     'It was created with Google Docs.\n');
//                    test.equal(count, fs.readdirSync('/tmp').length);
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log('err');
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given an OpenOffice ODT': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/odt.odt').
//            then(function(text) {
//                    test.equal(text, 'This is an OpenOffice odt document. ' +
//                                     'It was created with LibreOffice.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given an OpenOffice ODT with no type': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/odt').
//            then(function(text) {
//                    test.equal(text, 'This is an OpenOffice odt document. ' +
//                                     'It was created with LibreOffice.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Delete temp file containing converted OpenOffice ODT text': function(test) {
//        test.expect(2);
//        var count = fs.readdirSync('/tmp').length;
//
//        doc.convertToText('test/docs/odt.odt').
//            then(function(text) {
//                    test.equal(text, 'This is an OpenOffice odt document. ' +
//                                     'It was created with LibreOffice.\n');
//                    test.equal(count, fs.readdirSync('/tmp').length);
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log('err');
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given a Google Doc PDF': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/pdf.pdf').
//            then(function(text) {
//                    test.equal(text, 'This is a pdf. It was created with Google Docs.\n\n\f');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given a Google Doc PDF with no type': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/pdf').
//            then(function(text) {
//                    test.equal(text, 'This is a pdf. It was created with Google Docs.\n\n\f');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given a LibreOffice rtf': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/rtf.rtf').
//            then(function(text) {
//                    test.equal(text, 'This is an rtf document. It was created with LibreOffice.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given a LibreOffice rtf with no type': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/rtf').
//            then(function(text) {
//                    test.equal(text, 'This is an rtf document. It was created with LibreOffice.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log(err);
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Delete temp file containing converted LibreOffice RTF text': function(test) {
//        test.expect(2);
//        var count = fs.readdirSync('/tmp').length;
//
//        doc.convertToText('test/docs/rtf.rtf').
//            then(function(text) {
//                    test.equal(text, 'This is an rtf document. ' +
//                                     'It was created with LibreOffice.\n');
//                    test.equal(count, fs.readdirSync('/tmp').length);
//                    test.done();
//              }).
//            catch(function(err) {
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given a txt document': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/txt.txt').
//            then(function(text) {
//                    test.equal(text, 'This is a txt document. It was created with VIM.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return text when given a txt document with no type': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/txt').
//            then(function(text) {
//                    test.equal(text, 'This is a txt document. It was created with VIM.\n');
//                    test.done();
//              }).
//            catch(function(err) {
//                    test.ok(false, err);
//                    test.done();
//              });
//    },
//
//    'Return error when given a DOC that thinks it\'s a PDF': function(test) {
//        test.expect(1);
//        doc.convertToText('test/docs/doc.pdf').
//            then(function(text) {
//                    test.ok(false, 'Shouldn\'t get here');
//                    test.done();
//              }).
//            catch(function(err) {
//                    console.log
//                    test.equal(err, 'Syntax Warning: May not be a PDF file (continuing anyway)\n' +
//                                    'Syntax Error: Couldn\'t find trailer dictionary\n' +
//                                    'Syntax Error: Couldn\'t read xref table\n');
//                    test.done();
//              });
//    },
//};

/**
 * getFileType
 */
exports.getFileType = {

    'Catch error when file doesn\'t exist': function(test) {
        test.expect(1);
        doc.getFileType('/some/../weird.looking/path/somefile.xyz').
            then(function(type) {
                test.ok(false, 'Should throw error');
                test.done();
              }).
            catch(function(err) {
                test.ok(true, err);
                test.done();
              });
    },

    'Return \'doc\' when given a DOC': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/doc.doc').
            then(function(type) {
                test.equal(type, 'doc');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },


    'Return \'doc\' when given a DOC with no extension': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/doc-no-ext').
            then(function(type) {
                test.equal(type, 'doc');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Return \'docx\' when given a DOCX with no extension': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/docx-no-ext').
            then(function(type) {
                test.equal(type, 'docx');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Return \'docx\' when given a DOCX': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/docx.docx').
            then(function(type) {
                test.equal(type, 'docx');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },


    'Return \'odt\' when given an ODT with no extension': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/odt-no-ext').
            then(function(type) {
                test.equal(type, 'odt');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Return \'odt\' when given an ODT': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/odt.odt').
            then(function(type) {
                test.equal(type, 'odt');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Return \'pdf\' when given a PDF with no extension': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/pdf-no-ext').
            then(function(type) {
                test.equal(type, 'pdf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Return \'pdf\' when given a PDF with no extension': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/pdf.pdf').
            then(function(type) {
                test.equal(type, 'pdf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },


    'Return \'rtf\' when given an RTF with no extension': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/rtf-no-ext').
            then(function(type) {
                test.equal(type, 'rtf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Return \'rtf\' when given an RTF': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/rtf.rtf').
            then(function(type) {
                test.equal(type, 'rtf');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Return \'txt\' when given a TXT with no extension': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/txt-no-ext').
            then(function(type) {
                test.equal(type, 'txt');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },

    'Return \'txt\' when given a TXT': function(test) {
        test.expect(1);
        doc.getFileType('test/docs/txt.txt').
            then(function(type) {
                test.equal(type, 'txt');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);
                test.done();
              });
    },
};

/**
 * sanitizePath
 */
//exports.sanitizePath = {
//	
//    'Returns the same string when there\'s nothing to escape': function(test) {
//        test.expect(1);
//        var sanitized = doc.sanitizePath('/path/to/some/file.txt');
//        test.equal(sanitized, '/path/to/some/file.txt');
//        test.done();
//    },
//
//    'Escape brackets': function(test) {
//        test.expect(2);
//        var sanitized = doc.sanitizePath('/path/to/some/file(1).txt');
//        test.equal(sanitized, '/path/to/some/file\\(1\\).txt');
//        sanitized = doc.sanitizePath('/path/to/some/file(1)(2).txt');
//        test.equal(sanitized, '/path/to/some/file\\(1\\)\\(2\\).txt');
//        test.done();
//    },	
//    
//    'Escape spaces': function(test) {
//        test.expect(2);
//        var sanitized = doc.sanitizePath('/path/to/some file.txt');
//        test.equal(sanitized, '/path/to/some\\ file.txt');
//        sanitized = doc.sanitizePath('/path to some file.txt');
//        test.equal(sanitized, '/path\\ to\\ some\\ file.txt');
//        test.done();
//    },
//    
//    'Escape brackets and spaces': function(test) {
//        test.expect(2);
//        var sanitized = doc.sanitizePath('/path/to/some file(1).txt');
//        test.equal(sanitized, '/path/to/some\\ file\\(1\\).txt');
//        sanitized = doc.sanitizePath('/path to some file(1)(2).txt');
//        test.equal(sanitized, '/path\\ to\\ some\\ file\\(1\\)\\(2\\).txt');
//        test.done();
//    },
//    
//    'Should not double sanitize': function(test) {
//        test.expect(2);
//        var sanitized = doc.sanitizePath('/path to some file(1)(2).txt');
//        test.equal(sanitized, '/path\\ to\\ some\\ file\\(1\\)\\(2\\).txt');
//        sanitized = doc.sanitizePath(sanitized);
//        test.equal(sanitized, '/path\\ to\\ some\\ file\\(1\\)\\(2\\).txt');
//        test.done();
//    },
//};



