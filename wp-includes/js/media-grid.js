/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/_enqueues/wp/media/grid.js":
/*!*******************************************!*\
  !*** ./src/js/_enqueues/wp/media/grid.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * @output wp-includes/js/media-grid.js\n */\n\nvar media = wp.media;\n\nmedia.controller.EditAttachmentMetadata = __webpack_require__( /*! ../../../media/controllers/edit-attachment-metadata.js */ \"./src/js/media/controllers/edit-attachment-metadata.js\" );\nmedia.view.MediaFrame.Manage = __webpack_require__( /*! ../../../media/views/frame/manage.js */ \"./src/js/media/views/frame/manage.js\" );\nmedia.view.Attachment.Details.TwoColumn = __webpack_require__( /*! ../../../media/views/attachment/details-two-column.js */ \"./src/js/media/views/attachment/details-two-column.js\" );\nmedia.view.MediaFrame.Manage.Router = __webpack_require__( /*! ../../../media/routers/manage.js */ \"./src/js/media/routers/manage.js\" );\nmedia.view.EditImage.Details = __webpack_require__( /*! ../../../media/views/edit-image-details.js */ \"./src/js/media/views/edit-image-details.js\" );\nmedia.view.MediaFrame.EditAttachments = __webpack_require__( /*! ../../../media/views/frame/edit-attachments.js */ \"./src/js/media/views/frame/edit-attachments.js\" );\nmedia.view.SelectModeToggleButton = __webpack_require__( /*! ../../../media/views/button/select-mode-toggle.js */ \"./src/js/media/views/button/select-mode-toggle.js\" );\nmedia.view.DeleteSelectedButton = __webpack_require__( /*! ../../../media/views/button/delete-selected.js */ \"./src/js/media/views/button/delete-selected.js\" );\nmedia.view.DeleteSelectedPermanentlyButton = __webpack_require__( /*! ../../../media/views/button/delete-selected-permanently.js */ \"./src/js/media/views/button/delete-selected-permanently.js\" );\n\n\n//# sourceURL=webpack:///./src/js/_enqueues/wp/media/grid.js?");

/***/ }),

