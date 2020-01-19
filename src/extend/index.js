import Vue from 'vue'

import './codemirror'

import uploaderFile from 'vue-ele-form-upload-file'
import codemirror from 'vue-ele-form-codemirror'
import jsonEditor from 'vue-ele-form-json-editor'
import imageUploader from 'vue-ele-form-image-uploader'
import videoUploader from 'vue-ele-form-video-uploader'
import quillEditor from 'vue-ele-form-quill-editor'
import markdownEditor from 'vue-ele-form-markdown-editor'
import bmap from 'vue-ele-form-bmap'
import gallery from 'vue-ele-form-gallery'
import treeSelect from 'vue-ele-form-tree-select'
import dynamic from 'vue-ele-form-dynamic'
import tableEditor from 'vue-ele-form-table-editor'

Vue.component('upload-file', uploaderFile)
Vue.component('codemirror', codemirror)
Vue.component('json-editor', jsonEditor)
Vue.component('image-uploader', imageUploader)
Vue.component('video-uploader', videoUploader)
Vue.component('quill-editor', quillEditor)
Vue.component('markdown-editor', markdownEditor)
Vue.component('bmap', bmap)
Vue.component('gallery', gallery)
Vue.component('tree-select', treeSelect)
Vue.component('dynamic', dynamic)
Vue.component('table-editor', tableEditor)
