import * as express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
const server = require('./schema')
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create Database Connection
createConnection()

// The `listen` method launches a web server.
server.start()