/***/ "./src/js/media/controllers/edit-attachment-metadata.js":
/*!**************************************************************!*\
  !*** ./src/js/media/controllers/edit-attachment-metadata.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var l10n = wp.media.view.l10n,\n\tEditAttachmentMetadata;\n\n/**\n * wp.media.controller.EditAttachmentMetadata\n *\n * A state for editing an attachment's metadata.\n *\n * @memberOf wp.media.controller\n *\n * @class\n * @augments wp.media.controller.State\n * @augments Backbone.Model\n */\nEditAttachmentMetadata = wp.media.controller.State.extend(/** @lends wp.media.controller.EditAttachmentMetadata.prototype */{\n\tdefaults: {\n\t\tid:      'edit-attachment',\n\t\t// Title string passed to the frame's title region view.\n\t\ttitle:   l10n.attachmentDetails,\n\t\t// Region mode defaults.\n\t\tcontent: 'edit-metadata',\n\t\tmenu:    false,\n\t\ttoolbar: false,\n\t\trouter:  false\n\t}\n});\n\nmodule.exports = EditAttachmentMetadata;\n\n\n//# sourceURL=webpack:///./src/js/media/controllers/edit-attachment-metadata.js?");

/***/ }),

/***/ "./src/js/media/routers/manage.js":
/*!****************************************!*\
  !*** ./src/js/media/routers/manage.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * wp.media.view.MediaFrame.Manage.Router\n *\n * A router for handling the browser history and application state.\n *\n * @memberOf wp.media.view.MediaFrame.Manage\n *\n * @class\n * @augments Backbone.Router\n */\nvar Router = Backbone.Router.extend(/** @lends wp.media.view.MediaFrame.Manage.Router.prototype */{\n\troutes: {\n\t\t'upload.php?item=:slug&mode=edit': 'editItem',\n\t\t'upload.php?item=:slug':           'showItem',\n\t\t'upload.php?search=:query':        'search',\n\t\t'upload.php':                      'reset'\n\t},\n\n\t// Map routes against the page URL\n\tbaseUrl: function( url ) {\n\t\treturn 'upload.php' + url;\n\t},\n\n\treset: function() {\n\t\tvar frame = wp.media.frames.edit;\n\n\t\tif ( frame ) {\n\t\t\tframe.close();\n\t\t}\n\t},\n\n\t// Respond to the search route by filling the search field and trigggering the input event\n\tsearch: function( query ) {\n\t\tjQuery( '#media-search-input' ).val( query ).trigger( 'input' );\n\t},\n\n\t// Show the modal with a specific item\n\tshowItem: function( query ) {\n\t\tvar media = wp.media,\n\t\t\tframe = media.frames.browse,\n\t\t\tlibrary = frame.state().get('library'),\n\t\t\titem;\n\n\t\t// Trigger the media frame to open the correct item\n\t\titem = library.findWhere( { id: parseInt( query, 10 ) } );\n\t\titem.set( 'skipHistory', true );\n\n\t\tif ( item ) {\n\t\t\tframe.trigger( 'edit:attachment', item );\n\t\t} else {\n\t\t\titem = media.attachment( query );\n\t\t\tframe.listenTo( item, 'change', function( model ) {\n\t\t\t\tframe.stopListening( item );\n\t\t\t\tframe.trigger( 'edit:attachment', model );\n\t\t\t} );\n\t\t\titem.fetch();\n\t\t}\n\t},\n\n\t// Show the modal in edit mode with a specific item.\n\teditItem: function( query ) {\n\t\tthis.showItem( query );\n\t\twp.media.frames.edit.content.mode( 'edit-details' );\n\t}\n});\n\nmodule.exports = Router;\n\n\n//# sourceURL=webpack:///./src/js/media/routers/manage.js?");

/***/ }),

/***/ "./src/js/media/views/attachment/details-two-column.js":
/*!*************************************************************!*\
  !*** ./src/js/media/views/attachment/details-two-column.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Details = wp.media.view.Attachment.Details,\n\tTwoColumn;\n\n/**\n * wp.media.view.Attachment.Details.TwoColumn\n *\n * A similar view to media.view.Attachment.Details\n * for use in the Edit Attachment modal.\n *\n * @memberOf wp.media.view.Attachment.Details\n *\n * @class\n * @augments wp.media.view.Attachment.Details\n * @augments wp.media.view.Attachment\n * @augments wp.media.View\n * @augments wp.Backbone.View\n * @augments Backbone.View\n */\nTwoColumn = Details.extend(/** @lends wp.media.view.Attachment.Details.TowColumn.prototype */{\n\ttemplate: wp.template( 'attachment-details-two-column' ),\n\n\tinitialize: function() {\n\t\tthis.controller.on( 'content:activate:edit-details', _.bind( this.editAttachment, this ) );\n\n\t\tDetails.prototype.initialize.apply( this, arguments );\n\t},\n\n\teditAttachment: function( event ) {\n\t\tif ( event ) {\n\t\t\tevent.preventDefault();\n\t\t}\n\t\tthis.controller.content.mode( 'edit-image' );\n\t},\n\n\t/**\n\t * Noop this from parent class, doesn't apply here.\n\t */\n\ttoggleSelectionHandler: function() {},\n\n\trender: function() {\n\t\tDetails.prototype.render.apply( this, arguments );\n\n\t\twp.media.mixin.removeAllPlayers();\n\t\tthis.$( 'audio, video' ).each( function (i, elem) {\n\t\t\tvar el = wp.media.view.MediaDetails.prepareSrc( elem );\n\t\t\tnew window.MediaElementPlayer( el, wp.media.mixin.mejsSettings );\n\t\t} );\n\t}\n});\n\nmodule.exports = TwoColumn;\n\n\n//# sourceURL=webpack:///./src/js/media/views/attachment/details-two-column.js?");

/***/ }),

/***/ "./src/js/media/views/button/delete-selected-permanently.js":
/*!******************************************************************!*\
  !*** ./src/js/media/views/button/delete-selected-permanently.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Button = wp.media.view.Button,\n\tDeleteSelected = wp.media.view.DeleteSelectedButton,\n\tDeleteSelectedPermanently;\n\n/**\n * wp.media.view.DeleteSelectedPermanentlyButton\n *\n * When MEDIA_TRASH is true, a button that handles bulk Delete Permanently logic\n *\n * @memberOf wp.media.view\n *\n * @class\n * @augments wp.media.view.DeleteSelectedButton\n * @augments wp.media.view.Button\n * @augments wp.media.View\n * @augments wp.Backbone.View\n * @augments Backbone.View\n */\nDeleteSelectedPermanently = DeleteSelected.extend(/** @lends wp.media.view.DeleteSelectedPermanentlyButton.prototype */{\n\tinitialize: function() {\n\t\tDeleteSelected.prototype.initialize.apply( this, arguments );\n\t\tthis.controller.on( 'select:activate', this.selectActivate, this );\n\t\tthis.controller.on( 'select:deactivate', this.selectDeactivate, this );\n\t},\n\n\tfilterChange: function( model ) {\n\t\tthis.canShow = ( 'trash' === model.get( 'status' ) );\n\t},\n\n\tselectActivate: function() {\n\t\tthis.toggleDisabled();\n\t\tthis.$el.toggleClass( 'hidden', ! this.canShow );\n\t},\n\n\tselectDeactivate: function() {\n\t\tthis.toggleDisabled();\n\t\tthis.$el.addClass( 'hidden' );\n\t},\n\n\trender: function() {\n\t\tButton.prototype.render.apply( this, arguments );\n\t\tthis.selectActivate();\n\t\treturn this;\n\t}\n});\n\nmodule.exports = DeleteSelectedPermanently;\n\n\n//# sourceURL=webpack:///./src/js/media/views/button/delete-selected-permanently.js?");

