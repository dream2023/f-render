import Vue from 'vue'
import EleFormJsonEditor from 'vue-ele-form-json-editor'
import EleFormCodemirror from 'vue-ele-form-codemirror'
import EleFormImageUploader from 'vue-ele-form-image-uploader'
import EleFormVideoUploader from 'vue-ele-form-video-uploader'
import EleFormQuillEditor from 'vue-ele-form-quill-editor'
import EleFormMarkdownEditor from 'vue-ele-form-markdown-editor'
import EleFormBmap from 'vue-ele-form-bmap'

// language
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/vue/vue.js'
// theme css
import 'codemirror/theme/monokai.css'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'
// hint
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'

import 'codemirror/addon/search/match-highlighter.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'

import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'
// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'

Vue.component('codemirror', EleFormCodemirror)
Vue.component('json-editor', EleFormJsonEditor)
Vue.component('image-uploader', EleFormImageUploader)
Vue.component('video-uploader', EleFormVideoUploader)
Vue.component('quill-editor', EleFormQuillEditor)
Vue.component('markdown-editor', EleFormMarkdownEditor)
Vue.component('bmap', EleFormBmap)
