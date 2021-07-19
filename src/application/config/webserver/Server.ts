#!/usr/bin/env node
import "reflect-metadata"
import cors from 'cors'

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const bodyParser = require("body-parser");
const port = process.env.PORT || '3000';

const app = express();

app.set('port', port);
app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

export default app;
export const router = express.Router();