/***/ }),

/***/ "./src/js/media/views/button/delete-selected.js":
/*!******************************************************!*\
  !*** ./src/js/media/views/button/delete-selected.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Button = wp.media.view.Button,\n\tl10n = wp.media.view.l10n,\n\tDeleteSelected;\n\n/**\n * wp.media.view.DeleteSelectedButton\n *\n * A button that handles bulk Delete/Trash logic\n *\n * @memberOf wp.media.view\n *\n * @class\n * @augments wp.media.view.Button\n * @augments wp.media.View\n * @augments wp.Backbone.View\n * @augments Backbone.View\n */\nDeleteSelected = Button.extend(/** @lends wp.media.view.DeleteSelectedButton.prototype */{\n\tinitialize: function() {\n\t\tButton.prototype.initialize.apply( this, arguments );\n\t\tif ( this.options.filters ) {\n\t\t\tthis.options.filters.model.on( 'change', this.filterChange, this );\n\t\t}\n\t\tthis.controller.on( 'selection:toggle', this.toggleDisabled, this );\n\t},\n\n\tfilterChange: function( model ) {\n\t\tif ( 'trash' === model.get( 'status' ) ) {\n\t\t\tthis.model.set( 'text', l10n.untrashSelected );\n\t\t} else if ( wp.media.view.settings.mediaTrash ) {\n\t\t\tthis.model.set( 'text', l10n.trashSelected );\n\t\t} else {\n\t\t\tthis.model.set( 'text', l10n.deleteSelected );\n\t\t}\n\t},\n\n\ttoggleDisabled: function() {\n\t\tthis.model.set( 'disabled', ! this.controller.state().get( 'selection' ).length );\n\t},\n\n\trender: function() {\n\t\tButton.prototype.render.apply( this, arguments );\n\t\tif ( this.controller.isModeActive( 'select' ) ) {\n\t\t\tthis.$el.addClass( 'delete-selected-button' );\n\t\t} else {\n\t\t\tthis.$el.addClass( 'delete-selected-button hidden' );\n\t\t}\n\t\tthis.toggleDisabled();\n\t\treturn this;\n\t}\n});\n\nmodule.exports = DeleteSelected;\n\n\n//# sourceURL=webpack:///./src/js/media/views/button/delete-selected.js?");

/***/ }),

