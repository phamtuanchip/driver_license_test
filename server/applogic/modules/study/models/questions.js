"use strict";

// let ROOT 			= "../../../../";
let config    		= require("../../../../config");
let logger    		= require("../../../../core/logger");

let _ 				= require("lodash");

let db	    		= require("../../../../core/mongo");
let mongoose 		= require("../../../../core/mongoose");
let Schema 			= mongoose.Schema;
let hashids 		= require("../../../../libs/hashids")("questions");
let autoIncrement 	= require("mongoose-auto-increment");

let schemaOptions = {
	timestamps: true,
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
};

let QuestionSchema = new Schema({
	title: {
		type: String,
		trim: true
	},
	image: {
		type: String,
		trim: true
	},
	answers: {
		chose: [{
			type: String,
			trim: true,
			
		}],
		correct: {
			type: String
		}
	},
	content: {
		type: String,
		trim: true
	},
	author: {
		type: Number,
		required: "Please fill in an author ID",
		ref: "User"
	},
	views: {
		type: Number,
		default: 0
	},
	voters: [{
		type: Number,
		ref: "User"
	}],
	votes: {
		type: Number,
		default: 0
	},
	editedAt: {
		type: Date
	},
	metadata: {}

}, schemaOptions);

QuestionSchema.virtual("code").get(function() {
	return this.encodeID();
});

QuestionSchema.plugin(autoIncrement.plugin, {
	model: "Question",
	startAt: 1
});

QuestionSchema.methods.encodeID = function() {
	return hashids.encodeHex(this._id);
};

QuestionSchema.methods.decodeID = function(code) {
	return hashids.decodeHex(code);
};

/*
PostSchema.static("getByID", function(id) {
	let query;
	if (_.isArray(id)) {
		query = this.collection.find({ _id: { $in: id} });
	} else
		query = this.collection.findById(id);

	return query
		.populate({
			path: "author",
			select: ""
		})
});*/

let Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
