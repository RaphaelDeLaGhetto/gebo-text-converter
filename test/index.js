var doc = require('..'),
    exec = require('child_process').exec;

/**
 * convert
 */
exports.convert = {

    'Return text when given a Microsoft doc': function(test) {
        test.expect(1);
        doc.convert('test/docs/doc.doc').
            then(function(text) {
                    test.equal(text, 'This is supposed to be a Microsoft Word doc. ' +
                                     'It was created with\nLibreOffice.\n\n');
                    test.done();
              }).
            catch(function(err) {
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a Microsoft doc with no file type': function(test) {
        test.expect(1);
        doc.convert('test/docs/doc-no-ext').
            then(function(text) {
                    test.equal(text, 'This is supposed to be a Microsoft Word doc. ' +
                                     'It was created with\nLibreOffice.\n\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a Microsoft docx': function(test) {
        test.expect(1);
        doc.convert('test/docs/docx.docx').
            then(function(text) {
                    test.equal(text, '\rThis is supposed to be a Microsoft docx. ' + 
                                     'It was created with Google Docs.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a Microsoft docx with no file type': function(test) {
        test.expect(1);
        doc.convert('test/docs/docx-no-ext').
            then(function(text) {
                    test.equal(text, '\rThis is supposed to be a Microsoft docx. ' + 
                                     'It was created with Google Docs.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given an OpenOffice ODT': function(test) {
        test.expect(1);
        doc.convert('test/docs/odt.odt').
            then(function(text) {
                    test.equal(text, 'This is an OpenOffice odt document. ' +
                                     'It was created with LibreOffice.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given an OpenOffice ODT with no type': function(test) {
        test.expect(1);
        doc.convert('test/docs/odt-no-ext').
            then(function(text) {
                    test.equal(text, 'This is an OpenOffice odt document. ' +
                                     'It was created with LibreOffice.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a Google Doc PDF': function(test) {
        test.expect(1);
        doc.convert('test/docs/pdf.pdf').
            then(function(text) {
                    test.equal(text, 'This is a pdf. It was created with Google Docs.\n\n\f');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a Google Doc PDF with no type': function(test) {
        test.expect(1);
        doc.convert('test/docs/pdf-no-ext').
            then(function(text) {
                    test.equal(text, 'This is a pdf. It was created with Google Docs.\n\n\f');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a LibreOffice rtf': function(test) {
        test.expect(1);
        doc.convert('test/docs/rtf.rtf').
            then(function(text) {
                    test.equal(text, 'This is an rtf document. It was created with LibreOffice.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a LibreOffice rtf with no type': function(test) {
        test.expect(1);
        doc.convert('test/docs/rtf-no-ext').
            then(function(text) {
                    test.equal(text, 'This is an rtf document. It was created with LibreOffice.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a txt document': function(test) {
        test.expect(1);
        doc.convert('test/docs/txt.txt').
            then(function(text) {
                    test.equal(text, 'This is a txt document. It was created with VIM.\n');
                    test.done();
              }).
            catch(function(err) {
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a txt document with no type': function(test) {
        test.expect(1);
        doc.convert('test/docs/txt-no-ext').
            then(function(text) {
                    test.equal(text, 'This is a txt document. It was created with VIM.\n');
                    test.done();
              }).
            catch(function(err) {
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return error when given a DOC that thinks it\'s a PDF': function(test) {
        test.expect(1);
        doc.convert('test/docs/doc.pdf').
            then(function(text) {
                    test.equal(text, 'This is supposed to be a Microsoft Word doc. ' +
                                     'It was created with\nLibreOffice.\n\n');
                    test.done();
              }).
            catch(function(err) {
                    test.ok(false, err);
                    test.done();
              });
    },
};

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
 * resolveMimeType
 */
exports.resolveMimeType = {

    'Return "doc" when given "application/msword"': function(test) {
        test.expect(1);
        test.equal(doc.resolveMimeType('application/msword'), 'doc');
        test.done();
    },

    'Return "docx" when given "application/zip" or "application/vnd.openxmlformats-officedocument.wordprocessingml.document"': function(test) {
        test.expect(2);
        test.equal(doc.resolveMimeType('application/zip'), 'docx');
        test.equal(doc.resolveMimeType('application/vnd.openxmlformats-officedocument.wordprocessingml.document'), 'docx');
        test.done();
    },

    'Return "odt" when given "application/vnd.oasis.opendocument.text"': function(test) {
        test.expect(1);
        test.equal(doc.resolveMimeType('application/vnd.oasis.opendocument.text'), 'odt');
        test.done();
    },

    'Return "pdf" when given "application/pdf"': function(test) {
        test.expect(1);
        test.equal(doc.resolveMimeType('application/pdf'), 'pdf');
        test.done();
    },

    'Return "rtf" when given "text/rtf" or "application/rtf"': function(test) {
        test.expect(2);
        test.equal(doc.resolveMimeType('text/rtf'), 'rtf');
        test.equal(doc.resolveMimeType('application/rtf'), 'rtf');
        test.done();
    },

    'Return "txt" when given "text/plain"': function(test) {
        test.expect(1);
        test.equal(doc.resolveMimeType('text/plain'), 'txt');
        test.done();
    },

    'Return null when given an unrecognized type': function(test) {
        test.expect(1);
        test.equal(doc.resolveMimeType('unrecognized/type'), null);
        test.done();
    },
};
