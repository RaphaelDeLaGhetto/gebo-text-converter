'use strict';

var exec = require('child_process').exec,
    mime = require('mime'),
    nconf = require('nconf'),
    sprintf = require('sprintf-js').sprintf,
    q = require('q'),
    winston = require('winston');

module.exports = function() {

    // Load configuration
    nconf.file('./gebo.json');
    var _config = nconf.get('textConverter');
    var _logLevel = nconf.get('logLevel');
    var logger = new (winston.Logger)({ transports: [ new (winston.transports.Console)({ colorize: true }) ] });

    /**
     * Take a file and return plain text
     *
     * @param string
     *
     * @return promise
     */
    function _convert(path, options) {
        var deferred = q.defer();

        if (!options) {
          options = {};
        }

        _getFileType(path).
          then(function(type) {
                var command = sprintf(_config[type], path);
                if (!command) {
                  command = sprintf(_config.default, path);
                }

                if (_logLevel === 'trace') logger.info('gebo-text-converter command:', command);                    

                exec(command, options, function(err, stdout, stderr) {
                    if (err) {
                      if (_logLevel === 'trace') logger.error('gebo-text-converter', err);                    
                      deferred.reject(err);
                    }
                    else {
                      if (stderr && _logLevel === 'trace') logger.warn('gebo-text-converter', stderr);                    
                      deferred.resolve(stdout);
                    }
                  });
            }).
          catch(function(err) {
                if (_logLevel === 'trace') logger.error('gebo-text-converter _getFileType:', err);                    
                deferred.reject(err);
            });
        return deferred.promise;
      };
    exports.convert = _convert; 

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
            var mimeType = stdout.split(' ').pop().trim();
            var type = _resolveMimeType(mimeType);
            if (type) {
              deferred.resolve(type);
            }
            else {
              deferred.resolve(_resolveMimeType(mime.lookup(path)));
            }
          }
        });
        return deferred.promise;
      };
    exports.getFileType = _getFileType; 

    /**
     * Just needed to DRY out my code after deciding on a two-step 
     * mime-determining scheme in _getFileType
     *
     * @param string
     *
     * @return string
     */
    function _resolveMimeType(mimeType) {
        switch(mimeType) {
            case 'application/msword':
                return 'doc';
            case 'application/zip':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'docx';
            case 'application/vnd.oasis.opendocument.text':
                return 'odt';
            case 'application/pdf': 
                return 'pdf';
            case 'text/rtf': 
            case 'application/rtf': 
                return 'rtf';
            case 'text/plain': 
                return 'txt';
            default:
                return;
        }
      };
    exports.resolveMimeType = _resolveMimeType; 
    
    return exports;
  }();
