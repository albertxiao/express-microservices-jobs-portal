import * as mongoose from 'mongoose'
import shortId from 'shortid'
import { UsersDTO } from '../dto/dto.users'

const Schema: mongoose.Schema = new mongoose.Schema({
	userId: {
		type: String,
		unique: true,
		trim: true,
		default: shortId()
	},
	firstName: {
		type: String,
		trim: true,
		required: [true, 'firstName is required']
	},
	lastName: {
		type: String,
		trim: true,
		required: [true, 'lastName is required']
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'email is required']
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'password is required']
	},
	location: {
		type: String,
		trim: true,
		required: [true, 'location is required']
	},
	phone: {
		type: String,
		trim: true,
		required: [true, 'phone is required']
	},
	role: {
		type: String,
		trim: true,
		default: 'users'
	},
	active: {
		type: Boolean,
		trim: true,
		default: false
	},
	firstLogin: {
		type: Date,
		trim: true,
		default: null
	},
	lastLogin: {
		type: Date,
		trim: true,
		default: null
	},
	createdAt: {
		type: Date,
		trim: true,
		default: null
	},
	updatedAt: {
		type: Date,
		trim: true,
		default: null
	}
})

export const UserSchema = mongoose.model<UsersDTO>('usersService', Schema)
