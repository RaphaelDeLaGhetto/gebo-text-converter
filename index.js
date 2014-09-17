'use strict';

var exec = require('child_process').exec,
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
