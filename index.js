'use strict';

var exec = require('child_process').exec,
    q = require('q');

module.exports = function() {

    /**
     * Determine this file's type so as to know which 
     * text conversion software to run
     *
     * @param string
     *
     * @return promise
     */
    function _getFileType(path) {
        var deferred = q.defer();
        exec('file --mime-type ' + path, function(err, stdout, stderr) {
            if (err) {
              deferred.reject(err);
            }
            else {
              var type = stdout.split(' ').pop().trim();
              switch(type) {
                case 'application/msword':
                    deferred.resolve('doc');
                    break;
                case 'application/zip':
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    deferred.resolve('docx');
                    break;
                case 'application/vnd.oasis.opendocument.text':
                    deferred.resolve('odt');
                    break;
                case 'application/pdf': 
                    deferred.resolve('pdf');
                    break;
                case 'text/rtf': 
                case 'application/rtf': 
                    deferred.resolve('rtf');
                    break;
                case 'text/plain': 
                    deferred.resolve('txt');
                    break;
                default:
                    deferred.resolve(null);
              }
            }
          });
        return deferred.promise;
      };
    exports.getFileType = _getFileType; 

    return exports;
  }();