/***/ "./src/js/media/views/button/select-mode-toggle.js":
/*!*********************************************************!*\
  !*** ./src/js/media/views/button/select-mode-toggle.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nvar Button = wp.media.view.Button,\n\tl10n = wp.media.view.l10n,\n\tSelectModeToggle;\n\n/**\n * wp.media.view.SelectModeToggleButton\n *\n * @memberOf wp.media.view\n *\n * @class\n * @augments wp.media.view.Button\n * @augments wp.media.View\n * @augments wp.Backbone.View\n * @augments Backbone.View\n */\nSelectModeToggle = Button.extend(/** @lends wp.media.view.SelectModeToggle.prototype */{\n\tinitialize: function() {\n\t\t_.defaults( this.options, {\n\t\t\tsize : ''\n\t\t} );\n\n\t\tButton.prototype.initialize.apply( this, arguments );\n\t\tthis.controller.on( 'select:activate select:deactivate', this.toggleBulkEditHandler, this );\n\t\tthis.controller.on( 'selection:action:done', this.back, this );\n\t},\n\n\tback: function () {\n\t\tthis.controller.deactivateMode( 'select' ).activateMode( 'edit' );\n\t},\n\n\tclick: function() {\n\t\tButton.prototype.click.apply( this, arguments );\n\t\tif ( this.controller.isModeActive( 'select' ) ) {\n\t\t\tthis.back();\n\t\t} else {\n\t\t\tthis.controller.deactivateMode( 'edit' ).activateMode( 'select' );\n\t\t}\n\t},\n\n\trender: function() {\n\t\tButton.prototype.render.apply( this, arguments );\n\t\tthis.$el.addClass( 'select-mode-toggle-button' );\n\t\treturn this;\n\t},\n\n\ttoggleBulkEditHandler: function() {\n\t\tvar toolbar = this.controller.content.get().toolbar, children;\n\n\t\tchildren = toolbar.$( '.media-toolbar-secondary > *, .media-toolbar-primary > *' );\n\n\t\t// TODO: the Frame should be doing all of this.\n\t\tif ( this.controller.isModeActive( 'select' ) ) {\n\t\t\tthis.model.set( {\n\t\t\t\tsize: 'large',\n\t\t\t\ttext: l10n.cancelSelection\n\t\t\t} );\n\t\t\tchildren.not( '.spinner, .media-button' ).hide();\n\t\t\tthis.$el.show();\n\t\t\ttoolbar.$( '.delete-selected-button' ).removeClass( 'hidden' );\n\t\t} else {\n\t\t\tthis.model.set( {\n\t\t\t\tsize: '',\n\t\t\t\ttext: l10n.bulkSelect\n\t\t\t} );\n\t\t\tthis.controller.content.get().$el.removeClass( 'fixed' );\n\t\t\ttoolbar.$el.css( 'width', '' );\n\t\t\ttoolbar.$( '.delete-selected-button' ).addClass( 'hidden' );\n\t\t\tchildren.not( '.media-button' ).show();\n\t\t\tthis.controller.state().get( 'selection' ).reset();\n\t\t}\n\t}\n});\n\nmodule.exports = SelectModeToggle;\n\n\n//# sourceURL=webpack:///./src/js/media/views/button/select-mode-toggle.js?");

/***/ }),

/***/ "./src/js/media/views/edit-image-details.js":
/*!**************************************************!*\
  !*** ./src/js/media/views/edit-image-details.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var View = wp.media.View,\n\tEditImage = wp.media.view.EditImage,\n\tDetails;\n\n/**\n * wp.media.view.EditImage.Details\n *\n * @memberOf wp.media.view.EditImage\n *\n * @class\n * @augments wp.media.view.EditImage\n * @augments wp.media.View\n * @augments wp.Backbone.View\n * @augments Backbone.View\n */\nDetails = EditImage.extend(/** @lends wp.media.view.EditImage.Details.prototype */{\n\tinitialize: function( options ) {\n\t\tthis.editor = window.imageEdit;\n\t\tthis.frame = options.frame;\n\t\tthis.controller = options.controller;\n\t\tView.prototype.initialize.apply( this, arguments );\n\t},\n\n\tback: function() {\n\t\tthis.frame.content.mode( 'edit-metadata' );\n\t},\n\n\tsave: function() {\n\t\tthis.model.fetch().done( _.bind( function() {\n\t\t\tthis.frame.content.mode( 'edit-metadata' );\n\t\t}, this ) );\n\t}\n});\n\nmodule.exports = Details;\n\n\n//# sourceURL=webpack:///./src/js/media/views/edit-image-details.js?");

/***/ }),

