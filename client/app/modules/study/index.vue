<template>
    <div>Here is study
        <vue-form-generator :schema="schema" :model="model" :options="{}" :multiple="false" ref="form"  :is-new-model="isNewPost" ></vue-form-generator>

    </div>
</template>
<script>
import Vue from "vue";
import marked from "marked";
import toast from "../../core/toastr";
import { cloneDeep } from "lodash";
import { validators, schema as schemaUtils,  } from "vue-form-generator";
import { mapGetters, mapActions } from "vuex";
 import multiple from "./multiple.vue";
 Vue.component("multiple", multiple);

 //Vue.use(VueFormGenerator);
export default {
    data() {
			return {
				showForm: false,
				isNewPost: false,
                model: null,
                
				schema: {
					fields: [
						{
							type: "input",
							label: this._("Title"),
							model: "title",
							featured: true,
							required: true,
							placeholder: this._("TitleOfPost"),
							validator: validators.string
                        },
                        {
                            type: "image",
                            label: "Avatar",
                            model: "avatar",
                            required: true
                        },
                        {
                            type: "vueMultiSelect",    
                            model: "library",
                            label: "Libraries",
                            placeholder: "Type to search or add tag",
                            required: true,  
                            validator: validators.required,
                            selectOptions: {
                                multiple: true,
                                key: "code",
                                label: "name",
                                searchable: true,
                                taggable: true,
                                tagPlaceholder: "Add this as new tag",
                                onNewTag: function(newTag, id, options, value){
                                    const tag = {
                                        name: newTag,
                                        // Just for example needs as we use Array of Objects that should have other properties filled.
                                        // For primitive values you can simply push the tag into options and selected arrays.
                                        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                                    }
                                    options.push(tag);
                                    value.push(tag);
                                }
                            },
                            onChanged: function(model, newVal, oldVal, field) {    
                                console.log('@tag: ', newVal);
                            },    
                            values: [
                                {
                                "name": "Javascript",
                                "code": "js"
                                },
                                {
                                "name": "Monterail",
                                "code": "pl"
                                },
                                {
                                "name": "Open Source",
                                "code": "os"
                                },
                                {
                                "name": "Vue.js",
                                "code": "vu"
                                }
                            ]
                        },
                        {
							type: "textArea",
							label: this._("Content"),
							model: "content",
							featured: true,
							required: true,
							rows: 10,
							placeholder: this._("ContentOfPost"),
							validator: validators.string
						}
                    ],
                    groups: [
                            {
                                legend: "Answers",
                                fields: [
                                    {
                                        type: "multipe",
                                        label: "Chose the answer",
                                        model: "answerM",
                                        values: [
                                            "James",
                                            "Nadia",
                                            "Paul",
                                            "Christelle",
                                            "Marc",
                                            "Marie"
                                        ]
                                    },
                                    {
                                        type: "radios",
                                        label: "Chose the answer",
                                        model: "answer",
                                        values: [
                                            "James",
                                            "Nadia",
                                            "Paul",
                                            "Christelle",
                                            "Marc",
                                            "Marie"
                                        ]
                                    },
                                    {
                                        type: "input",
                                        label: "Correct answer",
                                        model: "correct",
                                    },
                                    {
                                        type: "spectrum",
                                        label: "Color",
                                        model: "favoriteColor",
                                        colorOptions: {
                                        preferredFormat: "rgb"
                                        }
                                    }
                                ]
                            }
                    ],
				}
            };
         }   
}
</script>
