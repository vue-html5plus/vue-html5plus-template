module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "appid": {
      "type": "string",
      "required": true,
      "message": "appid id"
    },
	  "version": {
      "type": "string",
      "required": false,
      "message": "Project version",
      "default": "1.0"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js + html5plus project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    }
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run start\n\n  npm run dev\n\nDocumentation can be found at https://github.com/vue-html5plus/vue-html5plus-template"
};