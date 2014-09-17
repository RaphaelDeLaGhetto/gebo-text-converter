gebo-text-converter
===================

A gebo-server module for document-to-text conversions


# Third-party requirements

This packages was built and tested for Ubuntu 14.04.


```
sudo apt-get install poppler-utils
sudo apt-get install docx2txt
sudo apt-get install unrtf
sudo apt-get install odt2txt
sudo apt-get install catdoc
```

# Install

```
npm install gebo-text-converter
```

# Usage

```
var converter = require('gebo-text-converter');

converter.convert('/path/to/some/file').
    then(text) {
        console.log(text); 
      }).
    catch(err) {
        // Something went wrong 
      });
```

# Licence

MIT