/***/ "./src/js/media/views/frame/edit-attachments.js":
/*!******************************************************!*\
  !*** ./src/js/media/views/frame/edit-attachments.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Frame = wp.media.view.Frame,\n\tMediaFrame = wp.media.view.MediaFrame,\n\n\t$ = jQuery,\n\tEditAttachments;\n\n/**\n * wp.media.view.MediaFrame.EditAttachments\n *\n * A frame for editing the details of a specific media item.\n *\n * Opens in a modal by default.\n *\n * Requires an attachment model to be passed in the options hash under `model`.\n *\n * @memberOf wp.media.view.MediaFrame\n *\n * @class\n * @augments wp.media.view.Frame\n * @augments wp.media.View\n * @augments wp.Backbone.View\n * @augments Backbone.View\n * @mixes wp.media.controller.StateMachine\n */\nEditAttachments = MediaFrame.extend(/** @lends wp.media.view.MediaFrame.EditAttachments.prototype */{\n\n\tclassName: 'edit-attachment-frame',\n\ttemplate:  wp.template( 'edit-attachment-frame' ),\n\tregions:   [ 'title', 'content' ],\n\n\tevents: {\n\t\t'click .left':  'previousMediaItem',\n\t\t'click .right': 'nextMediaItem'\n\t},\n\n\tinitialize: function() {\n\t\tFrame.prototype.initialize.apply( this, arguments );\n\n\t\t_.defaults( this.options, {\n\t\t\tmodal: true,\n\t\t\tstate: 'edit-attachment'\n\t\t});\n\n\t\tthis.controller = this.options.controller;\n\t\tthis.gridRouter = this.controller.gridRouter;\n\t\tthis.library = this.options.library;\n\n\t\tif ( this.options.model ) {\n\t\t\tthis.model = this.options.model;\n\t\t}\n\n\t\tthis.bindHandlers();\n\t\tthis.createStates();\n\t\tthis.createModal();\n\n\t\tthis.title.mode( 'default' );\n\t\tthis.toggleNav();\n\t},\n\n\tbindHandlers: function() {\n\t\t// Bind default title creation.\n\t\tthis.on( 'title:create:default', this.createTitle, this );\n\n\t\tthis.on( 'content:create:edit-metadata', this.editMetadataMode, this );\n\t\tthis.on( 'content:create:edit-image', this.editImageMode, this );\n\t\tthis.on( 'content:render:edit-image', this.editImageModeRender, this );\n\t\tthis.on( 'refresh', this.rerender, this );\n\t\tthis.on( 'close', this.detach );\n\n\t\tthis.bindModelHandlers();\n\t\tthis.listenTo( this.gridRouter, 'route:search', this.close, this );\n\t},\n\n\tbindModelHandlers: function() {\n\t\t// Close the modal if the attachment is deleted.\n\t\tthis.listenTo( this.model, 'change:status destroy', this.close, this );\n\t},\n\n\tcreateModal: function() {\n\t\t// Initialize modal container view.\n\t\tif ( this.options.modal ) {\n\t\t\tthis.modal = new wp.media.view.Modal({\n\t\t\t\tcontroller: this,\n\t\t\t\ttitle:      this.options.title\n\t\t\t});\n\n\t\t\tthis.modal.on( 'open', _.bind( function () {\n\t\t\t\t$( 'body' ).on( 'keydown.media-modal', _.bind( this.keyEvent, this ) );\n\t\t\t}, this ) );\n\n\t\t\t// Completely destroy the modal DOM element when closing it.\n\t\t\tthis.modal.on( 'close', _.bind( function() {\n\t\t\t\t$( 'body' ).off( 'keydown.media-modal' ); /* remove the keydown event */\n\t\t\t\t// Restore the original focus item if possible\n\t\t\t\t$( 'li.attachment[data-id=\"' + this.model.get( 'id' ) +'\"]' ).focus();\n\t\t\t\tthis.resetRoute();\n\t\t\t}, this ) );\n\n\t\t\t// Set this frame as the modal's content.\n\t\t\tthis.modal.content( this );\n\t\t\tthis.modal.open();\n\t\t}\n\t},\n\n\t/**\n\t * Add the default states to the frame.\n\t */\n\tcreateStates: function() {\n\t\tthis.states.add([\n\t\t\tnew wp.media.controller.EditAttachmentMetadata({\n\t\t\t\tmodel:   this.model,\n\t\t\t\tlibrary: this.library\n\t\t\t})\n\t\t]);\n\t},\n\n\t/**\n\t * Content region rendering callback for the `edit-metadata` mode.\n\t *\n\t * @param {Object} contentRegion Basic object with a `view` property, which\n\t *                               should be set with the proper region view.\n\t */\n\teditMetadataMode: function( contentRegion ) {\n\t\tcontentRegion.view = new wp.media.view.Attachment.Details.TwoColumn({\n\t\t\tcontroller: this,\n\t\t\tmodel:      this.model\n\t\t});\n\n\t\t/**\n\t\t * Attach a subview to display fields added via the\n\t\t * `attachment_fields_to_edit` filter.\n\t\t */\n\t\tcontentRegion.view.views.set( '.attachment-compat', new wp.media.view.AttachmentCompat({\n\t\t\tcontroller: this,\n\t\t\tmodel:      this.model\n\t\t}) );\n\n\t\t// Update browser url when navigating media details, except on load.\n\t\tif ( this.model && ! this.model.get( 'skipHistory' ) ) {\n\t\t\tthis.gridRouter.navigate( this.gridRouter.baseUrl( '?item=' + this.model.id ) );\n\t\t}\n\t},\n\n\t/**\n\t * Render the EditImage view into the frame's content region.\n\t *\n\t * @param {Object} contentRegion Basic object with a `view` property, which\n\t *                               should be set with the proper region view.\n\t */\n\teditImageMode: function( contentRegion ) {\n\t\tvar editImageController = new wp.media.controller.EditImage( {\n\t\t\tmodel: this.model,\n\t\t\tframe: this\n\t\t} );\n\t\t// Noop some methods.\n\t\teditImageController._toolbar = function() {};\n\t\teditImageController._router = function() {};\n\t\teditImageController._menu = function() {};\n\n\t\tcontentRegion.view = new wp.media.view.EditImage.Details( {\n\t\t\tmodel: this.model,\n\t\t\tframe: this,\n\t\t\tcontroller: editImageController\n\t\t} );\n\n\t\tthis.gridRouter.navigate( this.gridRouter.baseUrl( '?item=' + this.model.id + '&mode=edit' ) );\n\n\t},\n\n\teditImageModeRender: function( view ) {\n\t\tview.on( 'ready', view.loadEditor );\n\t},\n\n\ttoggleNav: function() {\n\t\tthis.$('.left').toggleClass( 'disabled', ! this.hasPrevious() );\n\t\tthis.$('.right').toggleClass( 'disabled', ! this.hasNext() );\n\t},\n\n\t/**\n\t * Rerender the view.\n\t */\n\trerender: function( model ) {\n\t\tthis.stopListening( this.model );\n\n\t\tthis.model = model;\n\n\t\tthis.bindModelHandlers();\n\n\t\t// Only rerender the `content` region.\n\t\tif ( this.content.mode() !== 'edit-metadata' ) {\n\t\t\tthis.content.mode( 'edit-metadata' );\n\t\t} else {\n\t\t\tthis.content.render();\n\t\t}\n\n\t\tthis.toggleNav();\n\t},\n\n\t/**\n\t * Click handler to switch to the previous media item.\n\t */\n\tpreviousMediaItem: function() {\n\t\tif ( ! this.hasPrevious() ) {\n\t\t\treturn;\n\t\t}\n\t\tthis.trigger( 'refresh', this.library.at( this.getCurrentIndex() - 1 ) );\n\t\tthis.$( '.left' ).focus();\n\t},\n\n\t/**\n\t * Click handler to switch to the next media item.\n\t */\n\tnextMediaItem: function() {\n\t\tif ( ! this.hasNext() ) {\n\t\t\treturn;\n\t\t}\n\t\tthis.trigger( 'refresh', this.library.at( this.getCurrentIndex() + 1 ) );\n\t\tthis.$( '.right' ).focus();\n\t},\n\n\tgetCurrentIndex: function() {\n\t\treturn this.library.indexOf( this.model );\n\t},\n\n\thasNext: function() {\n\t\treturn ( this.getCurrentIndex() + 1 ) < this.library.length;\n\t},\n\n\thasPrevious: function() {\n\t\treturn ( this.getCurrentIndex() - 1 ) > -1;\n\t},\n\t/**\n\t * Respond to the keyboard events: right arrow, left arrow, except when\n\t * focus is in a textarea or input field.\n\t */\n\tkeyEvent: function( event ) {\n\t\tif ( ( 'INPUT' === event.target.nodeName || 'TEXTAREA' === event.target.nodeName ) && ! ( event.target.readOnly || event.target.disabled ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// The right arrow key\n\t\tif ( 39 === event.keyCode ) {\n\t\t\tthis.nextMediaItem();\n\t\t}\n\t\t// The left arrow key\n\t\tif ( 37 === event.keyCode ) {\n\t\t\tthis.previousMediaItem();\n\t\t}\n\t},\n\n\tresetRoute: function() {\n\t\tvar searchTerm = this.controller.browserView.toolbar.get( 'search' ).$el.val(),\n\t\t\turl = '' !== searchTerm ? '?search=' + searchTerm : '';\n\t\tthis.gridRouter.navigate( this.gridRouter.baseUrl( url ), { replace: true } );\n\t}\n});\n\nmodule.exports = EditAttachments;\n\n\n//# sourceURL=webpack:///./src/js/media/views/frame/edit-attachments.js?");

/***/ }),

/***/ "./src/js/media/views/frame/manage.js":
/*!********************************************!*\
  !*** ./src/js/media/views/frame/manage.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var MediaFrame = wp.media.view.MediaFrame,\n\tLibrary = wp.media.controller.Library,\n\n\t$ = Backbone.$,\n\tManage;\n\n/**\n * wp.media.view.MediaFrame.Manage\n *\n * A generic management frame workflow.\n *\n * Used in the media grid view.\n *\n * @memberOf wp.media.view.MediaFrame\n *\n * @class\n * @augments wp.media.view.MediaFrame\n * @augments wp.media.view.Frame\n * @augments wp.media.View\n * @augments wp.Backbone.View\n * @augments Backbone.View\n * @mixes wp.media.controller.StateMachine\n */\nManage = MediaFrame.extend(/** @lends wp.media.view.MediaFrame.Manage.prototype */{\n\t/**\n\t * @constructs\n\t */\n\tinitialize: function() {\n\t\t_.defaults( this.options, {\n\t\t\ttitle:     '',\n\t\t\tmodal:     false,\n\t\t\tselection: [],\n\t\t\tlibrary:   {}, // Options hash for the query to the media library.\n\t\t\tmultiple:  'add',\n\t\t\tstate:     'library',\n\t\t\tuploader:  true,\n\t\t\tmode:      [ 'grid', 'edit' ]\n\t\t});\n\n\t\tthis.$body = $( document.body );\n\t\tthis.$window = $( window );\n\t\tthis.$adminBar = $( '#wpadminbar' );\n\t\t// Store the Add New button for later reuse in wp.media.view.UploaderInline.\n\t\tthis.$uploaderToggler = $( '.page-title-action' )\n\t\t\t.attr( 'aria-expanded', 'false' )\n\t\t\t.on( 'click', _.bind( this.addNewClickHandler, this ) );\n\n\t\tthis.$window.on( 'scroll resize', _.debounce( _.bind( this.fixPosition, this ), 15 ) );\n\n\t\t// Ensure core and media grid view UI is enabled.\n\t\tthis.$el.addClass('wp-core-ui');\n\n\t\t// Force the uploader off if the upload limit has been exceeded or\n\t\t// if the browser isn't supported.\n\t\tif ( wp.Uploader.limitExceeded || ! wp.Uploader.browser.supported ) {\n\t\t\tthis.options.uploader = false;\n\t\t}\n\n\t\t// Initialize a window-wide uploader.\n\t\tif ( this.options.uploader ) {\n\t\t\tthis.uploader = new wp.media.view.UploaderWindow({\n\t\t\t\tcontroller: this,\n\t\t\t\tuploader: {\n\t\t\t\t\tdropzone:  document.body,\n\t\t\t\t\tcontainer: document.body\n\t\t\t\t}\n\t\t\t}).render();\n\t\t\tthis.uploader.ready();\n\t\t\t$('body').append( this.uploader.el );\n\n\t\t\tthis.options.uploader = false;\n\t\t}\n\n\t\tthis.gridRouter = new wp.media.view.MediaFrame.Manage.Router();\n\n\t\t// Call 'initialize' directly on the parent class.\n\t\tMediaFrame.prototype.initialize.apply( this, arguments );\n\n\t\t// Append the frame view directly the supplied container.\n\t\tthis.$el.appendTo( this.options.container );\n\n\t\tthis.createStates();\n\t\tthis.bindRegionModeHandlers();\n\t\tthis.render();\n\t\tthis.bindSearchHandler();\n\n\t\twp.media.frames.browse = this;\n\t},\n\n\tbindSearchHandler: function() {\n\t\tvar search = this.$( '#media-search-input' ),\n\t\t\tsearchView = this.browserView.toolbar.get( 'search' ).$el,\n\t\t\tlistMode = this.$( '.view-list' ),\n\n\t\t\tinput  = _.throttle( function (e) {\n\t\t\t\tvar val = $( e.currentTarget ).val(),\n\t\t\t\t\turl = '';\n\n\t\t\t\tif ( val ) {\n\t\t\t\t\turl += '?search=' + val;\n\t\t\t\t\tthis.gridRouter.navigate( this.gridRouter.baseUrl( url ), { replace: true } );\n\t\t\t\t}\n\t\t\t}, 1000 );\n\n\t\t// Update the URL when entering search string (at most once per second)\n\t\tsearch.on( 'input', _.bind( input, this ) );\n\n\t\tthis.gridRouter\n\t\t\t.on( 'route:search', function () {\n\t\t\t\tvar href = window.location.href;\n\t\t\t\tif ( href.indexOf( 'mode=' ) > -1 ) {\n\t\t\t\t\thref = href.replace( /mode=[^&]+/g, 'mode=list' );\n\t\t\t\t} else {\n\t\t\t\t\thref += href.indexOf( '?' ) > -1 ? '&mode=list' : '?mode=list';\n\t\t\t\t}\n\t\t\t\thref = href.replace( 'search=', 's=' );\n\t\t\t\tlistMode.prop( 'href', href );\n\t\t\t})\n\t\t\t.on( 'route:reset', function() {\n\t\t\t\tsearchView.val( '' ).trigger( 'input' );\n\t\t\t});\n\t},\n\n\t/**\n\t * Create the default states for the frame.\n\t */\n\tcreateStates: function() {\n\t\tvar options = this.options;\n\n\t\tif ( this.options.states ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Add the default states.\n\t\tthis.states.add([\n\t\t\tnew Library({\n\t\t\t\tlibrary:            wp.media.query( options.library ),\n\t\t\t\tmultiple:           options.multiple,\n\t\t\t\ttitle:              options.title,\n\t\t\t\tcontent:            'browse',\n\t\t\t\ttoolbar:            'select',\n\t\t\t\tcontentUserSetting: false,\n\t\t\t\tfilterable:         'all',\n\t\t\t\tautoSelect:         false\n\t\t\t})\n\t\t]);\n\t},\n\n\t/**\n\t * Bind region mode activation events to proper handlers.\n\t */\n\tbindRegionModeHandlers: function() {\n\t\tthis.on( 'content:create:browse', this.browseContent, this );\n\n\t\t// Handle a frame-level event for editing an attachment.\n\t\tthis.on( 'edit:attachment', this.openEditAttachmentModal, this );\n\n\t\tthis.on( 'select:activate', this.bindKeydown, this );\n\t\tthis.on( 'select:deactivate', this.unbindKeydown, this );\n\t},\n\n\thandleKeydown: function( e ) {\n\t\tif ( 27 === e.which ) {\n\t\t\te.preventDefault();\n\t\t\tthis.deactivateMode( 'select' ).activateMode( 'edit' );\n\t\t}\n\t},\n\n\tbindKeydown: function() {\n\t\tthis.$body.on( 'keydown.select', _.bind( this.handleKeydown, this ) );\n\t},\n\n\tunbindKeydown: function() {\n\t\tthis.$body.off( 'keydown.select' );\n\t},\n\n\tfixPosition: function() {\n\t\tvar $browser, $toolbar;\n\t\tif ( ! this.isModeActive( 'select' ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\t$browser = this.$('.attachments-browser');\n\t\t$toolbar = $browser.find('.media-toolbar');\n\n\t\t// Offset doesn't appear to take top margin into account, hence +16\n\t\tif ( ( $browser.offset().top + 16 ) < this.$window.scrollTop() + this.$adminBar.height() ) {\n\t\t\t$browser.addClass( 'fixed' );\n\t\t\t$toolbar.css('width', $browser.width() + 'px');\n\t\t} else {\n\t\t\t$browser.removeClass( 'fixed' );\n\t\t\t$toolbar.css('width', '');\n\t\t}\n\t},\n\n\t/**\n\t * Click handler for the `Add New` button.\n\t */\n\taddNewClickHandler: function( event ) {\n\t\tevent.preventDefault();\n\t\tthis.trigger( 'toggle:upload:attachment' );\n\n\t\tif ( this.uploader ) {\n\t\t\tthis.uploader.refresh();\n\t\t}\n\t},\n\n\t/**\n\t * Open the Edit Attachment modal.\n\t */\n\topenEditAttachmentModal: function( model ) {\n\t\t// Create a new EditAttachment frame, passing along the library and the attachment model.\n\t\tif ( wp.media.frames.edit ) {\n\t\t\twp.media.frames.edit.open().trigger( 'refresh', model );\n\t\t} else {\n\t\t\twp.media.frames.edit = wp.media( {\n\t\t\t\tframe:       'edit-attachments',\n\t\t\t\tcontroller:  this,\n\t\t\t\tlibrary:     this.state().get('library'),\n\t\t\t\tmodel:       model\n\t\t\t} );\n\t\t}\n\t},\n\n\t/**\n\t * Create an attachments browser view within the content region.\n\t *\n\t * @param {Object} contentRegion Basic object with a `view` property, which\n\t *                               should be set with the proper region view.\n\t * @this wp.media.controller.Region\n\t */\n\tbrowseContent: function( contentRegion ) {\n\t\tvar state = this.state();\n\n\t\t// Browse our library of attachments.\n\t\tthis.browserView = contentRegion.view = new wp.media.view.AttachmentsBrowser({\n\t\t\tcontroller: this,\n\t\t\tcollection: state.get('library'),\n\t\t\tselection:  state.get('selection'),\n\t\t\tmodel:      state,\n\t\t\tsortable:   state.get('sortable'),\n\t\t\tsearch:     state.get('searchable'),\n\t\t\tfilters:    state.get('filterable'),\n\t\t\tdate:       state.get('date'),\n\t\t\tdisplay:    state.get('displaySettings'),\n\t\t\tdragInfo:   state.get('dragInfo'),\n\t\t\tsidebar:    'errors',\n\n\t\t\tsuggestedWidth:  state.get('suggestedWidth'),\n\t\t\tsuggestedHeight: state.get('suggestedHeight'),\n\n\t\t\tAttachmentView: state.get('AttachmentView'),\n\n\t\t\tscrollElement: document\n\t\t});\n\t\tthis.browserView.on( 'ready', _.bind( this.bindDeferred, this ) );\n\n\t\tthis.errors = wp.Uploader.errors;\n\t\tthis.errors.on( 'add remove reset', this.sidebarVisibility, this );\n\t},\n\n\tsidebarVisibility: function() {\n\t\tthis.browserView.$( '.media-sidebar' ).toggle( !! this.errors.length );\n\t},\n\n\tbindDeferred: function() {\n\t\tif ( ! this.browserView.dfd ) {\n\t\t\treturn;\n\t\t}\n\t\tthis.browserView.dfd.done( _.bind( this.startHistory, this ) );\n\t},\n\n\tstartHistory: function() {\n\t\t// Verify pushState support and activate\n\t\tif ( window.history && window.history.pushState ) {\n\t\t\tif ( Backbone.History.started ) {\n\t\t\t\tBackbone.history.stop();\n\t\t\t}\n\t\t\tBackbone.history.start( {\n\t\t\t\troot: window._wpMediaGridSettings.adminUrl,\n\t\t\t\tpushState: true\n\t\t\t} );\n\t\t}\n\t}\n});\n\nmodule.exports = Manage;\n\n\n//# sourceURL=webpack:///./src/js/media/views/frame/manage.js?");

/***/ }),

/***/ 1:
/*!*************************************************!*\
  !*** multi ./src/js/_enqueues/wp/media/grid.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/js/_enqueues/wp/media/grid.js */\"./src/js/_enqueues/wp/media/grid.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/_enqueues/wp/media/grid.js?");

/***/ })

/******/ });