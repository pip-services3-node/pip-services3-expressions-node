# Tokenizers, parsers and expression calculatorss for Pip.Services in Node.js Changelog

## <a name="3.0.0"></a> 3.0.0 (2018-08-12)

### Breaking Changes
* Moved Shutdown to pip-services3-components 
* Moved Component to pip-services3-components 

## <a name="2.5.0"></a> 2.5.0 (2018-05-14)

### Features
* Added Shutdown to simulate fatal errors in expressionss

## <a name="2.4.0"></a> 2.4.0 (2018-03-26)

### Features
* ExpressionsInfo was replaced with ContextInfo from pip-services3-commons

## <a name="2.2.0"></a> 2.2.0 (2017-04-20)

### Features
* Migrated to pip-services3-commons 2.4
* Implemented IOpenable interface in ManagedReferences 
* Added Component class

### Bug Fixes
* Removed exception when fail to start expressions is being closed

## <a name="2.1.4"></a> 2.1.4 (2017-04-18)

### Bug Fixes
* Fixed error handling in Expressions.open()

## <a name="2.1.3"></a> 2.1.3 (2017-04-12)

### Features
* **expressions** Now supports IConfigurable, IReferenceable, IUnreferenceable and IOpenable interfaces
* Added name and description to expressions constructor
* Now expressions info is defined automatically

### Bug Fixes
* Expressions start and stop methods were renamed to open and close

## <a name="2.1.0"></a> 2.1.0 (2017-04-11)

### Bug Fixes
* **config** Added parameterization
* ProcessExpressions now supports command line parameters

## <a name="2.0.6"></a> 2.0.6 (2017-02-25)

### Bug Fixes
* Fixed reading ExpressionsInfo from config

## <a name="2.0.4"></a> 2.0.4 (2017-02-25)

### Features
* **build** Added default factories for ConfigReader, CredentialStore and Discovery components

### Bug Fixes
* Fixed Ctrl-C handling in ProcessExpressions

## <a name="2.0.0"></a> 2.0.0 (2017-02-25)

### Breaking Changes
* Moved over **ManagedReferences** from **pip-services3-commons**

## <a name="1.0.0"></a> 1.0.0 (2017-01-28)

Initial public release

### Features
* **build** Expressions default factory
* **config** Expressions configuration
* **info** Expressions information block
* **refer** Expressions references
* **process** Expressions system process

### Bug Fixes
No fixes in this version

